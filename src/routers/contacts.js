import { Router } from "express";
import * as contactsControllers from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { isValidId } from "../utils/isValidId.js";
import { createContactSchema, updateContactSchema } from "../validation/validationSchema.js";

const router = Router();

router.get("/", ctrlWrapper(contactsControllers.getContactsController));

router.get("/:contactId", isValidId, ctrlWrapper(contactsControllers.getContactByIdController));

router.post("/", validateBody(createContactSchema), ctrlWrapper(contactsControllers.createContactController));

router.patch("/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(contactsControllers.patchContactController));

router.delete("/:contactId", isValidId, ctrlWrapper(contactsControllers.deleteContactController));

export default router;
