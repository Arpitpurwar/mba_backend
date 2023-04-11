const express = require('express'); // server software
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
require('./user.js'); 
const inializePassport = require('./passportConfig.js');

const app = express();


// Configure More Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Configure Sessions Middleware
app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));

inializePassport(passport);

app.use(passport.session());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});

app.get('/dashboard', (req, res) => {
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
        return res.redirect('/login');
    }
} 
app.get('/secret',isAuthenticated,(req, res) => {
    res.sendFile(__dirname + '/static/secret-page.html');
});

app.get('/logout', function(req, res) {
    req.logout(function(err){
        if (err)
        {
          return next(err);
        }
        res.redirect("/login");
      });
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
    console.log(req.user)
	res.redirect('/dashboard');
});

// assign port
const port = 3000;
app.listen(port, () => console.log(`This app is listening on port ${port}`));