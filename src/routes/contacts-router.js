const {Router} = require('express');

const {isValidId} = require("../middlewares");
const {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
} = require("../controllers/contact-controller");

const router = Router();

router.get('/', getContacts);
router.get('/:id', isValidId, getContactById);
router.post('/', createContact);
router.delete('/:id', isValidId, deleteContact);
router.put('/:id', isValidId, updateContact);

module.exports = router;
