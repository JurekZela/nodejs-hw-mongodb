import pino from "pino-http";
import express from "express";

const app = express();

const logger = app.use(pino({
    transport: {
        target: 'pino-pretty',
    }
}));

export default logger;
