var _ = require('lodash');
var ErrorList = require('./../config/config.error.json');
var config = require('./../config/config.technique.json');
module.exports = function (req, res, next) {
  var err = null;

  res.set({
    "x_app_name": "EdeipWebService"
  });
  if (req.method === 'OPTIONS'){
    console.log('OPTIONS');
    return next(err);
  }
  if (_.isEmpty(req.headers.x_app_name)) {
    console.log('missing');
    res.statusCode = 422;
    res.send(ErrorList.header.x_app_name.missing);
    return;
  }
  if (_.indexOf(config.header.x_app_name, req.headers.x_app_name)<0) {
    console.log('unexpected');
    res.statusCode = 422;
    res.send(ErrorList.header.x_app_name.unexpected);
    return;
  }
  return next(err);
};
