
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');
const localStorage = require('node-localstorage');

const cookieExtractor = req => {
    let token = null;
    if (req) {
        // token = req.cookies["access_token"];
        token = req.get("Authorization");
    }
    return token;
}

// authorization 
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "mErn"
}, (payload, done) => {
    User.findById({ _id: payload.sub }, (err, user) => {
        if (err)
            return done(err, false);

        if (user)
            return done(null, user);

        return done(null, false);
    });
}));

// authenticated local strategy using username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        // something went wrong with database
        if (err)
            return done(err);
        // if no user exist
        if (!user)
            return done(null, false);
        // check if password is correct
        user.MatchPassword(password, done);
    });
}));

