const path = require('path')
const returnTime = require(path.join(process.cwd(), 'feature/getTime/getTime.js'));
const fs = require('fs');


function addLog(folderPath, action, object)
{
    var logFileIsExist = fs.existsSync(folderPath + "/log.json");
    if(logFileIsExist)
    {
        //add data to log file
        //read log file
        var jsonLogData = fs.readFileSync(folderPath + "/log.json")
        var logData = JSON.parse(jsonLogData);

        //create and write new data to log file
        var time = returnTime();
        var newLogData = {"action": action,"object": object  ,"time": time};
        logData.push(newLogData);
        var jsonLogData = JSON.stringify(logData, null, 2);
        fs.writeFileSync(folderPath + "/log.json", jsonLogData);
    }
    else
    {
        //create log file
        var time = returnTime();
        var logData = [{"action": action,"object": object ,"time": time}];
        var jsonLogData = JSON.stringify(logData, null, 2);
        fs.writeFileSync(folderPath + "/log.json", jsonLogData);
    }
    
}

module.exports = addLog