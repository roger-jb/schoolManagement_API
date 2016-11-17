'use strict';

var express = require('express');

var app = express();
var utilisateur = require('./utilisateur');
var administrateur = require('./administrateur');
var responsable = require('./responsable');
var eleve = require('./eleve');
var domainecpt = require('./domainecpt');
var champcpt = require('./champcpt');
var pointcpt = require('./pointcpt');
var absence = require('./absence');
var anneeScolaire = require('./anneeScolaire');
var entreprise = require('./entreprise');
var antenneEntreprise = require('./antenneEntreprise');
var cursus = require('./cursus');
var bulletin = require('./bulletin');

app.use('/utilisateur', utilisateur);
app.use('/administrateur', administrateur);
app.use('/responsable', responsable);
app.use('/eleve', eleve);
app.use('/domainecpt', domainecpt);
app.use('/champcpt', champcpt);
app.use('/pointcpt', pointcpt);
app.use('/absence', absence);
app.use('/anneeScolaire', anneeScolaire);
app.use('/entreprise', entreprise);
app.use('/antenneEntreprise', antenneEntreprise);
app.use('/cursus', cursus);
app.use('/bulletin', bulletin);

module.exports = app;
