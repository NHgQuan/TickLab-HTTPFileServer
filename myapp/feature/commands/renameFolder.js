//add library
const fs = require('fs');
const path = require('path');
const addLog = require(path.join(process.cwd(), 'feature/addLog/addLog.js'));
const token = require(path.join(process.cwd(), 'feature/authorization/token.js'));
const keyStored = require(path.join(process.cwd(), '/TokenKey/key.js'));

function rename(oldFolderName, newFolderName){
    //read and parse json file
    var data = fs.readFileSync("./data/folders.json")
    var folders = JSON.parse(data);

    //rename folder
    var oldPath = path.join(process.cwd(), '/public/'+oldFolderName);
    if(!fs.existsSync(oldPath)) 
        {
            console.log(oldFolderName+" doesn't exists")
            return;
        }

    var newPath = path.join(process.cwd(), '/public/'+newFolderName);

    try
    {
        
        //rename create file
        fs.renameSync(oldPath, newPath, (err)=>{
            if(err) throw err;
        });
        console.log(oldFolderName+" have been rename to "+newFolderName);

        //change data in json file
        for(var x in folders)
        {
            if(folders[x].name == oldFolderName) 
            {
                folders[x].name=newFolderName;
                folders[x].token=token.GetToken(newFolderName, keyStored.key);
            }
        }

        console.log(folders);

        var newData = JSON.stringify(folders, null, 2);
        fs.writeFileSync("./data/folders.json", newData);

        //add data to log file
        addLog(newPath, "renameFolder", newFolderName)

        }
    catch (error)
    {
        console.log(error)
        console.log(newFolderName+" already exists")
    }
}

module.exports = rename