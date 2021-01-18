

const fs = require('fs')
var FormData = require('form-data');
const axios = require("axios").default;

// file = fs.readFileSync("./photo.png");


let formData = new FormData(); // https://www.npmjs.com/package/form-data
formData.append("file", fs.createReadStream("./photo.webp")); // 

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