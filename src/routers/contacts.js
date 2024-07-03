import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import * as ctrl from '../controllers/contacts.js';
import { validateBody } from '../validation/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contactValidation.js';
import { isValidId } from '../validation/isValidId.js';

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllContacts));
router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));
router.post('/', validateBody(createContactSchema), ctrlWrapper(ctrl.createContact));
router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(ctrl.updateContact));
router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

export default router;
