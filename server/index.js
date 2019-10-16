const express  = require('express');
const bodyparser = require('body-parser');
const db = require('../database/index.js');

const PORT = 3131;

var app = express();

app.use(bodyparser());

app.use(express.static('/Users/rahimlaiwalla/Hack Reactor/soundclout-sidebar-module/client/dist'));

app.get('/userinfo', (req, res) => {
    db.query('select user_picture_url, username, followers from username_info', (err, data) => {
        if(err){
            console.log('error: USERINFO NOT SELECTED')
        } else{
            console.log('/USERINFO SELECTED FROM DB')
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
    db.query('select song_id from song_likes', (err, data) => {
        if(err){
            console.log('error')
        } else{
            // console.log('songid data', data)
            res.send(data)
        }
    })
})

app.listen(PORT, () => console.log('Express server started on ', PORT));