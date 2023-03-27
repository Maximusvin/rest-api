const {createContactDataValidator} = require("../utils/validators");
const {AppErrors} = require("../utils/errors");
const {Contact} = require('../models/contacts/contact-model');

const getContacts = async (req, res, next) => {
    try {
        const {favorite, page, limit} = req.query;

        const paginationPage = +page || 1;
        const paginationLimit = +limit || 5;
        const skip = (paginationPage - 1) * paginationLimit;
        const findOptional = favorite ? {favorite} : {};

        const total = await Contact.count();
        const contacts = await Contact.find(findOptional, "name email phone favorite").skip(skip).limit(paginationLimit);

        res.status(200).json({
            contacts,
            count: contacts.length,
            total,
        });
    } catch (err) {
        next(err);
    }
}

const getContactById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const contact = await Contact.findById(id);

        if (!contact) return next(new AppErrors(404, `Contact with id=${id} not found!`));

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

        if (!contact) return next(new AppErrors(404, `Contact with id=${id} not found!`));

        res.status(200).json({message: 'Contact deleted'});
    } catch (err) {
        next(err)
    }
}

const updateContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {error} = createContactDataValidator(req.body);

        if (error) return next(new AppErrors(400, `missing fields`));

        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});

        if (!updatedContact) {
            return res.status(404).json({message: 'Contact not found'});
        }

        res.status(200).json(updatedContact);
    } catch (err) {
        next(err)
    }
}

const updateStatusContact = async (req, res, next) => {
    try {
        const key = 'favorite';

        if (!(key in req.body)) {
            return res.status(400).json({message: "missing field favorite"});
        }

        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});

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
    updateStatusContact,
}