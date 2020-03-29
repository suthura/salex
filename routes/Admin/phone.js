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

router.post('/getall', async(req, res) => {

    // res.send(verified._id);
    const phones = await Phone.find({
        inCart: false,
        availability: "available"
    });
    res.send(phones);
});


module.exports = router;