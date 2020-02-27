const router = require('express').Router();
const Phone = require('../model/phone');
const { phoneValidation } = require('../Validation/phoneValidation');


router.post('/addnew', async(req, res) => {

    console.log(req.body);

    const { error } = phoneValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const IMEIExists = await Phone.findOne({ IMEI: req.body.IMEI });
    if (IMEIExists) return res.status(400).send('Duplicate IMEI');

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