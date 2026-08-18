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
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = express.Router();
const jsonParser = express.json();

router.get(
  '/',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  ctrlWrapper(getContactsController),
);

router.get(
  '/:id',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  jsonParser,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:id',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.put(
  '/:id',
  jsonParser,
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:id',
  jsonParser,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

export default router;
