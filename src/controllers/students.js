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
import { ROLES } from '../constants/index.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const studentFilter = {
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  };
  if (req.user.role === ROLES.PARENT) {
    studentFilter.parentId = req.user._id;
  }

  const students = await getAllStudents(studentFilter);

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
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }
  const newStudent = {
    ...req.body,
    parentId: req.user._id,
    ...(photoUrl && { photo: photoUrl }),
  };
  const student = await createStudent(newStudent);
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
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  // const result = await updateStudent(id, {
  //   ...req.body,
  //   ...(photoUrl && { photo: photoUrl }),
  // });

  const result = await updateStudent(
    id,
    {
      ...req.body,
      ...(photoUrl && { photo: photoUrl }),
    },
    {
      upsert: true,
    },
  );

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

export const patchStudentController = async (req, res, next) => {
  const { id } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateStudent(id, {
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};
