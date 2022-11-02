const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

// Naming convention: function is camel case
// Use const instead of var
var GetToken = function (data, key) {
    // algorithm: hard code
    var tokenString = jwt.sign(data, key, {algorithm: 'HS256'});
    return tokenString;
}

// Naming convention: function is camel case
// Use const instead of var
var VerifyToken = function (tokenString, key) {
    // Algorithm: hard code
    var data = jwt.verify(tokenString, key, {algorithm:'HS256'});
    return data;
}

module.exports ={
    GetToken,
    VerifyToken
  }
