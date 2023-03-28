const {schemas} = require('../models/user/user-model');

const userRegistrationValidation = (data) => schemas.userSignupJoiSchema.validate(data);

const userLoginValidation = (data) => schemas.userLoginJoiSchema.validate(data);

module.exports = {
    userRegistrationValidation,
    userLoginValidation,
}