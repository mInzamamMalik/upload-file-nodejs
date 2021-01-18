

const fs = require('fs')
var FormData = require('form-data');
// const axios = require("axios").default;


let formData = new FormData(); // https://www.npmjs.com/package/form-data
formData.append("myFile", fs.createReadStream("./photo.webp")); // 
formData.append("myName", "malik"); // this is how you add some text data along with file
formData.append("myDetails",
    JSON.stringify({
        "subject": "Science",   // this is how you send a json object along with file, you need to stringify (ofcourse you need to parse it back to JSON on server) your json Object since append method only allows either USVString or Blob(File is subclass of blob so File is also allowed)
        "year": "2021"
    })
);

formData.submit("http://localhost:3000/upload", function (err, res) {
    console.log(res.statusCode);
});



// axios({
//     method: 'post',
//     url: "http://localhost:3000/upload",
//     data: formData.getBuffer(), // <Buffer 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 33 35 32 35 35 36 30 31 34 34 34 36 34 33 37 38 32 35 32 31 33 36 ... 997 more bytes>
//     headers: formData.getHeaders() // { 'content-type': 'multipart/form-data; boundary=--------------------------352556014446437825213602'}
// })
//     .then(res => {
//         console.log(`upload Success` + res.data);
//     })
//     .catch(err => {
//         console.log(err);
//     })