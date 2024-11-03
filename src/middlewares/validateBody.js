import createHttpError from "http-errors";

export const validateBody = schema => async (reg, res, next) => {
    try {
        await schema.validateAsync(reg.body, { abortEarly: false });
        next();
    } catch (err) {
        const error = createHttpError(404, 'Bad request', { errors: err.details, });

        next(error);
    }
};
