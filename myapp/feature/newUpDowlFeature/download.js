const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path')
const token = require(path.join(process.cwd(), 'feature/authorization/token.js'))
const keyStored = require(path.join(process.cwd(), '/TokenKey/key.js'));
const addLog = require(path.join(process.cwd(), 'feature/addLog/addLog.js'));

////////////////////////////////////////////////////////////////////////////////////////
//STATIC FILE
const STATIC_PATH = path.join(process.cwd(), 'public')

//check token 
router.get('/public/:folderName/:fileName',(req, res, next) => {
    var originData = req.params.folderName;
    const tokenString = req.headers.authorization.split(' ')[1];
    var nData = token.VerifyToken(tokenString, keyStored.key);
    if(originData==nData) 
    {
        console.log("download: access-accept")
        console.log("---------------------------------------------")
        next('route');
    }
    else 
    {
        next();
    }
},(err,res) => {
    console.log('download: access-denided')
    console.log("---------------------------------------------")
    return res.status(400).send("invalid token")
})

//check folder and file exists
router.get('/public/:folderName/:fileName',(req, res, next) => {
    var folderIsExist = false;
    //read and parse json file
    var data = fs.readFileSync("./data/folders.json")
    var folders = JSON.parse(data);
    //check does folder exist
    for(var x in folders) {
        if(folders[x].name == req.params.folderName) folderIsExist = true;
    }

    if(!folderIsExist) { 
        return res.send("folders doesn't exist");
    }
    else
    {
    //check does file exist
        const DOWNlOAD_FILE_PATH = path.join(STATIC_PATH, req.params.folderName + '/' + req.params.fileName);

        var fileIsExist = fs.existsSync(DOWNlOAD_FILE_PATH);

        if(!fileIsExist) {
            return res.send("file doesn't exist");
        }
        else
        {
            //add data to log file
            addLog(STATIC_PATH +'/'+ req.params.folderName,"dowloadFile", req.params.fileName)

            //move to next middleware
            next();
        }
    }
})

router.use("/public", express.static(STATIC_PATH));

module.exports = router;