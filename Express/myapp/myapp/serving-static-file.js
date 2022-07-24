'use strict'
//serving the static files 
const express = require('express');
const path = require('path')
const logger = require('morgan')
const port = 3000;
const app = express();
//log requset
app.use(logger('dev'));

app.use('/static',express.static (path.join(__dirname,'public')));
app.listen(port, () => {
    console.log(`The server is listening to ${port} `);
})