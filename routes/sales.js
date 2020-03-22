const router = require('express').Router();
const Sale = require('../model/Sale');
// const { postValidation } = require('../Validation/postValidation');
const jwt = require('jsonwebtoken');
// const Geo = require('geo-nearby');


router.post('/newsale', async(req, res) => {


    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);


    const sale = new Sale({
        shopid: req.body.shopid,
        refID: verified._id,
        saledata: req.body.saledata,
        total: req.body.total,
        shopname: req.body.shopname,
        saletime: req.body.saletime
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

    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);


    const sales = await Sale.find({
        refID: verified._id
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