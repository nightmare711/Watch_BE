const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user_name: String,
    address: String,
    products: {
        id: Number,
        amount: Number
    },
    phone_number: String,
    total: Number,
    message: String
}, {
    timestamps: true
});
module.exports =  mongoose.model('Order', orderSchema);