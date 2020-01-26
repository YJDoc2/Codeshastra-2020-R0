const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ngo Schema and model

const NgoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field required']
    },
    password: {
        type: String,
        required: [true, 'Password field required']
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
    address: {
        type: String,
        required: [true, 'Address field required']
    },
    description: {
        type: String
    },
    helped: {
        type: mongoose.Schema.Types.ObjectId
    },
    donation_received: {
        type: Number,
        default: 0
    }
});

const Ngo = mongoose.model('NGO', NgoSchema);

module.exports = Ngo;
