const mongoose = require('mongoose');

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
    }
});

module.exports = mongoose.model('Shop', shopSchema);