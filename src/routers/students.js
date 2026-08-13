import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:id', isValidId, ctrlWrapper(getStudentByIdController));

router.post(
  '/students',
  jsonParser,
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.delete('/students/:id', isValidId, ctrlWrapper(deleteStudentController));

router.put(
  '/students/:id',
  jsonParser,
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/students/:id',
  jsonParser,
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
