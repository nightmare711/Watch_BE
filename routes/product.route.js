
   
const ProductController = require('../controller/product.controller')
const multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
const upload = multer({ storage: storage })
const express = require('express')

const route = express.Router()

route.get('/', ProductController.getProduct)
route.get('/related/:type', ProductController.getRelatedProduct)
route.get('/:productId', ProductController.getProductById)
route.post('/', upload.array('products', 12),ProductController.createProduct)
route.post('/edit', ProductController.updateProduct)
route.get('/:id/:indexImage', ProductController.getPhoto)


module.exports = route