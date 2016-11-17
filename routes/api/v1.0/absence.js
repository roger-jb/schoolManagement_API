/**
 * Created by Jean-Baptiste on 11/11/2016.
 */

'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../../../models');

var ErrorList = require('./../../../config/config.error.json');
var config = require('./../../../config/config.technique.json');

router.use(require('./../../validate'));

//select ALL
router.get('/', function (req, res, next) {
  models.absence.findAll(
      {
        include: [
          models.etudiant
        ]
      }
    )
    .then(function (absence) {
      res.send(
        {
          success: true,
          error: null,
          data: {
            absence: absence
          }
        }
      );
    });
  });

// select one
router.get('/:id', function (req, res, next) {
  var id = (_.isInteger(_.toInteger(req.params.id)) ? _.toInteger(req.params.id) : false);
  if (id === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.absence
    .findById(
      id, {
        include: [
          models.etudiant
        ]
      })
    .then(function (absence) {
      if (absence === null) {
        res.statusCode = 404;
        res.send(ErrorList.absence.notFound);
      }
      else {
        res.send(
          {
            success: true,
            error: null,
            data: {
              absence: absence
            }
          }
        );
      }
    });
  }
});

// insert one
router.post('/', function (req, res, next) {
  var motif = req.body.motif
  var valide = req.body.valide
  var etudiantId = req.body.etudiantId
  var redacteurId = req.body.redacteurId
  if (motif === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.absence.findOne({
        where: {
          motif: motif,
          valide: valide,
          etudiantId: etudiantId,
          redacteurId: redacteurId
        }
      })
      .then(function (absence) {
        if (absence !== null) {
          res.statusCode = 404;
          res.send(ErrorList.absence.alreadyExist);
        }
        else {
          models.absence.findOrCreate({
              where: {
                motif: motif,
                valide: valide,
                etudiantId: etudiantId,
                redacteurId: redacteurId
              }
            }
          ).spread(function (absence, created) {
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
                absence: absence
              }
            });
          });
        }
      });
  }
});

// delete one
router.delete('/:id', function (req, res, next) {
  res.statusCode = 401;
  res.send(ErrorList.parametre.method);
});

module.exports = router;
