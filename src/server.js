import cors from "cors";
import express from "express";

import { env } from "./utils/env.js";
import router from "./routers/contacts.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import logger from "./middlewares/logger.js";


export const setupServer = () => {
    const app = express();
    app.use(cors());

    app.use(express.json(
        {
            type: ['application/json', 'application/vnd.api+json'],
            limit: '100kb',
        }
    ));

    // app.use(logger);

    app.use("/contacts", router);

    app.use(notFoundHandler);

    app.use(errorHandler);

    const PORT = Number(env('PORT', '3000'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });
};
