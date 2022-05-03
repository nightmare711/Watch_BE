const Order = require('../model/Order')
const Product = require('../model/Product')

exports.orderProduct = async (req,res,next) => {
    const {user_name, address, products, phone_number, total, message} = req.body
    for(let i = 0; i < products.length; i++) {
        const product = await Product.findById(products[i].id)
        if(product.quantity - products[i].amount < 0) {
            return res.status(303).json({
                message: `${products[i].id} not enough quantity`,
                success:false
            })
        }
    }
    for(let i = 0; i < products.length; i++) {
        const product = await Product.findById(products[i].id)
        product.quantity = product.quantity - products[i].amount
        await product.save()
    }
    const order = new Order({user_name, address, products, phone_number, total, message})
        return order.save().then(result => res.status(200).json({
            message: 'successful',
            success: true,
            data: result
        })).catch(err => res.status(500).json({
            message: err.message,
            success:false
        }))
}

exports.deleteOrder = (req,res,next) => {
    const id = req.params.id
    return Order.findByIdAndDelete(id).then(result => res.status(201).json({
        message:'successful',
        success:true
    })).catch(err => res.status(500).json({
        message: err.message,
        success:false
    }))
}

exports.getOrder = (req,res,next) => {
    return Order.find().then(async (orders) => {
        
        return res.status(200).json({
            message: 'successful',
            success:true,
            data: orders
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        success:false
    }))
}