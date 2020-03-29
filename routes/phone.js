const router = require('express').Router();
const Phone = require('../model/phone');
const { phoneValidation } = require('../Validation/phoneValidation');
const jwt = require('jsonwebtoken');


router.post('/getmine', async(req, res) => {

    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

    // res.send(verified._id);
    const phones = await Phone.find({
        refID: verified._id,
        inCart: false,
        availability: "available"
    });
    res.send(phones);
});

router.post('/addtoCart', async(req, res) => {

    var query = { IMEI: req.body.IMEI };

    var newVal = { $set: { inCart: true } }

    await Phone.updateOne(query, newVal, function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ "message": "success" })
    });
});

router.post('/removeCart', async(req, res) => {

    var query = { IMEI: req.body.IMEI };

    var newVal = { $set: { inCart: false } }

    await Phone.updateOne(query, newVal, function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ "message": "success" })
    });
});

router.post('/getcart', async(req, res) => {

    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

    // res.send(verified._id);
    const phones = await Phone.find({
        refID: verified._id,
        inCart: true,
        availability: "available"
    });
    res.send(phones);
});

router.post('/updateavailability', async(req, res) => {

    var query = { IMEI: req.body.IMEI };

    var newVal = {
        $set: {
            availability: "sold",
            inCart: null
        }
    }

    await Phone.updateOne(query, newVal, function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ "message": "success" })
    });
});


module.exports = router;