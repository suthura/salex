const router = require('express').Router();
const Sale = require('../model/Sale');
// const { postValidation } = require('../Validation/postValidation');
const jwt = require('jsonwebtoken');
// const Geo = require('geo-nearby');


router.post('/newsale', async(req, res) => {


    const sale = new Sale({
        shopid: req.body.shopid,
        refID: req.body.refID,
        saledata: req.body.saledata,
        total: req.body.total
    });
    try {
        // console.log(post);
        const savesale = await sale.save();

        res.send({
            status: 'success',
            _id: sale._id
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/getmysales', async(req, res) => {
    const sales = await Sale.find();
    res.send(sales);
});


module.exports = router;