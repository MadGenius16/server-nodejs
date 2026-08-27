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

import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.get(
  '/',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  ctrlWrapper(getStudentsController),
);

router.get(
  '/:id',
  isValidId,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  ctrlWrapper(getStudentByIdController),
);

router.post(
  '/',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.delete(
  '/:id',
  isValidId,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  ctrlWrapper(deleteStudentController),
);

router.put(
  '/:id',
  isValidId,
  checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/:id',
  isValidId,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  upload.single('photo'),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
