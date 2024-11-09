import createHttpError from "http-errors";

export const validateBody = schema => async(reg, res, next) => {
try {
    await schema.validate(reg.body, { 
        abortEarly: false
     });
     
     next();

} catch (error) {
    return next(createHttpError(400, error.message));
}
};