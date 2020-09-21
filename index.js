const express = require('express');
const app = express();

const{
    client
} = require('./db');

client.connect();

app.get('/juicebox',async (req, res, next) => {
    res.send('hello')
})

app.listen(3000,function(){
    console.log('listening on port 8000')
})