import { createFakeContact } from "../utils/createFakeContact.js";
import { readContacts } from "../utils/readContacts.js";
import { writeContacts } from "../utils/writeContacts.js";

export const addOneContact = async (number) => {
const contacts = await readContacts();
const newContact = Array(number).fill(0).map(createFakeContact);

const result = [...contacts, ...newContact];
await writeContacts(result);
};

addOneContact(1);
