const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const STATIC_PATH = path.join(process.cwd(), 'public')
const keyStored = require(path.join(process.cwd(), '/TokenKey/key.js'));
const token = require(path.join(process.cwd(), 'feature/authorization/token.js'))
const addLog = require(path.join(process.cwd(), 'feature/addLog/addLog.js'));


//check token
router.delete('/delete/:folderName/:fileName', (req, res, next) => {
    var tokenString;
    try
    {
      tokenString = req.headers.authorization.split(' ')[1];
    }
    catch (error)
    {
      console.log('delete: access-denied');
      console.log("---------------------------------------------")
      return res.status(400).send('Empty token !');
    }
  
    var originData = req.params.folderName;
  
    if (!tokenString) return res.status(401).send('Access Denied !');
  
    try 
    {
        
        var nData = token.VerifyToken(tokenString, keyStored.key);
        if(nData==originData) 
        {
          console.log('delete: access-accept')
          console.log("---------------------------------------------")
          next('route');
        } 
        else
        {
            next();
        }  
    } 
    catch (error) 
    {
        res.status(400).send('Invalid token !');
        console.log('delete: access-denied');
        console.log("---------------------------------------------")
    }
},(err,res) => {
    console.log('delete: access-denided')
    console.log("---------------------------------------------")
    return res.status(400).send("invalid token")   
})
  
//check folder and file exists
router.delete('/delete/:folderName/:fileName',(req, res, next) => {
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
        //check if folder exists in json file but not exist in server
        var folderIsExistReal = fs.existsSync(path.join(STATIC_PATH, req.params.folderName))
        if(!folderIsExistReal)
        {
            console.log(req.params.folderName + " in JSON file does not exist in server")
            console.log("---------------------------------------------")
            return res.send("folders doesn't exist");
        }
        else {
            //check does file exist
            const DOWNlOAD_FILE_PATH = path.join(STATIC_PATH, req.params.folderName + '/' + req.params.fileName);

            var fileIsExist = fs.existsSync(DOWNlOAD_FILE_PATH);

            if(!fileIsExist) {
                return res.send("file doesn't exist");
            }
            else
            {
                next();
            }
        }
    }
})

router.delete("/delete/:folderName/:fileName", function (req, res) {
    var folderName = req.params.folderName;
    var fileName = req.params.fileName;
    const DELETE_FILE_PATH = path.join(STATIC_PATH, folderName + '/' + fileName);
    fs.unlinkSync(DELETE_FILE_PATH)

    //add data to log file
    addLog(STATIC_PATH +'/'+ req.params.folderName,"deleteFile", fileName)

    //send information to user
    res.send(fileName + " have been deleted");
})


module.exports = router;