// src/controllers/students.js

import { getAllStudents, getStudentById } from '../services/students.js';
import createHttpError from 'http-errors';

export const getStudentsController = async (
    req,
    res,
      next,
  ) => {
      try {
        const students = await getAllStudents();
      
        res.json({
          status: 200,
          message: 'Successfully found students!',
          data: students,
        });
      } catch(err) {
          next(err);
      }
  };

export const getStudentByIdController = async (
    req,
    res,
  ) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);
    
    // Önceki kod
      // if (!student) {
      //   res.status(404).json({
      //     message: "Student not found",
      //   });
      //   return;
      // }
  
      // Şimdi, res.status(404 yerine temel hata işleme ekliyoruz
    if (!student) {
      throw createHttpError(404, 'Student not found');
    }

	// Öğrenci bulunursa cevap
  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
