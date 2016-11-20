'use strict'

const express 		= require('express');
const api 			= express.Router()

const productCtrl 	= require('../controllers/product-controller');

// API REST
api.get('/products',				productCtrl.getProducts);
api.get('/products/:productId',		productCtrl.getProduct);
api.post('/products',				productCtrl.postProduct);
api.put('/products/:productId',		productCtrl.putProduct);
api.delete('/products/:productId',	productCtrl.deleteProduct);



module.exports = api;