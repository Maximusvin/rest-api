const contactModel = require("../models/contacts-model");
const {createContactDataValidator} = require("../utils/contactValidator");
const {AppError} = require("../utils");

const getContacts = async (req, res, next) => {
    try {
        const contacts = await contactModel.listContacts();
        res.status(200).json(contacts);
    } catch (err) {
        next(err);
    }
}

const getContactById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const contact = await contactModel.getContactById(id);

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

        const newContact = await contactModel.addContact(value);

        res.status(201).json(newContact)
    } catch (err) {
        next(err);
    }
}

const deleteContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const contact = await contactModel.getContactById(id);

        if (!contact) return next(new AppError(404, `Contact with id=${id} not found!`));

        await contactModel.removeContact(id);

        res.status(200).json({message: 'Contact deleted'});
    } catch (err) {
        next(err)
    }
}

const updateContact = async (req, res, next) => {
    try {
        const {error} = createContactDataValidator(req.body);
        const contact = await contactModel.getContactById(req.params.id);

        if (error) return next(new AppError(400, `missing fields`));

        if (!contact) {
            return res.status(404).json({message: 'Contact not found'});
        }

        const updatedContact = await contactModel.updateContact(req.params.id, req.body);

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
