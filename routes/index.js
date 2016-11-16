// var express = require('express');
// var router = express.Router();
// var jwt = require('jsonwebtoken');
//
// var ErrorList = require('./../config/config.error.json');
// var config = require('./../config/config.technique.json');
//
// router.use(function (req, res, next) {
//   var token = req.headers.x_app_token;
//   if (token){
//     jwt.verify(token, config.secret, function(err, decode){
//       if (err){
//         return res.send(
//           {
//             success: false,
//             message: ErrorList.authenticate.token.wrong
//           }
//         );
//       } else {
//         req.decode = decode;
//         next();
//       }
//     });
//   } else {
//     return res.status(403).send(ErrorList.authenticate.token.missing);
//   }
// });
//
// module.exports = router;
