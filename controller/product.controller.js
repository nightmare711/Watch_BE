const Product = require('../model/Product')
const fs = require('fs')


exports.getProduct = async (req,res,next) => {
    try {
        const from = req.query.from
        const to = req.query.to
        const type = req.query.type
        const data = await Product.find();
        const dataFormated = []
        const prefix = 'http://localhost:4000/products/'
        
        for(let i = 0; i < data.length; i++) {
            const imgFormat = []
            for(let j = 0; j < data[i].imgPath.length; j++) {
                imgFormat.push(prefix + data[i]._id + '/' + j)
                console.log(imgFormat)
            }
            dataFormated.push({
                ...data[i]._doc,
                imgPath: imgFormat
            })
        }
        if(from && to) {
            const dataFilter = dataFormated.filter(item => item.price >= parseInt(from) && item.price <= parseInt(to))
            return res.status(200).json({
                message: "successful",
                success: true,
                data: dataFilter
            });
        }
        if(type) {
            const dataFilter = dataFormated.filter(item => item.type === type)
            
            return res.status(200).json({
                message: "successful",
                success: true,
                data: dataFilter
            });
        }
        return res.status(200).json({
            message: "successful",
            success: true,
            data: dataFormated
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
    console.log(req)
    const files = req.files
    const imgPath = []
    for(let i = 0; i < files.length; i++) {
        const img = fs.readFileSync(files[i].path)
        var encode_image = img.toString('base64');
        const imgBuffer = new Buffer(encode_image,'base64')
        imgPath.push(imgBuffer)
    }
    const {name, type, price, description, discount, quantity} = req.body
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
exports.getPhoto = (req,res) => {
    var id = req.params.id;
    const indexImage = req.params.indexImage || 0;
    return Product.findById(id).then(result => {
        res.contentType('image/jpeg');
        res.send(result.imgPath[indexImage].buffer)
    })
}