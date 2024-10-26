import pino from "pino-http";
import cors from "cors";
import express from "express";

import { env } from "./utils/env.js";
import * as contactServices from "./services/contacts.js";

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

    app.get("/contacts", async (reg, res) => {
        const data = await contactServices.getContacts();

        res.json({
            status: 200,
            message: "Successfully find contacts:)",
            data,
        });
    });

    app.get("/contacts/:id", async (reg, res) => {
        const { _id } = reg.params;
        const data = await contactServices.getContactById(_id);

        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "Contact not found",
            });
        };

        res.json({
            status: 200,
            message: `Successfully found contact with id ${_id}!`,
            data,
        });
    });

app.use('*', (reg, res, next) => {
    res.status(404).json({
        message: 'Not found',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

};

