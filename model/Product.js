const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    type: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    discount: {
        type: Number,
        required:true
    }, 
    quantity: {
        type: Number,
        required:true
    },
    imgPath: {
        type: Array,
        required:true
    }
}, {
    timestamps: true
});
module.exports =  mongoose.model('Product', productSchema);