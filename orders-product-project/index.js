const app = require('./app')
const port = process.env.API_PORT
console.log(port);
const PORT = process.env.PORT || port;

app.listen(PORT, ()=>{
    console.log(`app listning on the port ${PORT}`)
})