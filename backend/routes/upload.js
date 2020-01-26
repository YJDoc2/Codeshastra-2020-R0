const User = require('../models/Volunteer');
const path = require('path');
const leaf = require('../models/Leaflet');
const express = require('express');
const router = express.Router();
const upload = require('../util/storage');
const uuid = require('uuid/v4');

router.post('/', async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            res.status(400).send({
                success: false,
                err: err.message
            });
        } else {
            if (req.files === undefined) {
                res.status(400).send({
                    success: false,
                    err: 'No File selected'
                });
            } else {
                const { address, descr } = req.body;
                const file = req.files[0];

                let temp = await leaf.create({
                    id : uuid(),
                    photo: file.filename,
                    address: address,
                    description: descr,
                    posted_by: 'TEST',
                    verified_by: ['tEST']
                });
                console.log(temp);
                res.status(201).send({ success: true, leaflet: temp });
            }
        }
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send({
            success: false,
            err: 'Authentication Error. Please Sign In.'
        });
    }
}

module.exports = router;
