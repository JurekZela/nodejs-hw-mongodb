import { Schema, model } from "mongoose";

const contactsSchema =   new Schema({

});;

const ContactCollection = model("contacts", contactsSchema);

export default ContactCollection;
