const express = require('express');
const { products } = require('./data');
const app = express();

app.get('/', (req,res) => {
    res.send('<h1> Page</h1><a href ="/api/products">products</a>');
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((products) => {
        const { id, name, image } = products;

        return{id , name, image };
    })
res.json(newProducts);
})
app.get('/api/products/1', (req, res) => {
    const singleProduct = products.find( (product) => product.id ===1)
    res.json(singleProduct);
})
app.listen(5000, () => {
    console.log("App is listening to the port 5000");
})