const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/hello', function (req,res){
    res.send('Hello World!')
})

app.listen(8080);