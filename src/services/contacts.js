import ContactCollection from "../db/models/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContacts = async({ page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc" }) => {
    const skip = (page - 1) * perPage;

 const data = await ContactCollection.find().skip(skip).limit(perPage).sort({[sortBy]: sortOrder});

 const totalItems = await ContactCollection.countDocuments();

 const paginationData = calculatePaginationData({page, perPage, totalItems});

 return {
    data,
    ...paginationData,
 };
};

export const getContactById = id => ContactCollection.findById(id);

export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async ({ _id, payload, options = {} }) => {
    const rawResult = await ContactCollection.findOneAndUpdate({_id}, payload, {
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