
   
const ProductController = require('../controller/product.controller')
const express = require('express')

const route = express.Router()

route.get('/', ProductController.getProduct)
route.get('/:productId', ProductController.getProductById)
route.post('/', ProductController.createProduct)
route.post('/edit', ProductController.updateProduct)

module.exports = route