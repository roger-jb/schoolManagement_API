var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var checkHeader = require('./routes/checkHeader');
var api = require('./routes/api');
var authenticate = require('./routes/authenticate');

var app = express();
var models = require('./models');

var SHA256 = require("crypto-js/sha256");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.header("x_app_name", "EdeipWebService");
  res.header("Access-Control-Allow-Origin", "*");
  // ajouter tous les headers utilisés
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x_app_name, x_app_token, Cache-Control, Accept");
  next();
});

//ajout de l'api /authenticate
app.use('/authenticate', authenticate);
// controle du token


// autres controles métiers
app.use(checkHeader);
// accès à l'API
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error  : err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error  : {}
  });
});


module.exports = app;
