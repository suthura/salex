const router = require('express').Router();
const Phone = require('../../model/phone');
const { phoneValidation } = require('../../Validation/phoneValidation');
const jwt = require('jsonwebtoken');


router.post('/addnew', async(req, res) => {

    console.log(req.body);

    const { error } = phoneValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const IMEIExists = await Phone.findOne({ IMEI: req.body.IMEI });
    if (IMEIExists) return res.status(400).send({ error: 'Duplicate IMEI' });

    const phone = new Phone({
        Brand: req.body.Brand,
        PModel: req.body.PModel,
        IMEI: req.body.IMEI,
        Price: req.body.Price,
        capacity: req.body.capacity,
        refID: req.body.refID,
        image: req.body.image
    });
    try {
        const savedPhone = await phone.save();

        res.send({
            status: "success"
        });
    } catch (err) {
        res.send({
            messege: err
        });
    }
});


router.post('/updatephone', async(req, res) => {

    var query = { _id: req.body.phoneID };

    var newVal = {
        $set: {
            Brand: req.body.Brand,
            PModel: req.body.PModel,
            IMEI: req.body.IMEI,
            Price: req.body.Price,
            capacity: req.body.capacity,
            refID: req.body.refID,
            image: req.body.image
        }
    }

    await Phone.updateOne(query, newVal, function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ "message": "success" })
    });
});


router.post('/getall', async(req, res) => {

    // res.send(verified._id);
    const phones = await Phone.find({
        inCart: false,
        availability: "available"
    });
    res.send(phones);
});

router.post('/removephone', async(req, res) => {

    // res.send(verified._id);
    try {
        const phones = await Phone.deleteOne({
            IMEI: req.body.IMEI
        });

        res.send({ message: "success" });
    } catch (err) {
        res.send({
            messege: err
        });
    }
});

module.exports = router;