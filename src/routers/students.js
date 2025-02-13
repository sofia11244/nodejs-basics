// src/router/students.js
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
} from '../controllers/students.js';

const router = Router();

// router.get('/students', getStudentsController);
// router.get('/students/:studentId', getStudentByIdController);
router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:studentId', ctrlWrapper(getStudentByIdController));

router.post('/students', ctrlWrapper(createStudentController));

export default router;
