const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Maker = require('../models/maker');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
    function (accessToken, refreshToken, profile, cb) {
        Maker.findOne({ 'googleId': profile.id }, function (err, maker) {
            if (err) return cb(err);
            if (maker) {
                return cb(null, maker);
            } else {
                // we have a new maker via OAuth!
                var newMaker = new Maker({
                    name: profile.displayName,
                    googleId: profile.id,
                    avatar: profile.photos[0].value
                });
                newMaker.save(function (err) {
                    if (err) return cb(err);
                    return cb(null, newMaker);
                });
            }
        });
    }
));

passport.serializeUser(function (maker, done) {
    done(null, maker.id);
});

passport.deserializeUser(function (id, done) {
    Maker.findById(id, function (err, maker) {
        done(err, maker);
    });
});