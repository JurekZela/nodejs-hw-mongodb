import { readContacts } from "../utils/readContacts.js";
import { writeContacts } from "../utils/writeContacts.js";

export const removeLastContact = async () => {
    const contacts = readContacts();
    contacts.pop();

    await writeContacts(contacts);
};

removeLastContact();
