const OrderController = require('../controller/order.controller')
const express = require('express')

const route = express.Router()

route.get('/', OrderController.getOrder)
route.post('/', OrderController.orderProduct)
route.post('/delete/:id', OrderController.deleteOrder)

module.exports = route