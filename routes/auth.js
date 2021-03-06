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

        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.TOKEN_SECRET);

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
    console.log(req.body);
    const user = await User.findOne({
        phone: req.body.phone
    });
    if (!user) return res.send({
        error: 'notfound'
    });


    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send({
        loginstatus: 'olduser',
        token: token
    });
});


router.post('/registeragent', async(req, res) => {

    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        address: req.body.address,
        NIC: req.body.NIC,
        email: req.body.email,
        phone: req.body.phone,
        imagesource: req.body.imagesource,
        usertype: "agent",
        password: hashedpassword
    });
    try {
        const savedUser = await user.save();

        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.TOKEN_SECRET);

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

router.post('/adminlogin', async(req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        usertype: "agent"
    });
    if (!user) return res.status(400).send({ message: 'Email Not Exist' });

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).send({ message: 'Password Not Valid' });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);


    res.header('auth-token', token).send({
        loginstatus: 'olduser',
        status: user.status,
        token: token,
        usertype: user.usertype
    });
});



module.exports = router;