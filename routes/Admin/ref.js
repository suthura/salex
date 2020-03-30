const router = require('express').Router();
const User = require('../../model/User');



router.post('/allrefs', async(req, res) => {

    // res.send(verified._id);
    const refs = await Phone.find({
        usertype: "referal"
    });
    res.send(refs);
});


module.exports = router;