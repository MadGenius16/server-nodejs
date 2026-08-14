import { Router } from 'express';
import authRouter from './auth.js';
import studentsRouter from './students.js';
import contactsRouter from './contacts.js';
const router = Router();
router.use('/auth', authRouter);
router.use('/students', studentsRouter);
router.use('/contacts', contactsRouter);

export default router;
