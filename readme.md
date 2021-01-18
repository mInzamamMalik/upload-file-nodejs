
### why multipart

Before we start doing actual work, it’s necessary some important things to be mentioned first. Let me start by saying that in order to upload files to a server, multipart/form-data is the content type that should be specified in the web request. This content type allows to send files or large amounts of data in combination with other usual data that should be posted. “Multipart/form-data” content type tells to HTTP request that posted data should be broken into parts, as if they were to be posted by a web form that expects from users to fill in various fields and select files that should be submitted to a server. -- copied from somewhere.


https://stackoverflow.com/questions/41610811/react-js-how-to-send-a-multipart-form-data-to-server



status: 
web client => server : working
nodejs client => server: working