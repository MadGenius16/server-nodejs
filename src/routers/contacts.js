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

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:id', ctrlWrapper(getContactByIdController));
router.post('/contacts', jsonParser, ctrlWrapper(createContactController));
router.delete('/contacts/:id', ctrlWrapper(deleteContactController));
router.put('/contacts/:id', jsonParser, ctrlWrapper(upsertContactController));
router.patch('/contacts/:id', jsonParser, ctrlWrapper(patchContactController));

export default router;
