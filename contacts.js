const fs = require("fs/promises");
const path = require("path");
const { PassThrough } = require("stream");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = await JSON.parse(data);
    return parsedData;
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = await JSON.parse(data);
    const result = parsedData.find(({ id }) => {
      return id === contactId;
    });
    const checkedResult = result ?? "Contact not found";
    return checkedResult;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = await JSON.parse(data);
    const result = parsedData.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(result));
  } catch (err) {
    console.log(err.message);
  }
  return;
}

async function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, email, phone };
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = await JSON.parse(data);
    parsedData.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(parsedData));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
