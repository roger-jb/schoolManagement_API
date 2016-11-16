/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../../../models');
var ErrorList = require('./../../../config/config.error.json');

router.use(require('./../../validate'));

// select ALL
router.get('/', function (req, res, next) {
  models.utilisateur.findAll(
    {
      include: [
        models.administrateur,
        models.etudiant,
        models.professeur,
        models.responsable
      ]
    })
    .then(function (utilisateurs) {
      res.send({
        success: true,
        error: null,
        data: {
          utilisateurs: utilisateurs
        }
      });
    })
    .catch(function (error) {
      res.statusCode = 503;
      var messageError = ErrorList.bdd.unexpected;
      messageError.error = error;
      res.send(messageError);
    });
});

// select ONE
router.get('/:id', function (req, res, next) {
  var id = (_.isInteger(_.toInteger(req.params.id)) ? _.toInteger(req.params.id) : false);
  if (id === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger);
  }
  else {
    models.utilisateur
      .findById(
        id,
        {
          include: [
            models.administrateur,
            models.etudiant,
            models.professeur,
            models.responsable
          ]
        })
      .then(function (utilisateur) {
        if (utilisateur === null) {
          res.statusCode = 404;
          res.send(ErrorList.utilisateur.notFound);
        }
        else {
          res.send({
            success: true,
            error: null,
            data: {
              utilisateur: utilisateur
            }
          });
        }
      })
      .catch(function (error) {
        res.statusCode = 503;
        var messageError = ErrorList.bdd.unexpected;
        messageError.error = error;
        res.send(messageError);
      });
  }
});

// insert ONE
router.post('/', function (req, res, next) {
  var userToCreate = models.utilisateur.build(req.body);
  models.utilisateur
    .findOne({
      where: {
        nom: userToCreate.getNom(),
        prenom: userToCreate.getPrenom()
      }
    })
    .then(function (utilisateur) {
      if (utilisateur !== null) {
        res.statusCode = 404;
        res.send(ErrorList.utilisateur.alreadyExist);
      }
      else {
        userToCreate.save()
          .then(function (newUser) {
            res.send({
              success: true,
              error: null,
              data: {
                utilisateur: newUser
              }
            })
          })
          .catch(function (error) {
            res.statusCode = 503;
            var messageError = ErrorList.bdd.unexpected;
            messageError.error = error;
            res.send(messageError);
          });
      }
    })
    .catch(function (error) {
      res.statusCode = 503;
      var messageError = ErrorList.bdd.unexpected;
      messageError.error = error;
      res.send(messageError);
    });
});

// update ONE
router.put('/:id', function (req, res, next) {
  var id = (_.isInteger(_.toInteger(req.params.id)) ? _.toInteger(req.params.id) : false);
  if (id === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.utilisateur
      .findById(
        id
      )
      .then(function (utilisateur) {
        _.forEach(req.body, function (value, key) {
          if (typeof(utilisateur[key] !== 'undefined')) {
            utilisateur.setDataValue(key, value);
          }
        });
        utilisateur.save()
          .then(function (userUpdated) {
            res.send({
              success: true,
              error: null,
              data: {
                utilisateur: userUpdated
              }
            });
          })
          .catch(function (error) {
            res.statusCode = 503;
            var messageError = ErrorList.bdd.unexpected;
            messageError.error = error;
            res.send(messageError);
          });
      })
      .catch(function (error) {
        res.statusCode = 503;
        var messageError = ErrorList.bdd.unexpected;
        messageError.error = error;
        res.send(messageError);
      });
  }
});

// delete ONE
router.delete('/:id', function (req, res, next) {
  res.statusCode = 401;
  res.send(ErrorList.parametre.method);
});

module.exports = router;