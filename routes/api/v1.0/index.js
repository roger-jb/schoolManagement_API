'use strict';

var express = require('express');

var app = express();
var utilisateur = require('./utilisateur');
var administrateur = require('./administrateur');
var responsable = require('./responsable');
var eleve = require('./eleve');

app.use('/utilisateur', utilisateur);
app.use('/administrateur', administrateur);
app.use('/responsable', responsable);
app.use('/eleve', eleve);

module.exports = app;
