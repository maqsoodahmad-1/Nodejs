require('./config/database').connect();
const express = require('express');
const app = express();
const userRoute = require('./routes/user');
const foodRouter = require('./routes/food')

app.use(express.json());
app.use('/food', foodRouter);
app.use('/user',userRoute);
module.exports = app;