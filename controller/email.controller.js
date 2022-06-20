const Contact = require('../model/Email')

exports.getEmail = (req,res,next) => {
    return Contact.find().then(result => res.status(200).json({
        message: 'successful',
        success:true,
        data: result
    })).catch(err => res.status(500).json({
        message: err.message,
        success:false
    }))
}

exports.postEmail = (req,res,next) => {
    
    const {name, email, message} = req.body
    const emailInstance = new Contact({name, email, message})

    return emailInstance.save().then(result => res.status(200).json({
        message:'successful',
        success:true,
        data: result
    })).catch(err => res.status(500).json({
        message: err.message,
        success:false
    }))
}