'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/api/products',(req, res) => {
	res.status(200).send({products: []});
});

app.get('/api/products/:productId',(req, res) => {
	
});

app.post('/api/products',(req, res) => {
	console.log(req.body);
	res.status(200).send({message: 'producto se ha recibido'});
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

