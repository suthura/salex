const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    Brand: {
        type: String,
        required: true,
    },
    PModel: {
        type: String,
        required: true
    },
    IMEI: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true,
        max: 255,
        min: 1
    },
    capacity: {
        type: String,
        min: 3
    },
    refID: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Phone', phoneSchema);