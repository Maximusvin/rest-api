const {Router} = require('express');

const {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
} = require("../controllers/contact-controller");

const router = Router();

router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.delete('/:id', deleteContact);
router.put('/:id', updateContact);

module.exports = router;
