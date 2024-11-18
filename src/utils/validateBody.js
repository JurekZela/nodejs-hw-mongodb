import createHttpError from "http-errors";

export const validateBody = schema => async(req, res, next) => {
try {
    await schema.validate(req.body, {
        abortEarly: false
     });

     next();

} catch (error) {
    return next(createHttpError(400, error.message));
}
};
