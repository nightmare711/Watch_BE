const Order = require('../model/Order')
const Product = require('../model/Product')

exports.orderProduct = async (req,res,next) => {
    const {user_name, address, products, phone_number, total, message} = req.body
    for(let i = 0; i < productIds.length; i++) {
        const product = await Product.findById(products[i].id)
        if(product.quantity - products[i].amount >= 0) {
            return res.status(303).json({
                message: `${productIds[i]} not enough quantity`,
                success:false
            })
        }
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

exports.getOrder = (req,res,next) => {
    return Order.find().then(async (orders) => {
        for(let i = 0; i < orders.length; i++) {
            for(let j = 0; j < orders[i].products; j++) {
                const product = await Product.findById(orders[i].products[j].id)
                orders[i].products[j] = {...orders[i].products[j],...product}
            }
        }
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