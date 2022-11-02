const path = require('path')
// Unnecessary resolving path
const returnTime = require(path.join(process.cwd(), 'feature/getTime/getTime.js'));
const fs = require('fs');

// Using sync function, will block main thread => async instead
// When log.json increases size by time, this function is BAD implement
// Does it need to use JSON format ?
function addLog(folderPath, action, object)
{
    // Using var is global, replace bt let
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