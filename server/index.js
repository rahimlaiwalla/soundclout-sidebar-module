const express  = require('express');
const axios = require('axios');
const bodyparser = require('bodyparser');
const db = require('../database/index.js');

var app = express();

app.use(bodyparser());

app.use(express.static(__dirname + '../client/dist'));

app.get('/userinfo', (req, res) => {
    db.query('select * from username_info', (err, data) => {
        if(err){
            console.log('error')
        } else{
            res.send(data)
        }
    })
})

app.get('/songinfo', (req, res) => {
    db.query('select * from song_info', (err, data) => {
        if(err){
            console.log('error')
        }else{
            res.send(data)
        }
    })
})

app.get('/likes', (req, res) => {
    db.query('select * from song_likes', (err, data) => {
        if(err){
            console.log('error')
        } else{
            res.send(data)
        }
    })
})