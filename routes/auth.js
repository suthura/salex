const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../Validation/registerValidation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async(req, res) => {

    console.log(req.body);

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email Already Exists');

    const user = new User({
        name: req.body.name,
        address: req.body.address,
        NIC: req.body.NIC,
        email: req.body.email,
        phone: req.body.phone,
        imagesource: req.body.imagesource,
        usertype: req.body.usertype
    });
    try {
        const savedUser = await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        res.header('auth-token', token).send({
            loginstatus: 'olduser',
            status: user.status,
            token: token
        });
    } catch (err) {
        res.send({
            messege: err
        });
    }
});

router.post('/checkphonenumber', async(req, res) => {
    console.log(req);
    const user = await User.findOne({
        phone: req.body.phone
    });
    if (!user) return res.send({
        error: 'notfound'
    });


    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send({
        loginstatus: 'olduser',
        token: token
    });
});



module.exports = router;