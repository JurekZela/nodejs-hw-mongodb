import createHttpError from "http-errors";
import mongoose from 'mongoose';
import * as contactServices from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

import { sortByList } from "../db/models/Contact.js";
import { parseSortParams } from "../utils/parseSortParams.js";

export const getContactsController = async (reg, res) => {
  const {page, perPage} = parsePaginationParams(reg.query);
  const {sortBy, sortOrder} = parseSortParams(reg.query, sortByList);

  const data = await contactServices.getContacts({ page, perPage, sortBy, sortOrder});

    res.json({
        status: 200,
        message: "Successfully find contacts:)",
        data,
    });
};

export const getContactByIdController =  async (reg, res, next) => {
    const { contactId } = reg.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        throw createHttpError(404, 'Contact not found');
      }

    const data = await contactServices.getContactById(contactId);


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

export const createContactController = async (reg, res) => {
    const contact = await contactServices.createContact(reg.body);

    res.status(201).json(
        {
            status: 201,
            message: "Successfully created a contact!",
            data: contact,
        }
    );
};

export const patchContactController = async (reg, res, next) => {
  const { contactId } = reg.params;

  const result = await contactServices.updateContact({ _id: contactId, payload: reg.body });

  if (!result) {
    next(createHttpError(404, "Contact not found"));
    return;
  };

  res.json({
    status: 200,
    message: 'Successfully upserted a student!',
    data: result.contact,
  });
};

export const deleteContactController = async (reg, res, next) => {
    const { contactId } = reg.params;
    const contact = await contactServices.deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    };

    res.status(204).send();
  };