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
  models.champCpt
  .findAll(
    {
      include: [
        models.domaineCpt,
        models.pointCpt
      ]
    }
  )
  .then(function (champCpt) {
    res.send(
      {
        success: true,
        error: null,
        data: {
          champCpt: champCpt
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
    models.champCpt
    .findById(
      id, {
        include: [
          models.domaineCpt,
          models.pointCpt
        ]
      })
    .then(function (champCpt) {
      if (champCpt === null) {
        res.statusCode = 404;
        res.send(ErrorList.champCpt.notFound);
      }
      else {
        res.send(
          {
            success: true,
            error: null,
            data: {
              champCpt: champCpt
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
  var domaineCptId = req.body.domaineCptId
  if (libelle === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.champCpt.findOne({
        where: {
          libelle: libelle,
          domaineCptId: domaineCptId
        }
      })
      .then(function (champCpt) {
        if (champCpt !== null) {
          res.statusCode = 404;
          res.send(ErrorList.champCpt.alreadyExist);
        }
        else {
          models.champCpt.findOrCreate({
              where: {
                libelle: libelle,
                domaineCptId: domaineCptId
              }
            }
          ).spread(function (champCpt, created) {
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
                champCpt: champCpt
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
