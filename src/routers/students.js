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

const router = express.Router();
const jsonParser = express.json();

router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:id', ctrlWrapper(getStudentByIdController));

router.post('/students', jsonParser, ctrlWrapper(createStudentController));

router.delete('/students/:id', ctrlWrapper(deleteStudentController));

router.put('/students/:id', jsonParser, ctrlWrapper(upsertStudentController));

router.patch('/students/:id', jsonParser, ctrlWrapper(patchStudentController));

export default router;
