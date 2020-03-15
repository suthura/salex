const router = require('express').Router();
const Shop = require('../model/Shop');
const { shopValidation } = require('../Validation/shopValidation');
const jwt = require('jsonwebtoken');


router.post('/addnew', async(req, res) => {

    console.log(req.body);

    const { error } = shopValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const shop = new Shop({
        Name: req.body.Name,
        Add_l1: req.body.Add_l1,
        Add_l2: req.body.Add_l2,
        City: req.body.City,
        Phone: req.body.Phone,
        refID: req.body.refID
    });
    try {
        const savedShop = await shop.save();
        res.send({
            status: "success"
        });
    } catch (err) {
        res.send({
            messege: err
        });
    }
});

router.post('/getmine', async(req, res) => {
    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

    // res.send(verified._id);
    const shops = await Shop.find({
        refID: verified._id
    });
    res.send(shops);
});

module.exports = router;