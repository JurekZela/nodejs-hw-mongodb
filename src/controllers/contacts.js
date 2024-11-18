import createHttpError from "http-errors";
import mongoose from 'mongoose';
import * as contactServices from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

import { sortByList } from "../db/models/Contact.js";
import { parseSortParams } from "../utils/parseSortParams.js";

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const {page, perPage} = parsePaginationParams(req.query);
  const {sortBy, sortOrder} = parseSortParams(req.query, sortByList);

  const data = await contactServices.getContacts({ page, perPage, sortBy, sortOrder, userId});



    res.json({
        status: 200,
        message: "Successfully find contacts:)",
        data,
    });
};

export const getContactByIdController =  async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        throw createHttpError(404, 'Contact not found');
      }

    const data = await contactServices.getContactById({contactId, userId});


     if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
    const contact = await contactServices.createContact({ ...req.body, userId});

    res.status(201).json(
        {
            status: 201,
            message: "Successfully created a contact!",
            data: contact,
        }
    );
};

export const patchContactController = async (req, res, next) => {
  const { contactId} = req.params;
  const { _id: userId } = req.user;



  const result = await contactServices.updateContact({contactId, userId, payload: req.body, options: {
    upsert: true
  }});

  if (!result) {
    return next(createHttpError(404, "Contact not found"));
  };


  res.json({
    status: 200,
    message: 'Successfully upserted a student!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { userId } = req.user;
    const contact = await contactServices.deleteContact(contactId, userId);

    console.log(contact);


    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    };

    res.status(204).send();
};
