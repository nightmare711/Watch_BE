const OrderController = require('../controller/order.controller')
const express = require('express')

const route = express.Router()

route.get('/', OrderController.getOrder)
route.post('/', OrderController.orderProduct)

module.exports = route