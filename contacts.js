const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

console.log(contactsPath);
async function listContacts() {
  const contactsArr = JSON.parse(await fs.readFile(contactsPath));
  return contactsArr;
}

async function getContactById(contactId) {
  const contactsArr = await listContacts();
  const contactIdSrt = String(contactId);

  const foundContact = contactsArr.find(
    (contact) => contact.id === contactIdSrt
  );
  return foundContact || null;
}

async function removeContact(contactId) {
  const contactsArr = await listContacts();
  const contactIdSrt = String(contactId);
  const contactIdx = contactsArr.findIndex(
    (contact) => contact.id === contactIdSrt
  );
  if (contactIdx === -1) return null;

  const deleteContact = contactsArr.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
  return deleteContact;
}

async function addContact(name, email, phone) {
  const contactsArr = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };