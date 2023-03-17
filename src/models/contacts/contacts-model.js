const fs = require('fs/promises')
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, './contacts.json');

const writeFileToBase = async (path, data) => {
    await fs.writeFile(path, JSON.stringify(data));
}

const listContacts = async () => {
    try {
        return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    } catch (err) {
        return {error: err.message};
    }
}

const getContactById = async (contactId) => {
    try {
        const contactList = await listContacts();
        return contactList.find(contact => contact.id === String(contactId));
    } catch (err) {
        return {error: err.message};
    }
}

const removeContact = async (contactId) => {
    try {
        const contactList = await listContacts();
        const contact = await getContactById(contactId);

        const updateContactList = contactList.filter(contact => contact.id !== String(contactId));
        await writeFileToBase(contactsPath, updateContactList);

        return contact;
    } catch (err) {
        return {error: err.message};
    }
}

const addContact = async (body) => {
    const id = crypto.randomBytes(16).toString("hex");
    const newContacts = {id, ...body}

    const contacts = await listContacts();
    contacts.push(newContacts);

    await writeFileToBase(contactsPath, contacts);

    return newContacts;
}

const updateContact = async (contactId, body) => {
    try {
        const contactList = await listContacts();

        console.log(body)
        const updateContactList = contactList.map(contact => contact.id === String(contactId) ? {
            ...contact,
            ...body,
        } : contact);
        await writeFileToBase(contactsPath, updateContactList);
        return await getContactById(contactId);
    } catch (err) {
        return {error: err.message};
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
