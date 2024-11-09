import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (reg, res, next) => {
    const { contactId } = reg.params;

    if (!isValidObjectId(contactId)) {
      return next(createHttpError(404, `${contactId} not valid id`));
    };

    next();
};
