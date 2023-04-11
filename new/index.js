const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
require('../session/user');
const app = express();
const PORT = 4000;
const OneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    cookie: {maxAge : OneDay},
    resave: false,
    saveUninitialized: true,
    secret: 'thisisproductionserverpleasetakecare'
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

app.use(cookieParser());

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;

app.get('/',(req,res) => {
    session=req.session;
    console.log('/ session',session, req.sessionID);
    console.log('/ cookies',req.cookies);
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/index.html',{root:__dirname})
});



app.post('/login',(req,res) => {
    if(req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));

