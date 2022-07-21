//http module
//req means request
//res means response
const http = require('http');
const server = http.createServer((req,res) => {
  if(req.url === '/'){
    res.write("Welcome to my home page");
    res.end();
  }
  if(req.url ==='/about'){
    res.write('Here is a short history');
    res.end();
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