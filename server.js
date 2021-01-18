var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var multer = require('multer')
const fs = require('fs')

var upload = multer({ dest: './uploads/' })
var app = express();

app.use(bodyParser.json()); // to parse json body
app.use(morgan('dev'));
app.use(cors());


app.post("/upload", upload.any(), (req, res, next) => {  // never use upload.single. see https://github.com/expressjs/multer/issues/799#issuecomment-586526877

    console.log("req.body: ", req.body);
    console.log("req.body: ", JSON.parse(req.body.myDetails));
    console.log("req.files: ", req.files);

    console.log("uploaded file name: ", req.files[0].originalname);
    console.log("file type: ", req.files[0].mimetype);
    console.log("file name in server folders: ", req.files[0].filename);
    console.log("file path in server folders: ", req.files[0].path);

    // TODO: upload file to storage bucket 
    // you must need to upload file in a storage bucket or somewhere safe
    // server folder is not safe, since most of the time when you deploy your server
    // on cloud it makes more than one instances, if you use server folder to save files
    // two things will happen, 
    // 1) your server will no more stateless
    // 2) providers like heroku delete all files when dyno restarts (their could be lots of reasons for your dyno to restart, or it could restart for no reason so be careful) 


    // // delete file from folder before sending response back to client (optional but recommended)
    // // optional because it is gonna delete automatically sooner or later
    // // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
    // try {
    //     fs.unlinkSync(req.files[0].path)
    //     //file removed
    // } catch (err) {
    //     console.error(err)
    // }
    res.send("Ok");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})