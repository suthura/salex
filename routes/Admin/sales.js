const router = require('express').Router();
const Sale = require('../../model/Sale');
// const { postValidation } = require('../Validation/postValidation');
const jwt = require('jsonwebtoken');
// const Geo = require('geo-nearby');



router.get('/getsales', async(req, res) => {

    const sales = await Sale.find().sort({ saletime: -1 });

    res.send(sales);
});



router.post('/getshoplesales', async(req, res) => {
    const sales = await Sale.find({
        shopid: req.body.shopid
    }).sort({ saletime: -1 });

    res.send(sales);

});



router.post('/getsinglesales', async(req, res) => {
    const sales = await Sale.find({
        _id: req.body.saleid
    });

    res.send(sales[0].saledata);

    // res.send(sales.saledata);
});


module.exports = router;