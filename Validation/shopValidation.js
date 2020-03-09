const Joi = require('joi');

const shopValidation = data => {
    const schema = {
        Name: Joi.string().required(),
        Add_l1: Joi.string().required(),
        Add_l2: Joi.string().required(),
        City: Joi.string().required(),
        Phone: Joi.string().min(9),
        refID: Joi.string()
    }

    return Joi.validate(data, schema);
}

module.exports.shopValidation = shopValidation;