import { Schema, model } from "mongoose";
import { typeList } from "../../constants/contacts.js";
import  { handleSaveError } from './hooks.js';

const contactsSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    phoneNumber: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
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
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
},  { timestamps: true,  versionKey: false, });

contactsSchema.post('save', handleSaveError);

contactsSchema.post('findOneAndUpdate', handleSaveError);

export const sortByList = ["name", "phoneNumber", "email", "contactType"];

const ContactCollection = model("contacts", contactsSchema);

export default ContactCollection;
