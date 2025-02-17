// src/router/students.js
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentSchema } from '../validation/students.js';
import { updateStudentSchema } from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';

const router = Router();

// Apply role-based access control for each route

// Get all students (only accessible by TEACHER role)
router.get('/students', checkRoles(ROLES.TEACHER), ctrlWrapper(getStudentsController));

// Get student by ID (accessible by TEACHER or PARENT roles)
router.get(
  '/students/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

// Create a new student (only accessible by TEACHER role)
router.post(
  '/students',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

// Register a new student (also only accessible by TEACHER role)
router.post(
  '/students/register',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

// Delete a student (only accessible by TEACHER role)
router.delete(
  '/students/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteStudentController),
);

// Upsert student (only accessible by TEACHER role)
router.put(
  '/students/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

// Update student (only accessible by TEACHER or PARENT roles)
router.patch(
  '/students/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
