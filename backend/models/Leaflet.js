const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create leaflet Schema and model

const LeafletSchema = new Schema({
    photo: {
        type: String,
        required: [true, 'Photo field required']
    },
    address: {
        type: String,
        required: [true, 'Address field required']
    },
    description: {
        type: String,
        required: [true, 'Description field required']
    },
    verified_by: [
        {
            type: String
        }
    ],
    posted_by: {
        type: String,
        required: [true, 'Posted By field required']
    },
    id : {
        type : String,
        required: [true, 'ID field required']

    }
    /* verified_result: {
        type: Boolean,
        default: false
    }*/
});

const Leaflet = mongoose.model('leaflet', LeafletSchema);

module.exports = Leaflet;
