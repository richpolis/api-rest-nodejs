'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/api/products',(req, res) => {
	Product.find({}, (err, products)=>{
		if(err) return res.status(500).send({message: `Error a realizar la peticion con ID ${productId}`});

		if(!products) return res.status(404).send({message: `No existen productos`});

		res.status(200).send({products});
	});
});

app.get('/api/products/:productId',(req, res) => {
	let productId = req.params.productId

	Product.findById(productId, (err, product)=>{
		if(err) return res.status(500).send({message: `Error a realizar la peticion con ID ${productId}`});

		if(!product) return res.status(404).send({message: `El producto con ID ${productId} no existe`});

		res.status(200).send({product});
	});

});

app.post('/api/products',(req, res) => {
	console.log('POST /api/products');
	console.log(req.body);

	let product = new Product();
	product.name = req.body.name;
	product.picture = req.body.picture;
	product.price = req.body.price;
	product.category = req.body.category;
	product.description = req.body.description;
	
	product.save((err, productStored) => {
		if(err) res.status(500).send({message: `Error en guardar en la base de datos ${err}`});

		res.status(200).send({product: productStored});
 	});
});

app.put('/api/products/:productId',(req, res) => {
	
});

app.delete('/api/products/:productId',(req, res) => {
	
});


mongoose.connect('mongodb://localhost:27017/shop',(err, res)=>{
	if(err) throw err;
	console.log("Conexion a la base de datos establecida...");

	app.listen(port, () => {
		console.log(`API REST corriendo desde http://localhost:${port}`);
	});

});

