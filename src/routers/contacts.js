import express from 'express';
import * as ctrl from '../controllers/contacts.js';
import { isValidId } from '../validation/isValidId.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../validation/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contactValidation.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
router.use(authenticate);

router.get('/', ctrlWrapper(ctrl.getAllContacts));
router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));
router.post('/', validateBody(createContactSchema), ctrlWrapper(ctrl.createContact));
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(ctrl.updateContact));
router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

export default router;
