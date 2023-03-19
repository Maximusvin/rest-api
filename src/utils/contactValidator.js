const {schemas} = require("../models/contacts/contact-model");

exports.createContactDataValidator = (data) => schemas.contactJoiSchema.validate(data);
