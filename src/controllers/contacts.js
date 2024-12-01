import createHttpError from "http-errors";
import mongoose from 'mongoose';
import * as path from "node:path";
import * as contactServices from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

import { sortByList } from "../db/models/Contact.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileCloudinary } from "../utils/saveFileToCloudinary.js";
import { env } from "../utils/env.js";

const enableCloudinary = env("ENABLE_CLOUDINARY");

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
let photo = null;

if (req.file) {
  if (enableCloudinary === "true") {
    photo = await saveFileCloudinary(req.file, "photos");
  }else {
    await saveFileToUploadDir(req.file);

    photo = path.join( req.file.filename);
  };

}

    const contact = await contactServices.createContact({ ...req.body, photo, userId});

    res.status(201).json(
        {
            status: 201,
            message: "Successfully created a contact!",
            data: contact,
        }
    );
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  let photo = null;

  if (req.file) {
    if (enableCloudinary === "true") {
      photo = await saveFileCloudinary(req.file, "photos");
    }else {
      await saveFileToUploadDir(req.file);

      photo = path.join( req.file.filename);
    };

  }

  const result = await contactServices.updateContact({_id: contactId, userId, photo, payload: req.body});


  if (!result) {
    return next(createHttpError(404, "Contact not found"));
  };

  res.json({
    status: 200,
    message: 'Successfully upserted a student!',
    data:  result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { userId } = req.user;
    const contact = await contactServices.deleteContact(contactId, userId);


    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    };

    res.status(204).send();
};
