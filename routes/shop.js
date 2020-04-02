const router = require('express').Router();
const Shop = require('../model/Shop');
const { shopValidation } = require('../Validation/shopValidation');
const jwt = require('jsonwebtoken');


router.post('/getmine', async(req, res) => {
    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

    // res.send(verified._id);
    const shops = await Shop.find({
        refID: verified._id
    });
    res.send(shops);
});


router.post('/getsingleshop', async(req, res) => {

    const shops = await Shop.find({
        _id: req.body.shopid
    });
    res.status(200).send(shops);
});

module.exports = router;