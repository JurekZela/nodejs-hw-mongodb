export const errorHandler = (err, reg, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;

    res.status(status).json({
        status,
        message,
        data: err.message,
    });
};
