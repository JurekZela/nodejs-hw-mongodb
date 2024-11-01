import createHttpError from "http-errors";
import * as contactServices from "../services/contacts.js";

export const getContactsController = async (reg, res) => {
    const data = await contactServices.getContacts();

    res.json({
        status: 200,
        message: "Successfully find contacts:)",
        data,
    });
};

export const getContactByIdController =  async (reg, res) => {

    const { contactId } = reg.params;

    const data = await contactServices.getContactById(contactId);


    if (!data) {
        throw createHttpError(404, "Contact not found");
    };

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
};

export const createContactController = async (reg, res) => {
    const contact = await contactServices.createContact(reg.body);

    res.status(201).json(
        {
            status: 201,
            message: "Successfully created a contact!",
            data: contact,
        }
    );
};

export const patchContactController = async (reg, res, next) => {
    const { contactId } = reg.params;

    const result = await contactServices.updateContact({ _id: contactId, payload: reg.body });


    if (!result) {
        next(createHttpError(404, "Contact not found"));
        return;
    };

    res.json({
        status: 200,
        message: 'Successfully upserted a student!',
        data: result.contact,
    });
};

export const deleteContactController = async (reg, res, next) => {
    const { contactId } = reg.params;
    const contact = await contactServices.deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    };

    res.status(204).send();
};
