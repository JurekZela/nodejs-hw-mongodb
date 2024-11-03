import { Router } from "express";
import * as contactsControllers from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isVaildId } from "../middlewares/isVaildId.js";
import { createContactSchema, updateContactSchema } from "../validation/validationSchema.js";

const router = Router();

router.get("/", ctrlWrapper(contactsControllers.getContactsController));

router.get("/:contactId", isVaildId, ctrlWrapper(contactsControllers.getContactByIdController));

router.post("/", validateBody(createContactSchema), ctrlWrapper(contactsControllers.createContactController));

router.patch("/:contactId", isVaildId, validateBody(updateContactSchema), ctrlWrapper(contactsControllers.patchContactController));

router.delete("/:contactId", isVaildId, ctrlWrapper(contactsControllers.deleteContactController));

export default router;
