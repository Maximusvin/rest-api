const {createContactDataValidator} = require("../utils/contactValidator");
const {AppError} = require("../utils");
const {Contact} = require('../models/contacts/contact');

const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({}, "name email phone favorite");
        res.status(200).json(contacts);
    } catch (err) {
        next(err);
    }
}

const getContactById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const contact = await Contact.findById(id);

        if (!contact) return next(new AppError(404, `Contact with id=${id} not found!`));

        res.status(200).json(contact);
    } catch (err) {
        next(err);
    }
}

const createContact = async (req, res, next) => {
    try {
        const {error, value} = createContactDataValidator(req.body);

        if (error) {
            return res.status(400)
                .json({
                    "message": `missing required ${error.message.split(' ')[0]} field`,
                })
        }

        const newContact = await Contact.create(value);

        res.status(201).json(newContact)
    } catch (err) {
        next(err);
    }
}

const deleteContact = async (req, res, next) => {
    try {
        const {id} = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) return next(new AppError(404, `Contact with id=${id} not found!`));

        res.status(200).json({message: 'Contact deleted'});
    } catch (err) {
        next(err)
    }
}

const updateContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {error} = createContactDataValidator(req.body);

        if (error) return next(new AppError(400, `missing fields`));

        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});

        if (!updatedContact) {
            return res.status(404).json({message: 'Contact not found'});
        }

        res.status(200).json(updatedContact);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
}