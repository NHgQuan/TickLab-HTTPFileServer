const express = require('express')
const router = express.Router()
const path = require('path')
const fileUpload = require('express-fileupload'); //file upload
const fs = require('fs');

const token = require(path.join(process.cwd(), 'feature/authorization/token.js'));
const keyStored = require(path.join(process.cwd(), '/TokenKey/key.js'));
//
const addLog = require(path.join(process.cwd(), 'feature/addLog/addLog.js'));

//create upload folder
const UPLOAD_FOLDER_PATH = path.join(process.cwd(), 'public');
//router.use("/uploads", express.static(UPLOAD_PATH));

//check token
router.post('/upload/:folderName', (req, res, next) => {
  var tokenString;
  try
  {
    tokenString = req.headers.authorization.split(' ')[1];
  }
  catch (error)
  {
    console.log('upload: access-denied');
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
        console.log('upload: access-accept')
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
      console.log('upload: access-denied');
      console.log("---------------------------------------------")
  }
},(err,res) => {
    console.log('upload: access-denided')
    console.log("---------------------------------------------")
    return res.status(400).send("invalid token")   
} )

//check folder exists
router.post('/upload/:folderName', (req, res, next) =>{
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
      var folderIsExistReal = fs.existsSync(path.join(UPLOAD_FOLDER_PATH, req.params.folderName))
      if(!folderIsExistReal)
      {
        console.log(req.params.folderName + " in JSON file does not exist in server")
        console.log("---------------------------------------------")
        return res.send("folders doesn't exist");
      }
      else
        next();
  }
})

//upload single file
router.post('/upload/:folderName', fileUpload(), async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });

    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.avatar;

      var fileName= avatar.name.split(".");
      
      var newFileName = fileName[0]+'_'+Date.now() + '.' + fileName[1];

      //Use the mv() method to place the file in the upload directory (i.e. "uploads")

      var newfilePath = req.params.folderName + '/' +newFileName;

      await avatar.mv(UPLOAD_FOLDER_PATH+ '/' +newfilePath);

      console.log('some files have been uploaded to upload directory');
      console.log("---------------------------------------------")

      //add data to log file
      addLog(UPLOAD_FOLDER_PATH +'/'+ req.params.folderName,"uploadFile", newFileName)

      res.send({
        status: true,
        message: 'File is uploaded', 
        data: {
          name:     newFileName,
          mimetype: avatar.mimetype,
          size:     avatar.size,
          path:     newfilePath
        }
      });
      
    }
  } catch (err) {
    console.error(err)
    res.status(500).send(err);
  }
});

//check token
router.post('/upload-multiple/:folderName', (req, res, next) => {
  var tokenString;
  try
  {
    tokenString = req.headers.authorization.split(' ')[1];
  }
  catch (error)
  {
    console.log('upload: access-denied');
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
        console.log('upload: access-accept')
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
      console.log('upload: access-denied');
      console.log("---------------------------------------------")
  }
},(err,res) => {
    console.log('upload: access-denided')
    console.log("---------------------------------------------")
    return res.status(400).send("invalid token")   
} )

//check folder exists
router.post('/upload-multiple/:folderName', (req, res, next) =>{
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
      next();
  }
})

//upload multiple files
router.post('/upload-multiple/:folderName', fileUpload(), async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });

    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.avatar;

      let bvatar = req.files.bvatar;

      var fileName1= bvatar.name.split(".");
      
      var newFileName1 = fileName1[0]+'_'+Date.now() + '.' + fileName1[1];

      var newfilePath1 = req.params.folderName + '/' +newFileName1;
      //Use the mv() method to place the file in the upload directory (i.e. "uploads")
      await bvatar.mv(UPLOAD_FOLDER_PATH + '/' +newfilePath1);

      //add data to log file
      addLog(UPLOAD_FOLDER_PATH +'/'+ req.params.folderName,"uploadFile", newFileName1)

      var fileName2= avatar.name.split(".");
      
      var newFileName2 = fileName2[0]+'_'+Date.now() + '.' + fileName2[1];

      var newfilePath2 = req.params.folderName + '/' +newFileName2;
      //Use the mv() method to place the file in the upload directory (i.e. "uploads")
      await avatar.mv(UPLOAD_FOLDER_PATH + '/' +newfilePath2);

      addLog(UPLOAD_FOLDER_PATH +'/'+ req.params.folderName,"uploadFile", newFileName2)

      console.log('some files have been uploaded to upload directory');
      console.log("---------------------------------------------")

      res.send({
        status: true,
        message: 'Files are uploaded', 
        file1: {
          path: newfilePath1,
        },
        file2: {
          path: newfilePath2,
        },
      });
      
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;