
const axios = require("axios");

// const bent = require('bent')

// const put = bent('PUT', 201)
// await put('http://localhost:3000/upload', Buffer.from('test'))

let formData = new FormData();

//formData.append("file", fileInput.files[0]); // for browser



axios.post(
    this.custom_file_upload_url,
    formData,
    {
        headers: {
            "Content-type": "multipart/form-data",
        },
    }
)
    .then(res => {
        console.log(`upload Success` + res.data);
    })
    .catch(err => {
        console.log(err);
    })