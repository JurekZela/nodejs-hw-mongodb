import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (reg, res, next) => {
    const { contactId } = reg.params;

    if (isValidObjectId(contactId)) {
      throw createHttpError(404, 'Bad request');
    };

    next();
};
