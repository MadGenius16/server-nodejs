import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  // patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  jsonParser,
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));

router.put(
  '/contacts/:id',
  jsonParser,
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/contacts/:id',
  jsonParser,
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

export default router;
