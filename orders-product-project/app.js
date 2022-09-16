require('./api/config/database').connect();
require('dotenv').config();
const express = require('express')
const app = express();

app.use(express.json({limit:"50mb"}));
const productRoutes = require('./api/routes/products')

app.use('/products', productRoutes);

module.exports = app