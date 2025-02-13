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

// src/controllers/students.js

import { createStudent } from '../services/students.js';

export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};

import { deleteStudent } from "../services/students.js";

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;

  const student = await deleteStudent(studentId);

  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(204).send();
};

// "Update" (güncelleme) ve "Insert" (ekleme) kelimelerinin birleşiminden türetilmiştir. 
// Upsert işlemi, veritabanlarında, eğer belirli bir kayıt mevcutsa güncellenmesini, yoksa yeni bir kayıt oluşturulmasını sağlar.
// src/controllers/students.js


import { updateStudent } from "../services/students.js";

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;

  const result = await updateStudent(studentId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.student,
  });
};
