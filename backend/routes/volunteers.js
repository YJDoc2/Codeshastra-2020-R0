const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Leaflet = require('../models/Leaflet');
require('../config/passport_vol')(passport);
// Passport Middleware
express().use(passport.initialize());

const router = express.Router();

const Volunteer = require('../models/Volunteer');

router.post('/register', async (req, res) => {
    require('../config/passport_vol')(passport);
    // Passport Middleware
    express().use(passport.initialize());
    let { name, password1 } = req.body;
    console.log(req.body);
    try {
        let hash = bcrypt.hashSync(password1, 10);
        req.body.password = hash;
        let vol = await Volunteer.create(req.body);

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
    require('../config/passport_vol')(passport);
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

router.get('/posts', async (req, res) => {
    let temp = await Leaflet.findMany({ address: req.user.address });
    temp.sort((a, b) => (a.verified_by.length > b.verified_by.length ? -1 : 1));
    res.status(200).send(temp);
});

router.get('/posts/all', async (req, res) => {
    let temp = await Leaflet.find({});

    res.status(200).send(temp);
});

router.get('/verify/:post', async (req, res) => {
    let name = req.user ? req.user.name : 'Dummy';
    let temp = await Leaflet.findManyAndUpdate(
        { id: req.params.post },
        { $push: { verified_by: name } }
    );
    res.status(200).send();
});

module.exports = router;
