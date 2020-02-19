const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const mailRoute = require('./routes/resetpass');

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



app.listen(process.env.PORT || 5000, () => console.log("Server up and running"));