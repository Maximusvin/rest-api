const Joi = require("joi");

exports.createContactDataValidator = (data) => Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().min(0).required(),
}).validate(data);