import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:id', ctrlWrapper(getStudentByIdController));

router.post('/students', ctrlWrapper(createStudentController));

router.delete('/students/:id', ctrlWrapper(deleteStudentController));

router.put('/students/:id', ctrlWrapper(upsertStudentController));

router.patch('/students/:id', ctrlWrapper(patchStudentController));

export default router;
