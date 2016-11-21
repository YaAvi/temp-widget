var express = require('express'),
    path = require('path'),
    app = express(),
    rootPath = path.normalize(__dirname + '/../');

app.use(express.static(rootPath));

app.listen(7777);
console.log('Listening on port 7777...');