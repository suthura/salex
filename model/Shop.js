const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

const shopSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Add_l1: {
        type: String,
        required: true
    },
    Add_l2: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true,
        max: 255,
        min: 1
    },
    Phone: {
        type: String,
        min: 3
    },
    refID: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: "pending"
    },
    geometry: GeoSchema
});

module.exports = mongoose.model('Shop', shopSchema);