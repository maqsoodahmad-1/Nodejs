'use strict'
let fs = require('fs'),
      path = require('path');
module.exports = {
      index: function(req, res) {
      //res.send('The image:index controller' + 
      //req.params.image_id);
      //},
      //create: function(req, res) {
      //res.send('The image:create POST controller');
      //},
        let saveImage = function() {
            let possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                  imgUrl = '';
            // Generating a 6 character code 
            for(let i = 0; i < 6; i++) {
                  imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            let tempPath = req.files.file.path,
                ext = path.extname(req.files.file.name).toLowerCase(),
                targetPath = path.resolve('./public/upload/' + imgUrl + ext);

            if (ext === '.png' || ext === ',jpg' || exr === '.jpeg' || ext === '.gif') {
                  fs.rename(tempPath, targetPath, function(err) {
                        if(err) {
                              throw err;
                        }
                        res.redirect('/images/' + imgUrl);
                  });
            } else {
                  fs.unlink(tempPath, function() {
                        if(err) throw err;
                        res.json(500, {error:'Only image files are allowed'});
                  })
            }
        };
        saveImage();
//      like: function(req, res) {
//      res.send('The image: like POST controller');
//      },
//      comment: function(req, res) {
//      res.send('The image: comment: POST controller');
//      }
      let viewModel = {
            images:{
                  uniqueId:          1,
                  title:            'Sample Image 1',
                  description:      'This is a sample',
                  views:             0,
                  likes:             0,
                  timestamp:         Date.nowDate.now()
            },
            comments: [
                  {
                        image_id:   1,
                        email:      'test@testing.com',
                        name:       'Test Tester',
                        gravatar:    'http://lorempixal.com/75/75/animal/1',
                        comment:      'This is a test comment....',
                        timestamp:    Date.now()
                  },{
                        image_id:     1,
                        email:        'test@testing.com',
                        name:         'Test Tester',
                        gravatar:      'https://lorempixal.com/75/75/animals/2',
                        comment:       'Another followup comment !',
                        timestamp:      Date.now()
                  }
            ]
      };
      res.render('image',viewModel);
      
}
};