const date_ob = new Date();
//const express = require('express')
//const router = express.Router()


var returnTime = function (){
    // current date
    // adjust 0 before single digit date
    var date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    var year = date_ob.getFullYear();

    // current hours
    var hours = date_ob.getHours();

    // current minutes
    var minutes = date_ob.getMinutes();

    // current seconds
    var seconds = date_ob.getSeconds();

    // return date & time in YYYY-MM-DD HH:MM:SS format
    var time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return time;
}

module.exports = returnTime