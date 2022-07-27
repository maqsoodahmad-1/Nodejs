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
app.get('/api/products/:productID',(req, res) => {
    // console.log(req)
    // console.log(req.params);
const { productID } = req.params;
    const singleProduct = products.find( (product) => product.id === Number(productID))
    if(!singleProduct) {
        res.status(404).send('Product does not exist')
    }
    res.json(singleProduct);
})
app.listen(5000, () => {
    console.log("App is listening to the port 5000");
})