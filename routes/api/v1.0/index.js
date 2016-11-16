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
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'ba896051857a71',
  password: '13921d10',
  database: 'heroku_40168f2ade3d9a4'
});

app.use('/utilisateur', utilisateur);
app.use('/administrateur', administrateur);
app.use('/responsable', responsable);
app.use('/eleve', eleve);
app.use('/domainecpt', domainecpt);
app.use('/champcpt', champcpt);
app.use('/pointcpt', pointcpt);

module.exports = app;
