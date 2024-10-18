import { writeContacts } from "../utils/writeContacts.js";

export const removeAllContacts = async () => {
    return writeContacts([]);

};

removeAllContacts();
