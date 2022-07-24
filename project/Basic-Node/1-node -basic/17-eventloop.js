//http module
//req means request
//res means response
const http = require('http');
const server = http.createServer((req,res) => {
  if(req.url === '/'){
    res.end("Welcome to my home page");
    
  }
  if(req.url ==='/about'){
    //Blocking code !!!!
    for(let i = 0 ; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            console.log(`${i} ${j}`);
        }
    }
    res.end('Here is a short history');
    
  }
  res.write(`
  <h1>Oops</h1>
  <p>We are not able to find the page you are looking for </p>
  <a href = "/">back home</a>`)
  res.end();
})
const port = 5000;
server.listen(port);
console.log(`server is listening to the ${port}`);