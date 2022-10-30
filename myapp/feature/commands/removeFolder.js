//add library
const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')({sigint: true});

function remove (folderName)   {
    //read and parse json file
    var data = fs.readFileSync("./data/folders.json")
    var folders = JSON.parse(data);

    //delete specific folder in json file
    var dirpath = path.join(process.cwd(), '/public/'+folderName);
    if(!fs.existsSync(dirpath))
        {
            console.log(folderName+" doesn't exists")
            return;
        }

    var confirmDelete = prompt('[Y/N]Are you sure to delere ' + folderName+" ");

    if(confirmDelete == 'N'||confirmDelete == 'n') return;

    if(confirmDelete == 'Y'||confirmDelete == 'y')
    {
    try
    {
        //remove file
        fs.rmSync(dirpath, {recursive: true});
        console.log(folderName+" have been deleted");

        //delete data in json file
        for(var x in folders)
        {
            if(folders[x].name == folderName) folders.splice(x, 1);
        }

        console.log(folders);

        var newData = JSON.stringify(folders, null, 2);
        fs.writeFileSync("./data/folders.json", newData);
    }
    catch (error)
    {
        console.log(error)
    }
    }
}

module.exports = remove