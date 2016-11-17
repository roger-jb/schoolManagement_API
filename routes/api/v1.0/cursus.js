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
  models.campus
  .findAll(
    {
      include: [
        models.Entreprise,
        models.ecole
      ]
    }
  )
  .then(function (campus) {
    res.send(
      {
        success: true,
        error: null,
        data: {
          campus: campus
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
    models.campus
    .findById(
      id, {
        include: [
          models.Entreprise,
          models.ecole
        ]
      })
    .then(function (campus) {
      if (campus === null) {
        res.statusCode = 404;
        res.send(ErrorList.campus.notFound);
      }
      else {
        res.send(
          {
            success: true,
            error: null,
            data: {
              campus: campus
            }
          }
        );
      }
    });
  }
});

// insert one
router.post('/', function (req, res, next) {
  var entrepriseId = req.body.entrepriseId
  var ecoleId = req.body.ecoleId
  if (libelle === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.campus.findOne({
        where: {
          entrepriseId: entrepriseId,
          ecoleId: ecoleId
        }
      })
      .then(function (campus) {
        if (campus !== null) {
          res.statusCode = 404;
          res.send(ErrorList.campus.alreadyExist);
        }
        else {
          models.campus.findOrCreate({
              where: {
                entrepriseId: entrepriseId,
                ecoleId: ecoleId
              }
            }
          ).spread(function (campus, created) {
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
                campus: campus
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
