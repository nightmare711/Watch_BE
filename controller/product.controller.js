const Product = require('../model/Product')

exports.getProduct = async (req,res,next) => {
    try {
        const from = req.query.from
        const to = req.query.to
        const type = req.query.type
        const data = await Product.find();
        if(from && to) {
            const dataFilter = data.filter(item => item.price >= parseInt(from) && item.price <= parseInt(to))
            return res.status(200).json({
                message: "successful",
                success: true,
                data: dataFilter
            });
        }
        if(type) {
            const dataFilter = data.filter(item => item.type === type)
            return res.status(200).json({
                message: "successful",
                success: true,
                data: dataFilter
            });
        }
        return res.status(200).json({
            message: "successful",
            success: true,
            data: data
        });
    }catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

exports.getRelatedProduct = (req,res,next) => {
    const {type} = req.params
    return Product.find({
        type
    }).then(result => {
        return res.status(200).json({
            message: 'successful',
            success:true,
            data: result
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        success: false
    }))
}

exports.getProductById = (req,res,next) => {
    const id = req.params.productId
    return Product.findById(id).then(result => {
        return res.status(200).json({
            message: 'successful',
            success: true,
            data: result
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        success: false
    }))
}



exports.createProduct = (req,res,next) => {
    const {name, type, price, description, discount, quantity, imgPath} = req.body
    return Product.findOne({name: name}).then(result => {
        if(result) {
            return res.status(401).json({
                message: 'product duplicated',
                success: false,
            })
        }

        const product = new Product({
            name,
            type,
            price,
            description,
            discount,
            quantity,
            imgPath
        })

        return product.save().then(result => res.status(200).json({
            message: 'successful',
            success:true,
            data: result
        }))
    }).catch(err => res.status(500).json({
        message: err.message,
        success:false
    }))
}

exports.updateProduct = (req,res,next) => {
    const {_id, name, type, price, description, discount, quantity, imgPath} = req.body
    return Product.findById(_id).then(result => {
        if(result) {
            result.name = name || result.name;
            result.type = type || result.type;
            result.price = price || result.price;
            result.description = description || result.description;
            result.discount = discount || result.discount;
            result.quantity = quantity || result.quantity;
            result.imgPath = imgPath || result.imgPath;
            return result.save().then(resul => res.status(200).json({
                message: 'Successful',
                success:true, 
                data: resul
            }))
        }
        return res.status(404).json({
            message: 'Not found product',
            success:false
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        success:false
    }))
}