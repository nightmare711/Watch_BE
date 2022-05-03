const EmailController = require('../controller/email.controller')
const express = require('express')

const route = express.Router()

route.get('/', EmailController.getEmail)
route.post('/', EmailController.postEmail)

module.exports = route