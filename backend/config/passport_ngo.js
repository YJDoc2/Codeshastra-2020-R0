const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/NGO');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(function(username, password, done) {
            let query = { email: username };
            User.findOne(query, function(err, user) {
                if (err) throw err;
                if (!user) {
                    return done(null, false, {
                        message: 'No User with given Email is Found'
                    });
                }

                // Match Password
                bcrypt.compare(password, user.password, function(err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Incorrect Password'
                        });
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
