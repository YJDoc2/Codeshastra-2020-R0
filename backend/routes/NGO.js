const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

const NGO = require('../models/NGO');

router.post('/register', async (req, res) => {
    let { name, password1 } = req.body;
    require('../config/passport_ngo')(passport);
    // Passport Middleware
    express().use(passport.initialize());
    try {
        let hash = bcrypt.hashSync(password1, 10);
        req.body.password = hash;
        let vol = await NGO.create(req.body);

        req.logIn(vol, function(err) {
            if (err) {
                //return next(err);
                res.status(400).send(err);
            }
            res.status(200).send({
                success: true,
                user: vol
            });
            return;
        });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send({
                success: false,
                err: 'This email is Already registered.'
            });
        } else {
            console.error(err);
            res.status(500).send({
                success: false,
                err: 'Server Error'
            });
        }
    }
});

router.post('/login', (req, res, next) => {
    require('../config/passport_ngo')(passport);
    // Passport Middleware
    express().use(passport.initialize());
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(400).send({
                success: false,
                err: info.message
            });
            return;
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).send({
                success: true,
                user: user
            });
            return;
        });
    })(req, res, next);
});

module.exports = router;
