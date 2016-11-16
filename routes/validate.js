/**
 * Created by Jean-Baptiste on 26/10/2016.
 */
var path = require('path');
var jwt = require('jsonwebtoken');

var ErrorList = require(path.join(__dirname,'../config/config.error.json'));
var config = require(path.join(__dirname, '../config/config.technique.json'));

module.exports = function (req, res, next) {
  var token = req.headers.x_app_token;
  if (token){
    jwt.verify(token, config.token.secret, function(err, decode){
      if (err){
        return res.send(
          {
            success: false,
            message: ErrorList.authenticate.token.wrong
          }
        );
      } else {
        req.decode = decode;
        next();
      }
    });
  } else {
    if (req.method !== 'OPTIONS') {
      return res.status(403).send(ErrorList.authenticate.token.missing);
    }
    next();
  }
};

// module.exports = router;
