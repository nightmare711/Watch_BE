const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const ProductRoute = require('./routes/product.route')
const OrderRoute = require('./routes/order.route')
const EmailRoute = require('./routes/email.route')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({
    limit:'50mb'
}))
app.use('/products', ProductRoute)
app.use('/orders', OrderRoute)
app.use('/contact', EmailRoute)


mongoose.connect('mongodb+srv://tranhoang:KoOn711286@cluster0.8gw14.mongodb.net/Watch').then(() => app.listen(process.env.PORT || 4000, () => console.log('app listen at port 4000'))).catch(err => console.log(err))