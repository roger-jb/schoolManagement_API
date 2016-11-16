var express = require('express');
var router = express.Router();

var app = express();
var v1_0 = require('./v1.0');



app.use('/v1.0', v1_0);


module.exports = app;
