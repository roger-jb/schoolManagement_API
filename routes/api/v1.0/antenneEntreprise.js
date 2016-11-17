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
  models.antenne_entreprise
  .findAll(
    {
      include: [
        models.entreprise
      ]
    }
  )
  .then(function (antenne_entreprise) {
    res.send(
      {
        success: true,
        error: null,
        data: {
          antenne_entreprise: antenne_entreprise
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
    models.antenne_entreprise
    .findById(
      id, {
        include: [
          models.entreprise
        ]
      })
    .then(function (antenne_entreprise) {
      if (antenne_entreprise === null) {
        res.statusCode = 404;
        res.send(ErrorList.antenne_entreprise.notFound);
      }
      else {
        res.send(
          {
            success: true,
            error: null,
            data: {
              antenne_entreprise: antenne_entreprise
            }
          }
        );
      }
    });
  }
});

// insert one
router.post('/', function (req, res, next) {
  var libelle = req.body.libelle
  var dateDebut = req.body.dateDebut
  var dateFin = req.body.dateFin
  if (libelle === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.antenne_entreprise.findOne({
        where: {
          libelle: libelle,
          dateDebut: dateDebut,
          dateFin: dateFin
        }
      })
      .then(function (antenne_entreprise) {
        if (antenne_entreprise !== null) {
          res.statusCode = 404;
          res.send(ErrorList.antenne_entreprise.alreadyExist);
        }
        else {
          models.antenne_entreprise.findOrCreate({
              where: {
                libelle: libelle,
                dateDebut: dateDebut,
                dateFin: dateFin
              }
            }
          ).spread(function (antenne_entreprise, created) {
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
                antenne_entreprise: antenne_entreprise
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
