import { Router } from 'express';
import authRouter from './auth.js';
import studentsRouter from './students.js';
import contactsRouter from './contacts.js';
import reviewsRouter from './reviews.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = Router();
router.use('/auth', authRouter);
router.use('/students', authenticate, studentsRouter);
router.use('/contacts', authenticate, contactsRouter);
router.use('/reviews', authenticate, reviewsRouter);

export default router;
