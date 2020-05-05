const router = require('express').Router();
const Sale = require('../../model/Sale');
// const { postValidation } = require('../Validation/postValidation');
const jwt = require('jsonwebtoken');
// const Geo = require('geo-nearby');



router.get('/getsales', async(req, res) => {

    const sales = await Sale.find().sort({ saletime: -1 });

    res.send(sales);
});


router.post('/gettodaysale', async(req, res) => {
    function remDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() - days);
        console.log(result);
        return result;
    }

    const date = req.body.currentdate;
    const sales = await Sale.find({
        saletime: {
            "$gte": remDays(date, 1),
            "$lt": date
        }
    }).sort({ saletime: -1 });
    res.send(sales);
});

router.post('/getweeksales', async(req, res) => {
    function remDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() - days);
        console.log(result);
        return result;
    }

    const date = req.body.currentdate;
    const sales = await Sale.find({
        saletime: {
            "$gte": remDays(date, 7),
            "$lt": date
        }
    }).sort({ saletime: -1 });
    res.send(sales);
});

router.post('/getmonthsales', async(req, res) => {
    function remDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() - days);
        console.log(result);
        return result;
    }

    const date = req.body.currentdate;
    const sales = await Sale.find({
        saletime: {
            "$gte": remDays(date, 30),
            "$lt": date
        }
    }).sort({ saletime: -1 });
    res.send(sales);
});


router.post('/getshoplesales', async(req, res) => {
    const sales = await Sale.find({
        shopid: req.body.shopid
    }).sort({ saletime: -1 });

    res.send(sales);

});

router.post('/getrefsales', async(req, res) => {
    const sales = await Sale.find({
        refID: req.body.refID
    }).sort({ saletime: -1 });

    res.send(sales);

});

router.post('/getsinglesales', async(req, res) => {
    const sales = await Sale.find({
        _id: req.body.saleid
    });

    res.send(sales[0].saledata);

    // res.send(sales.saledata);
});


module.exports = router;