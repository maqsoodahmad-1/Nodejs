require('./config/database').connect();
const express = require('express');
const app = express();
const userRoute = require('./routes/deliveryschema');

app.use(express.json());
app.use('/user',userRoute);
module.exports = app;