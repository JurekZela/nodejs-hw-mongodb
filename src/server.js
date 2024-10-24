import pino from "pino-http";
import cors from "cors";
import express from "express";

import { env } from "./utils/env.js";

const PORT = Number(env('PORT', '3000'));


export const setupServer = () => {
    const app = express();
    app.use(cors());

    const logger = app.use(pino({
        transport: {
            target: 'pino-pretty',
        }
    }));
    // app.use(logger);

app.use('*', (reg, res, next) => {
    res.status(404).json({
        message: 'Not found',
    });
});

app.listen(PORT, () => {
    console.log(`Server is ${PORT}`);
});

};

