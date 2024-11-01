import createHttpError from "http-errors";

const notFoundHandler = (reg, res, next) => {
    res.status(404).json({
        message: createHttpError(404, "Route not found"),
    });
};

export default notFoundHandler;
