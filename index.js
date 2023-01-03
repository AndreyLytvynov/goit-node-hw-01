import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": {
      const contacts = await listContacts();
      console.table(contacts);
      break;
    }
    case "get": {
      const contacts = await getContactById(id);
      console.log(contacts);
      break;
    }
    case "add": {
      const response = await addContact(name, email, phone);
      console.log(response);
      break;
    }
    case "remove": {
      const response = await removeContact(id);
      console.log(response);
      break;
    }
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
