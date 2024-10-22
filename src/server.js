import pino from "pino-http";
import cors from "cors";
import express from "express";

import { env } from "./utils/env.js";

const PORT = Number(env('PORT', '3000'));


export const startServer = () => {
    const app = express();

app.use(
    pino({
        transport: {
            target: 'pino-pretty',
        }
    })
);
app.use(cors());

app.use((reg, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
});

app.get('/', (reg, res) => {

    res.json({
        message: 'Hello World!',
    });
});

app.use('*', (reg, res, next) => {
    res.status(404).json({
        message: 'Route not found',
    });
});

app.use((err, reg, res, next) => {
    res.status(500).json({
        message: 'something with wrong!',
        error: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is ${PORT}`);
});

};
