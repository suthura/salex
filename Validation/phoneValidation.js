const Joi = require('joi');

const phoneValidation = data => {
    const schema = {
        Brand: Joi.string().required(),
        PModel: Joi.string().required(),
        IMEI: Joi.string().required(),
        Price: Joi.string().required(),
        capacity: Joi.string().min(3),
        refID: Joi.string(),
        image: Joi.string()
    }

    return Joi.validate(data, schema);
}

module.exports.phoneValidation = phoneValidation;