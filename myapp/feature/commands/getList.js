const fs = require('fs');
const path = require('path')

function getList()
{
    var data = fs.readFileSync("./data/folders.json")
    var folders = JSON.parse(data);
    console.log(folders);
}

module.exports = getList;