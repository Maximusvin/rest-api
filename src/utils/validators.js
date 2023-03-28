const {schemas} = require("../models/contacts/contact-model");

const createContactDataValidator = (data) => schemas.contactJoiSchema.validate(data);

module.exports = {
    createContactDataValidator
}
