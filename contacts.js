import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./db/contacts.json");

export async function listContacts() {
  try {
    const contactsJson = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contactsJson);
  } catch (error) {}
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    contacts.push({ id: nanoid(), name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return true;
  } catch (error) {
    console.log(error);
  }
}
