const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create volunteer Schema and model

const VolunteerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field required']
    },
    age: {
        type: Number,
        required: [true, 'Age field required']
    },
    contact_n: {
        type: Number,
        required: [true, 'Contact Number required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email ID required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password field required']
    },
    address: {
        type: String,
        required: [true, 'Address field required']
    },
    blood_group: {
        type: String
    }
    /*verifications: {
        type: mongoose.Schema.Types.ObjectId
    }*/
});

const Volunteer = mongoose.model('volunteer', VolunteerSchema);

module.exports = Volunteer;
