import createHttpError from 'http-errors';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { id } = req.params;
  const student = await getStudentById(id);
  // if (!student) {
  //   res.status(404).json({
  //     message: 'Student not found',
  //   });
  //   return;
  // }
  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found student with id ${id}!`,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created student!',
    data: student,
  });
};

export const deleteStudentController = async (req, res) => {
  const { id } = req.params;
  const student = await deleteStudent(id);
  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(204).json({
    status: 204,
    message: `Successfully deleted student with id ${id}!`,
  });
};

export const upsertStudentController = async (req, res) => {
  const { id } = req.params;
  const result = await updateStudent(id, req.body, {
    upsert: true,
  });

  if (!result) {
    throw createHttpError((404, 'Student not found'));
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.student,
  });
};

export const patchStudentController = async (req, res) => {
  const { id } = req.params;
  const result = await updateStudent(id, req.body);

  if (!result) {
    throw createHttpError((404, 'Student not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};
