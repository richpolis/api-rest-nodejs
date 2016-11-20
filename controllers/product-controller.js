'use strict'

const Product 			= require('../models/product');

function getProducts(req, res){
	Product.find({}, (err, products)=>{
		if(err) 		return res.status(500).send({ message: `Error a realizar la peticion ${err}` });

		if(!products) 	return res.status(404).send({ message: `No existen productos` });

		res.status(200).send({ products });
	});
}

function getProduct(req,res){
	let productId 		= req.params.productId

	Product.findById(productId, (err, product)=>{
		if(err) 		return res.status(500).send({ message: `Error a realizar la peticion ${err}` });

		if(!product) 	return res.status(404).send({ message: `El producto con ID ${productId} no existe` });

		res.status(200).send({ product });
	});
}

function postProduct(req, res){
	console.log('POST /api/products');
	console.log(req.body);

	let product 		= new Product();
	product.name 		= req.body.name;
	product.picture 	= req.body.picture;
	product.price 		= req.body.price;
	product.category 	= req.body.category;
	product.description = req.body.description;
	
	product.save((err, productStored) => {
		if(err) 		return res.status(500).send({ message: `Error en guardar en la base de datos ${err}` });

		res.status(200).send({ product: productStored });
 	});
}

function putProduct(req, res){
	let productId 		= req.params.productId
	let update 			= req.body;

	Product.findByIdAndUpdate(productId, update, (err, productUpdate)=>{
		if(err) 		return res.status(500).send({ message: `Error a realizar la peticion ${err}` });

		if(!productUpdate) return res.status(404).send({ message: `El producto con ID ${productId} no existe` });

		res.status(200).send({ product: productUpdate });
	});
}

function deleteProduct(req, res){
	let productId 		= req.params.productId

	Product.findById(productId, (err, product)=>{
		if(err) 		return res.status(500).send({ message: `Error a realizar la peticion ${err}` });

		if(!product) 	return res.status(404).send({ message: `El producto con ID ${productId} no existe` });

		product.remove(err =>{
			if(err) 	return res.status(500).send({ message: `Error al realizar la peticion de eliminar ${err}` });

			res.status(200).send({ message: 'Producto eliminado' });
		});
	});
}

module.exports = {
	getProducts,
	getProduct,
	postProduct,
	putProduct,
	deleteProduct
};
