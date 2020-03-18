const mongoose = require('mongoose');

const SaleDataSchema = new mongoose.Schema({
    brand: {
        type: String
    },
    model: {
        type: String
    },
    capacity: {
        type: String
    },
    imei: {
        type: String
    },
    price: {
        type: String
    }
});

const salesSchema = new mongoose.Schema({
    shopid: {
        type: String,
        default: null
    },
    refID: {
        type: String,
        default: null
    },
    saledata: [SaleDataSchema]
});

module.exports = mongoose.model('Sale', salesSchema);