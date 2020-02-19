const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    address: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    phone: {
        type: String,
        required: true,
        min: 6
    },
    imagesource: {
        type: String,
        default: null
    },
    usertype: {
        type: String
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    }
});

module.exports = mongoose.model('User', userSchema);