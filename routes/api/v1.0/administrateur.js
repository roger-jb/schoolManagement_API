/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../../../models');

var ErrorList = require('./../../../config/config.error.json');
var config = require('./../../../config/config.technique.json');

router.use(require('./../../validate'));

// select ALL
router.get('/', function (req, res, next) {
  models.administrateur
    .findAll(
      {
        include: [models.utilisateur]
      }
    )
    .then(function (administrateurs) {
      res.send(
        {
          success: true,
          error: null,
          data: {
            administrateurs: administrateurs
          }
        });
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
    models.administrateur
      .findById(
        id,
        {
          include: [
            models.utilisateur
          ]
        })
      .then(function (admin) {
        if (admin === null) {
          res.statusCode = 404;
          res.send(ErrorList.administrateur.notFound);
        }
        else {
          res.send({
            success: true,
            error: null,
            data: {
              administrateur: admin
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

router.post('/', function (req, res, next) {
  var id = (_.isInteger(req.body.id) ? _.toInteger(req.body.id) : false);
  if (!id) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
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
        }
      )
      .then(function (utilisateur) {
        if (utilisateur === null) {
          res.statusCode = 404;
          res.send(ErrorList.utilisateur.notFound);
        }
        else {
          models.administrateur.findOrCreate({
              where: {id: id}
            }
          ).spread(function (administrateur, created) {
            if (created) {
              res.statusCode = 200;
            }
            else {
              res.statusCode = 304;
            }
            res.send({
              success: true,
              error: null,
              data: {
                administrateur: administrateur
              }
            });
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

router.delete('/:id', function (req, res, next) {
  var id = (_.isInteger(_.toInteger(req.params.id)) ? _.toInteger(req.params.id) : false);
  if (!id) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.administrateur
      .findById(id)
      .then(function (admin) {
        if (admin === null) {
          res.statusCode = 404;
          res.send(ErrorList.administrateur.notFound);
        }
        else {
          admin.destroy();
          res.statusCode = 200;
          res.send({
            success: true,
            error: null,
            data: null
          });
        }
      })
      .catch(function (error) {
          res.statusCode = 503;
          var messageError = ErrorList.bdd.unexpected;
          messageError.error = error;
          res.send(messageError);
        }
      )
    ;
  }
});

module.exports = router;