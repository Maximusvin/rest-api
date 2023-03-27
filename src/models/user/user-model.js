const {Schema, model} = require('mongoose');
const Joi = require("joi");

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: String,
}, {
    versionKey: false,
});

const userSignupJoiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    subscription: Joi.string()
});

const userLoginJoiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
});

const schemas = {
    userSignupJoiSchema,
    userLoginJoiSchema
}

const UserModel = model('user', userSchema);

module.exports = {
    User: UserModel,
    schemas,
};
