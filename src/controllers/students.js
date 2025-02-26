// src/controllers/students.js

import { getAllStudents, getStudentById } from '../services/students.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';


export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);
  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  const { sortBy, sortOrder } = parseSortParams(req.query);
  

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
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



export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await updateStudent(studentId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};


