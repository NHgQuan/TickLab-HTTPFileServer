//add library
const fs = require('fs');
const path = require('path')

// Unneccessary resolving path
const token = require(path.join(process.cwd(), 'feature/authorization/token.js'))

// Unneccessary resolving path
const keyStored = require(path.join(process.cwd(), '/TokenKey/key.js'));

// Unneccessary resolving path
const addLog = require(path.join(process.cwd(), 'feature/addLog/addLog.js'));

function create(folderName){
    //read and parse json file
    var data = fs.readFileSync("./data/folders.json")
    var folders = JSON.parse(data);

    var tokenString = token.GetToken(folderName, keyStored.key);

    var newFolder = {"name": folderName, "token": tokenString};

    var dirpath = path.join(process.cwd(), '/public/'+folderName);
    if(fs.existsSync(dirpath)) 
        {
            console.log(folderName+" already exists")
            return;
        }

    try
    {
        //create file
        fs.mkdirSync(dirpath, { recursive: true })
        console.log(folderName+" have been created");

        //add data to json file
        folders.push(newFolder);
        console.log(folders);
        var newData = JSON.stringify(folders, null, 2);
        fs.writeFileSync("./data/folders.json", newData);
        
        //add data to log file
        addLog(dirpath,"createFolder", folderName)
    }
    catch (error)
    {
        console.log(error)
    }
}

module.exports = create