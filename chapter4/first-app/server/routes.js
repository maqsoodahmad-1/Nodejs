const express = require('express');
const router = express.Router();
const home  = require('../controllers/home');
const image = require('../controllers/image');
//Exports app

module.exports = function(app) {
  router.get('/', home.index);
  router.get('/images/:image_id',image.index);
  router.post('/images', (req, res) =>{
        image.create
  });
  router.post('/images/:image_id/like', (req,res) => {
        image.like
  });
  router.post('/images/:image_id/comment',(req, res) => {
         image.comment
  });
  app.use(router);
  };

