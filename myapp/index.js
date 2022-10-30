//include packages
const express = require('express')
const path = require('path')
const foo = require('./foo')

const a = []

//enable packages
const app = express()
const port = 3005

//add download feature
const download = require(path.join(process.cwd(), 'feature/newUpDowlFeature/download.js'));
app.use(download);

//add upload feature
const upload = require(path.join(process.cwd(), 'feature/newUpDowlFeature/upload.js'));
app.use(upload); 

//add delete feature
const deleteRequest = require(path.join(process.cwd(), 'feature/newUpDowlFeature/delete.js'))
app.use(deleteRequest);


////////////////////////////////////////////////////////////////////////////////////////
//SOMETHING TO TEST SERVER

foo(app, [{
  path: "/hello-world",
  handler: function(req, res) {
    console.log(a)
    a.push("a")
    res.json({msg: 'hello'});
  }
}])



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
 

////////////////////////////////////////////////////////////////////////////////////////






