const errorHandler = (err, reg, res, next) => {

        res.status(500).json({
            status: 500,
            message: "Something went wrong",
            data: err.message,
        });
};

export default errorHandler;
