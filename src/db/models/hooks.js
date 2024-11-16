export const handleSaveError = (error, data, next) => {

    const { code, name } = error;
    error.status = (name === 'MongoServerError' && code === 11000) ? 409 : 400;
    next();
};

export const seUpdateSettings = (next) => {
    this.options.new = true;
    this.options.runValidators = true;

next();
};
