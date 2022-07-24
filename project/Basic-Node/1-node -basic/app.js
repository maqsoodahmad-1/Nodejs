const http  = require('http');
const fs = require('fs')

http
.createServer(function(req, res) {
    // const text = fs.readFileSync('./content/big.txt', 'utf8');
    // res.end(text);
    //using stream to read 
    const filestream = fs.createReadStream('./content/big.txt','utf-8');
    filestream.on('open', () => {
        filestream.pipe(res)
    })

    filestream.on('error', (err) => {
        res.end(err);
    })
})
.listen(5000)