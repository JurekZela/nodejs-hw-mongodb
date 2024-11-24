import multer from "multer";
import { TEMP_UPLOAD_DIR } from "../constants/index.js";
import createHttpError from "http-errors";

const storage = multer.diskStorage(
    {
        destination: TEMP_UPLOAD_DIR,
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now();

            cb(null, `${uniqueSuffix}_${file.originalname}`)
        },
    }
);

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
    const extension = file.originalname.split('.').pop();
    if (extension === "exe") {
        return cb(createHttpError(400, '.exe extension not allow'));
    };

    cb(null, true);
};

export const upload = multer({ storage, limits, fileFilter });
