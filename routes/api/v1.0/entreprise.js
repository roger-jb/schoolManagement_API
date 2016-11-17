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
  models.Entreprise
  .findAll(
    {
      include: [
        models.antenne_entreprise
      ]
    }
  )
  .then(function (Entreprise) {
    res.send(
      {
        success: true,
        error: null,
        data: {
          Entreprise: Entreprise
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
    models.Entreprise
    .findById(
      id, {
        include: [
          models.antenne_entreprise
        ]
      })
    .then(function (Entreprise) {
      if (Entreprise === null) {
        res.statusCode = 404;
        res.send(ErrorList.Entreprise.notFound);
      }
      else {
        res.send(
          {
            success: true,
            error: null,
            data: {
              Entreprise: Entreprise
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
  if (libelle === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.Entreprise.findOne({
        where: {
          libelle: libelle
        }
      })
      .then(function (Entreprise) {
        if (Entreprise !== null) {
          res.statusCode = 404;
          res.send(ErrorList.Entreprise.alreadyExist);
        }
        else {
          models.Entreprise.findOrCreate({
              where: {libelle: libelle}
            }
          ).spread(function (Entreprise, created) {
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
                Entreprise: Entreprise
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
