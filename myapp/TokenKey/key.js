const express = require('express')
const router = express.Router()

// Key is public to github, kidding me ?
// Solution: use environment variable
var key = "this is a new key";

module.exports = {
    key
}