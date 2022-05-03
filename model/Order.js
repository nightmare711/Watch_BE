const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user_name: String,
    address: String,
    products: {
        type:Object,
        required:true
    },
    phone_number: String,
    total: Number,
    message: String
}, {
    timestamps: true
});
module.exports =  mongoose.model('Order', orderSchema);