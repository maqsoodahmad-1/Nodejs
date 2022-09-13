require("dotenv").config();
require('./config/database').connect();
const express = require('express');
const app = express();
const cors = require('cors')
const userRoute = require('./routes/user');
const qrcodeRouter = require('./routes/Qr');
const sessionRoute = require('./routes/sessioex')
const sessionOptions = require('./middleware/session')

app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);

app.use('/uploads',express.static('uploads'))

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(sessionOptions)
app.use('/user',userRoute);
app.use('/scan',qrcodeRouter);
app.use('/session',sessionRoute);
module.exports = app;
