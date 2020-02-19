const Joi = require('joi');

const registerValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        address: Joi.required(),
        NIC: Joi.string().min(10),
        email: Joi.string().min(4).email(),
        phone: Joi.string().min(5),
        imagesource: Joi.string(),
        usertype: Joi.string().min(5)
    }

    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;