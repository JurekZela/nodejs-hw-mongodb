import { Schema, model } from "mongoose";

const contactsSchema =  new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: String,
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: ["work", "home", "personal"],
        required: true,
        default: 'personal',
    },
},  { timestamps: true,  versionKey: false, });

const ContactCollection = model("contacts", contactsSchema);

export default ContactCollection;