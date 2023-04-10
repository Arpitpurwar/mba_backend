const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const OneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: OneDay }
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());


  const PORT = 4500;

app.get('/',(req,res) => {
    session=req.session;
    console.log('/ session',session);
    console.log('/ cookies',req.cookies);
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/index.html',{root:__dirname})
});


app.get('/test', (req,res)=>{
    console.log('session', req.session, req.sessionID);
    res.send({'msg': 'Hey it is test route!! how are you?'});
})

app.listen(PORT, ()=> {
    console.log('server is running on http://localhost:4500');
})