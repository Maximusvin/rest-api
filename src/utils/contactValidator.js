const {schemas} = require("../models/contacts/contact");

exports.createContactDataValidator = (data) => schemas.contactJoiSchema.validate(data);
