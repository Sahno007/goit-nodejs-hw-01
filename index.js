const contactsMethods = require("./contacts");
const { Command } = require("commander");
const program = new Command();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsMethods.listContacts();
      console.table(contacts);
      return contacts;

    case "get":
      const contact = await contactsMethods.getContactById(id);
      console.log(contact);
      return contact;

    case "add":
      const addedContact = await contactsMethods.addContact(name, email, phone);
      console.log(addedContact);
      return addedContact;

    case "remove":
      const removedContact = await contactsMethods.removeContact(id);
      console.log(removedContact);
      return removedContact;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);