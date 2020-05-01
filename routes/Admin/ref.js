const router = require('express').Router();
const User = require('../../model/User');



router.get('/allrefs', async(req, res) => {

    // res.send(verified._id);
    const refs = await User.find({
        usertype: "referal"
    });
    res.send(refs);
});


router.post('/updateref', async(req, res) => {

    var query = { _id: req.body.refID };

    var newVal = {
        $set: {
            name: req.body.name,
            address: req.body.address,
            NIC: req.body.NIC,
            email: req.body.email,
            phone: req.body.phone,
            imagesource: req.body.imagesource
        }
    }

    await User.updateOne(query, newVal, function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ "message": "success" })
    });
});


module.exports = router;