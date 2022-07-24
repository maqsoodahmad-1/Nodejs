const http = require('http')
const { readFileSync } = require('fs');
//get all files
const homepage = readFileSync('./navbar-app/index.html')

const server = http.createServer( (req,res) => {
    //console.log(req.method);
    // console.log(req.url);
    const url = req.url;
    if(url === '/') {
        //Homepage
         res.writeHead(200, { 'content-type': 'text/html'})
         // console.log('user hit the server');
         res.write(homepage)
         res.end()
    } else if (url ==='/about') {
        //About page
         res.writeHead(200, { 'content-type': 'text/html'})
         // console.log('user hit the server');
         res.write('<h1>About</h1>')
         res.end()

    } else {
        //Error
         res.writeHead(404, { 'content-type': 'text/html'})
         // console.log('user hit the server');
         res.write('<h1>Not found</h1>')
         res.end()
    }
})

server.listen(5000)
//There are two issues 
//1.We don't have more info about the data
//2.Going to any path like about or homepage we have the same response 
