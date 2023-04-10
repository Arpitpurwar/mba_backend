const LocalStrategy = require('passport-local');
const User = require('./user');
module.exports = passport => {
    passport.use(new LocalStrategy(
        async function(username, password, done) {
            try{
                console.log('first time here');
            const user = await User.findOne({ username });

            if (!user) { return done(null, false); }
            if (password !== user.password) { return done(null, false); }
            return done(null, user);}
            catch(err){
                return done(err, false)
            }
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(async function(id, done) {
        const user = await User.findById(id)
        done(null, user);
      });
}