const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
}, {
    timestamps: true
});
module.exports =  mongoose.model('Email', emailSchema);