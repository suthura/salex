const router = require('express').Router();
const Shop = require('../../model/Shop');
const { shopValidation } = require('../../Validation/shopValidation');
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
        refID: req.body.refID,
        geometry: req.body.geometry
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

router.get('/getall', async(req, res) => {

    // res.send(verified._id);
    const shops = await Shop.find();
    res.send(shops);
});

router.post('/updateref', async(req, res) => {

    var query = { _id: req.body.shopID };

    var newVal = {
        $set: {
            refID: req.body.refID,
            refName: req.body.refName
        }
    }

    await Shop.updateOne(query, newVal, function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ "message": "success" })
    });
});


module.exports = router;