import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

export const getContactById = id => ContactCollection.findById(id);

export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async ({ _id, payload, options = {} }) => {
    const rawResult = await ContactCollection.findOneAndUpdate({_id}, payload, {
        new: true,
        includeResultMetadata: true,
        ...options,
    });


    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted),
    };
};

export const deleteContact = async id => await ContactCollection.findByIdAndDelete({ _id: id });
