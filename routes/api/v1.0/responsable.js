/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../../../models');

var path = require('path');
var ErrorList = require('./../../../config/config.error.json');
var config = require('./../../../config/config.technique.json');

router.use(require('./../../validate'));

router.get('/', function (req, res, next) {
  models.responsable
    .findAll(
      {
        include: [
          models.utilisateur,
          {
            model:models.etudiant,
            include: [
              models.utilisateur
            ]
          }
        ]
      }
    )
    .then(function (responsables) {
      res.send(
        {
          success: true,
          error: null,
          data: {
            responsables: responsables
          }
        });
    });
});

router.get('/:id', function (req, res, next) {
  console.log(req.params.id);
  var id = (_.isInteger(_.toInteger(req.params.id)) ? _.toInteger(req.params.id) : false);
  if (id === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.responsable
      .findById(id,
        {
          include: [
            models.utilisateur,
            {
              model:models.etudiant,
              include: [
                models.utilisateur
              ]
            }
          ]
        }
      )
      .then(function (responsable) {
        if (responsable === null) {
          res.statusCode = 404;
          res.send(ErrorList.responsable.notFound);
        }
        else {
          res.send(
            {
              success: true,
              error: null,
              data: {
                responsables: responsable
              }
            });
        }
      });
  }
});

router.post('/:id', function (req, res, next) {
  var id = (_.isInteger(_.toInteger(req.params.id)) ? _.toInteger(req.params.id) : false);
  if (id === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.utilisateur.findById(id)
      .then(function (user) {
        if (user === null) {
          res.statusCode = 404;
          res.send(ErrorList.responsable.notFound);
        }
        else {
          models.responsable.findOrCreate({
              where: {id: id}
            }
          ).spread(function (responsable, created) {
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
                responsable: responsable
              }
            });
          });
        }
      });
  }
});

router.delete('/:id', function (req, res, next) {
  var id = (_.isInteger(_.toInteger(req.params.id)) ? _.toInteger(req.params.id) : false);
  if (!id) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.responsable.findById(id)
      .then(function (responsable) {
        if (responsable === null) {
          res.statusCode = 404;
          res.send(ErrorList.responsable.notFound);
        }
        else {
          responsable.destroy();
          res.statusCode = 200;
          res.send({
            success: true,
            error: null,
            data: null
          });
        }
      });
  }
});

module.exports = router;