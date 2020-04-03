const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const mailRoute = require('./routes/resetpass');
const phoneRoute = require('./routes/phone');
const shopRoute = require('./routes/shop');
const saleRoute = require('./routes/sales');
const adminSaleRoute = require('./routes/Admin/sales');
const adminPhoneRoute = require('./routes/Admin/phone');
const adminRefRoute = require('./routes/Admin/ref');
const adminShopRoute = require('./routes/Admin/shop');

var bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));

dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db'));

//middleware
app.use(express.json());
//dsc
app.use('/uploads', express.static('uploads'));

//route middleware
app.use('/api/user', authRoute);
app.use('/api/mail', mailRoute);
app.use('/api/phone', phoneRoute);
app.use('/api/shop', shopRoute);
app.use('/api/sale', saleRoute);
app.use('/api/admin/sale', adminSaleRoute);
app.use('/api/admin/phone', adminPhoneRoute);
app.use('/api/admin/ref', adminRefRoute);
app.use('/api/admin/shop', adminShopRoute);


app.listen(process.env.PORT || 5000, () => console.log("Server up and running"));