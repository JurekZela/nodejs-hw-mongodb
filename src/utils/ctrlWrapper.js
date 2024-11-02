const ctrlWrapper = (controller) => async (reg, res, next) => {
        try {
            await controller(reg, res, next);
        } catch (err) {
            next(err);
        }
    };

export default ctrlWrapper;
