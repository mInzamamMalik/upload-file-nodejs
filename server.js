const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs')

//==============================================
const multer = require('multer')
const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
})
var upload = multer({ storage: storage })

//==============================================


const admin = require("firebase-admin");
// https://firebase.google.com/docs/storage/admin/start
var serviceAccount = { // create service account from here: https://console.firebase.google.com/u/0/project/delete-this-1329/settings/serviceaccounts/adminsdk
    "type": "xxxxxxxxxxxxxxxxx",
    "project_id": "xxxxxxxxxxxxxxxxx",
    "private_key_id": "xxxxxxxxxxxxxxxxx",
    "private_key": "xxxxxxxxxxxxxxxxx",
    "client_email": "xxxxxxxxxxxxxxxxx",   // replace these with your service account credentials
    "client_id": "xxxxxxxxxxxxxxxxx",
    "auth_uri": "xxxxxxxxxxxxxxxxx",
    "token_uri": "xxxxxxxxxxxxxxxxx",
    "auth_provider_x509_cert_url": "xxxxxxxxxxxxxxxxx",
    "client_x509_cert_url": "xxxxxxxxxxxxxxxxx"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://delete-this-1329.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://delete-this-1329.appspot.com");

//==============================================



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

    // upload file to storage bucket 
    // you must need to upload file in a storage bucket or somewhere safe
    // server folder is not safe, since most of the time when you deploy your server
    // on cloud it makes more t2han one instances, if you use server folder to save files
    // two things will happen, 
    // 1) your server will no more stateless
    // 2) providers like heroku delete all files when dyno restarts (their could be lots of reasons for your dyno to restart, or it could restart for no reason so be careful) 


    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    bucket.upload(
        req.files[0].path,
        // {
        //     destination: `${new Date().getTime()}-new-image.png`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        // },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

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
                    }
                })
            }else{
                console.log("err: ", err)
                res.status(500).send();
            }
        });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})