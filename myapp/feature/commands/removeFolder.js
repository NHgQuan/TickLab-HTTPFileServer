//add library
const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')({sigint: true});


// Bad format
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

    // Can use toLowerCase()
    if(confirmDelete == 'N'||confirmDelete == 'n') return;

    if(confirmDelete == 'Y'||confirmDelete == 'y')
    {
    try
    {
        //remove file
        fs.rmSync(dirpath, {recursive: true});
        console.log(folderName+" have been deleted");

        // delete data in json file
        // Sequential search (It's okay because number of folders is small)
        for(var x in folders)
        {
            // Bad loop, why don't u escape the loop when found folder which is needed to delete ?
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