const LocalStrategy = require('passport-local');
const User = require('./user');

module.exports = passport => {
    passport.use(new LocalStrategy(
        async function(username, password, done) {
            try{
                console.log('req from client side, first place');
               const user = await User.findOne({ username: username }) 
                if (!user) { return done(null, false); }
                if (password !== user.password) { return done(null, false); }
                return done(null, user);
             }catch(err){
                return done(err, false);
            }
        }
      ));

      passport.serializeUser(function(user, done) {
        console.log('Second place');
        console.log('user data in serialize', user);
        done(null, user.id);
      });
      
      passport.deserializeUser(async function(id, done) {
        console.log('req from client side, fourth place', id);
           const user =  await User.findById(id);
           return done(null, user);
      });
}