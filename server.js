var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var multer  = require('multer')

var upload = multer({ dest: './uploads/' })
var app = express();

app.use(bodyParser.json()); // to parse json body
// app.use(multer().none()); // to parse multipart body
app.use(morgan('dev'));
app.use(cors());


app.post("/upload", upload.any('ink.png'), (req,res,next)=>{  // never use upload.single. see https://github.com/expressjs/multer/issues/799#issuecomment-586526877

    console.log("req.body: ", req.body);
    console.log("req.files: ", req.files);

    res.send("Ok");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})