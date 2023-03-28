const {Router} = require('express');

const {isValidId} = require("../middlewares/isValidId");
const {checkJwt} = require("../middlewares/authMiddleware");

const {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
    updateStatusContact,
} = require("../controllers/contact-controller");

const contactRouter = Router();

contactRouter.get('/', checkJwt, getContacts);
contactRouter.get('/:id', isValidId, getContactById);
contactRouter.post('/', createContact);
contactRouter.delete('/:id', isValidId, deleteContact);
contactRouter.put('/:id', isValidId, updateContact);
contactRouter.patch('/:id/favorite', updateStatusContact);

module.exports = contactRouter;
