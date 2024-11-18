import ContactCollection from "../db/models/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContacts = async({ page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc", userId}) => {
    const skip = (page - 1) * perPage;

    let query = ContactCollection.find();

    if (userId) {
       query = query.where("userId").equals(userId);
    }


 const data = await query.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});

 const totalItems = await ContactCollection.countDocuments(userId ? { userId } : {});


 const paginationData = calculatePaginationData({page, perPage, totalItems});


 return {
    data,
    ...paginationData,
 };
};

export const getContactById = ({id, userId}) => ContactCollection.findOne({id, userId});

export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async ({contactId, userId, payload, options = {}}) => {
    const rawResult = await ContactCollection.findOneAndUpdate({ contactId, userId }, payload, {
        ...options,
        includeResultMetadata: true,
    });


    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted),
    };
};

export const deleteContact = async ({ id, userId }) => await ContactCollection.findOneAndDelete({ id, userId });
