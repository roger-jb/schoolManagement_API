/**
 * Created by Jean-Baptiste on 25/10/2016.
 */
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

var ErrorList = require('./../config/config.error.json');
var config = require('./../config/config.technique.json');
var models = require('./../models');

router.post('/', function (req, res) {
    models
    .connexion
    .findOne(
      {
        "where": {login: req.body.login}
      })
    .then(function (connecte) {
      if (!connecte) {
        res.send(ErrorList.authenticate.login);
      } else if (connecte) {
        if (connecte.password !== req.body.password) {
          res.send(ErrorList.authenticate.password);
        } else {
          models
          .utilisateur
          .findById(
            connecte.id
          ).then(function (utilisateur) {
            if (!utilisateur) {
              res.send(ErrorList.authenticate.login);
            }
            else if (utilisateur) {
              if (utilisateur.actif) {
                var token = jwt.sign({login: connecte.login, id: connecte.id}, config.token.secret, {
                  expiresIn: config.token.ttl
                });
                res.send(
                  {
                    success: true,
                    message: 'Authentication successful',
                    token: token,
                    utilisateur: utilisateur
                  });
              }
              else {
                res.send(ErrorList.authenticate.inactif);
              }
            }
          });
        }
      }
    });
});

module.exports = router;
