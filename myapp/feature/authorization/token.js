const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

var GetToken = function (data, key) {
    var tokenString = jwt.sign(data, key, {algorithm: 'HS256'});
    return tokenString;
}

var VerifyToken = function (tokenString, key) {
    var data = jwt.verify(tokenString, key, {algorithm:'HS256'});
    return data;
}

module.exports ={
    GetToken,
    VerifyToken
  }
