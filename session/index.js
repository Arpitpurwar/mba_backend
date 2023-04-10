const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const passport = require('passport');


require('./user');
const app = express();
const PORT = 4000;
const OneDay = 1000 * 60 * 60 * 24;



// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

const intializePassport = require('./passportConfig');

intializePassport(passport);
app.use(sessions({
    cookie: {maxAge : OneDay},
    resave: false,
    saveUninitialized: true,
    secret: 'thisisproductionserverpleasetakecare'
}));
app.use(passport.session());

app.use(cookieParser());

app.get('/',(req,res) => {
    session=req.session;
    console.log('/ session',session, req.sessionID);
    console.log('/ cookies',req.cookies);
    if(req.user){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/index.html',{root:__dirname})
});



app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
function(req, res) {
    console.log('third place');
  res.redirect('/dashboard');
})

app.get('/dashboard',isAuthenticated, (req, res) => {
    console.log('fifth place');
    res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
     and your session expires in ${req.session.cookie.maxAge} 
     milliseconds.<br><br>
     <a href="/logout">Log Out</a><br><br>
     <a href="/secret">Members Only</a>`);
});

function isAuthenticated(req,res,next){
    if(req.user){
        next()
    }else{
        res.redirect('/');
    }
}
app.get('/secret',isAuthenticated, (req,res) => {
    res.sendFile('views/secret-page.html',{root:__dirname})
})  

app.get('/logout',(req,res) => {
    req.logout(function(err){
        if (err)
        {
          return next(err);
        }
        res.redirect("/");
      });
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));

