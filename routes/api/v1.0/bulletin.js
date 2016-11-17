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
  models.bulletin
  .findAll(
    {
      include: [
        models.etudiant,
        models.semestre,
        models.matiere
      ]
    }
  )
  .then(function (bulletin) {
    res.send(
      {
        success: true,
        error: null,
        data: {
          bulletin: bulletin
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
    models.bulletin
    .findById(
      id, {
        include: [
          models.etudiant,
          models.semestre,
          models.matiere
        ]
      })
    .then(function (bulletin) {
      if (bulletin === null) {
        res.statusCode = 404;
        res.send(ErrorList.bulletin.notFound);
      }
      else {
        res.send(
          {
            success: true,
            error: null,
            data: {
              bulletin: bulletin
            }
          }
        );
      }
    });
  }
});

// insert one
router.post('/', function (req, res, next) {
  var etudiantId = req.body.etudiantId
  var semestreId = req.body.semestreId
  if (libelle === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.bulletin.findOne({
        where: {
          etudiantId: etudiantId,
          semestreId: semestreId
        }
      })
      .then(function (bulletin) {
        if (bulletin !== null) {
          res.statusCode = 404;
          res.send(ErrorList.bulletin.alreadyExist);
        }
        else {
          models.bulletin.findOrCreate({
              where: {
                etudiantId: etudiantId,
                semestreId: semestreId
              }
            }
          ).spread(function (bulletin, created) {
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
                bulletin: bulletin
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
