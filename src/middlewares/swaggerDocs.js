import createHttpError from "http-errors";
import swaggerUI from "swagger-ui-express";
import { readFileSync } from "node:fs";

import { SWAGGER_PATH } from "../constants/index.js";

export const swaggerDocs = () => {
    try {
        const swaggerText = readFileSync(SWAGGER_PATH, "utf-8");
        const swaggerJSON = JSON.parse(swaggerText);

        return [...swaggerUI.serve, swaggerUI.setup(swaggerJSON)];

    } catch (err) {
        return ( req, res, next) =>
            next(createHttpError(500, "Can't load swagger docs"));
    };
};
