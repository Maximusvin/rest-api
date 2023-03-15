const {Router} = require('express');
const Joi = require('joi');

const {listContacts, getContactById, addContact, removeContact, updateContact} = require('../../models/contacts.js')

const router = Router();

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().min(0).required(),
})

router.get('/', async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.status(200).json({
            status: 'success',
            contacts,
        })
    } catch (err) {
        next(err);
    }
})

router.get('/:contactId', async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            const error = new Error(`Contact with id=${contactId} not found!`);
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            status: 'success',
            contact,
        });
    } catch (err) {
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {error} = contactsSchema.validate((req.body));

        if (error) {
            error.status = 400;
            throw error;
        }

        const newContact = await addContact(req.body);

        res.status(201).json({
            status: 'success',
            code: 201,
            newContact,
        })
    } catch (err) {
        next(err);
    }
})

router.delete('/:contactId', async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            const error = new Error(`Contact with id=${contactId} not found!`);
            error.status = 404;
            throw error;
        }

        const deleteContact = await removeContact(contactId);

        res.json({
            status: 'success',
            message: 'Contact deleted',
            deleteContact,
        })
    } catch (err) {
        next(err)
    }
})

router.put('/:contactId', async (req, res, next) => {
    try {
        const {error} = contactsSchema.validate((req.body));

        if (error) {
            error.status = 400;
            error.message = 'missing fields';
            throw error;
        }

        const contact = await updateContact(req.params.contactId, req.body);

        res.json({
            status: 'success',
            code: 200,
            message: 'template message',
            contact,
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router;
