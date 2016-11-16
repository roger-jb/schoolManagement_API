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
  models.pointCpt
  .findAll(
    {
      include: [
        {
          model:models.champCpt,
          include: [
            models.domaineCpt
          ]
        }
      ]
    }
  )
  .then(function (pointCpt) {
    res.send(
      {
        success: true,
        error: null,
        data: {
          pointCpt: pointCpt
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
    models.pointCpt
    .findById(
      id, {
        include: [
          models.champCpt
        ]
      })
    .then(function (pointCpt) {
      if (pointCpt === null) {
        res.statusCode = 404;
        res.send(ErrorList.pointCpt.notFound);
      }
      else {
        res.send(
          {
            success: true,
            error: null,
            data: {
              pointCpt: pointCpt
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
  var champCptId = req.body.champCptId
  if (libelle === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.champCpt.findOne({
        where: {
          libelle: libelle,
          champCptId: champCptId
        }
      })
      .then(function (champCpt) {
        if (champCpt !== null) {
          res.statusCode = 404;
          res.send(ErrorList.pointCpt.alreadyExist);
        }
        else {
          models.pointCpt.findOrCreate({
              where: {
                libelle: libelle,
                champCptId: champCptId
              }
            }
          ).spread(function (pointCpt, created) {
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
                pointCpt: pointCpt
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
