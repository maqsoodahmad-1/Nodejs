require("dotenv").config();
const app = require('./app')
const API_PORT = process.env.API_PORT
console.log(API_PORT);
const PORT = process.env.PORT || API_PORT
app.listen(PORT, ()=>{
    console.log(`Server running on the port ${PORT}`);
})