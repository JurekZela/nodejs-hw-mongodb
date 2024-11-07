import { Schema, model } from "mongoose";
import { typeList } from "../../constants/contacts.js";
import  { handleSaveError, seUpdateSettings } from './hooks.js';

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
        enum: [...typeList],
        required: true,
        default: 'personal',
    },
},  { timestamps: true,  versionKey: false, });

contactsSchema.post('save', handleSaveError);

contactsSchema.pre('findOneAndUpdate', seUpdateSettings);

contactsSchema.pre('findOneAndUpdate', handleSaveError);

export const sortByList = ["name", "phoneNumber", "email", "contactType"];

const ContactCollection = model("contacts", contactsSchema);

export default ContactCollection;
