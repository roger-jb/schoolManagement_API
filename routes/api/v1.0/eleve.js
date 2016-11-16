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
  models.eleve
  .findAll(
    {
      include: [
        models.utilisateur,
        models.niveau,
        models.responsable
      ]
    }
  )
  .then(function (eleves) {
    res.send(
      {
        success: true,
        error: null,
        data: {
          eleves: eleves
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
    models.eleve
    .findById(
      id, {
        include: [
          models.utilisateur,
          models.niveau,
          {
            model: models.responsable,
            include: [
              models.utilisateur
            ]
          }
        ]
      })
    .then(function (eleve) {
      if (eleve === null) {
        res.statusCode = 404;
        res.send(ErrorList.eleve.notFound);
      }
      else {
        res.send(
          {
            success: true,
            error: null,
            data: {
              eleve: eleve
            }
          }
        );
      }
    });
  }
});

// insert one
router.post('/', function (req, res, next) {
  var id = (_.isInteger(_.toInteger(req.body.id)) ? _.toInteger(req.body.id) : false);
  if (id === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  } else {
    models.utilisateur.findById(id)
    .then(function (user) {
      if (user === null) {
        res.statusCode = 404;
        res.send(ErrorList.utilisateur.notFound);
      }
      else {
        var idNiveau = (_.isInteger(_.toInteger(req.body.niveau)) ? _.toInteger(req.body.niveau) : false);
        models.eleve
        .findById(id)
        .then(function (eleve) {
          if (eleve !== null) {
            res.statusCode = 304;
            res.send({
              success: true,
              error: null,
              data: {
                eleve: eleve
              }
            });
          }
          else {
            var newEleve = models.eleve.build({id: id});
            newEleve.save()
            .then(function (unEleve) {
              if (idNiveau) {
                models.niveau
                .findById(idNiveau)
                .then(function (niv) {
                  unEleve.setNiveau(niv);
                  unEleve.save();
                  res.statusCode = 200;
                  res.send({
                    success: true,
                    error: null,
                    data: {
                      eleve: unEleve
                    }
                  });
                });
              }
              else {
                res.statusCode = 200;
                res.send({
                  success: true,
                  error: null,
                  data: {
                    eleve: unEleve
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

// update one
router.put('/:id', function (req, res, next) {
  var id = (_.isInteger(_.toInteger(req.params.id)) ? _.toInteger(req.params.id) : false);
  if (id === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  }
  else {
    models.utilisateur
    .findById(id)
    .then(function (user) {
      if (user === null) {
        res.statusCode = 404;
        res.send(ErrorList.utilisateur.notFound);
      }
      else {
        models.eleve
        .findById(id)
        .then(function (eleve) {
          if (eleve === null) {
            res.statusCode = 404;
            res.send(ErrorList.eleve.notFound);
          }
          else {
            var idNiveau = (_.isInteger(_.toInteger(req.body.niveau)) ? _.toInteger(req.body.niveau) : false);
            if (idNiveau === false) {
              eleve.setNiveau();
              eleve.save();
              res.send({
                success: true,
                error: null,
                data: {
                  eleve: eleve
                }
              });
            }
            else {
              models.niveau
              .findById(idNiveau)
              .then(function (niveau) {
                eleve.setNiveau(niveau);
                eleve.save().then(function (eleve) {
                  res.statusCode = 200;
                  res.send({
                    success: true,
                    error: null,
                    data: {
                      eleve: eleve
                    }
                  });
                });
              });
            }
          }
        });
      }
    });
  }
});

router.put('/:id/responsable', function (req, res, next) {
  var id = (_.isInteger(_.toInteger(req.params.id)) ? _.toInteger(req.params.id) : false);
  var responsables = req.params.responsables;
  if (id === false) {
    res.statusCode = 412;
    res.send(ErrorList.parametre.notInteger)
  }
  else {
    models.eleve.findById(
      id,
      {
        include: [
          models.utilisateur,
          models.niveau,
          {
            model: models.responsable,
            include: [
              models.utilisateur
            ]
          }
        ]
      }
    )
    .then(function(eleve){
      if (eleve === null){
        res.statusCode = 404;
        res.send(ErrorList.eleve.notFound);
      }
      else {
        var oldResp = eleve.getResponsables();
        _.forEach(responsables, function(responsable){
          if (!_.find(oldResp,function(resp){
              return resp.id === responsable.id
            })){
            eleve.addResponsable(responsable);
          }
        });
        eleve.save();
        res.send({
          success: true,
          error: null,
          data: {
            eleve: eleve
          }
        })
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