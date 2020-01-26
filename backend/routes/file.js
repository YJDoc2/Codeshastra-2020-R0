User = require('../models/Volunteer');
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Grid = require('gridfs-stream');
eval(
    `Grid.prototype.findOne = ${Grid.prototype.findOne
        .toString()
        .replace('nextObject', 'next')}`
);

const conn = mongoose.createConnection(
    process.env.MONGO_ATLAS_URI || 'mongodb://localhost:27017/divyaseva',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

router.get('/:filename', (req, res) => {
    gfs.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).send({
                err: 'No file exists'
            });
        }

        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
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
