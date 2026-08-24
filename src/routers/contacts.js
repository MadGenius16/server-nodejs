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
  isValidId,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),

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
  isValidId,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  ctrlWrapper(deleteContactController),
);

router.put(
  '/:id',
  jsonParser,
  isValidId,
  checkRoles(ROLES.TEACHER),
  validateBody(updateContactsSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:id',
  jsonParser,
  isValidId,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

export default router;
