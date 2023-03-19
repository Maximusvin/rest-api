const {Schema, model} = require('mongoose');
const Joi = require("joi");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false,
    timestamps: true,
});

const contactJoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().min(0).required(),
    favorite: Joi.bool(),
});

const schemas = {
    contactJoiSchema,
}

const ContactModel = model('contact', contactSchema);

module.exports = {
    Contact: ContactModel,
    schemas,
};
