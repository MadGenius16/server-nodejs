import { StudentsCollection } from '../db/models/student.js';

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentById = async (id) => {
  const student = await StudentsCollection.findById(id);
  return student;
};

export const createStudent = async (student) => {
  const newStudent = await StudentsCollection.create(student);
  return newStudent;
};

export const deleteStudent = async (id) => {
  const Student = await StudentsCollection.findByIdAndDelete(id);
  return Student;
};

export const updateStudent = async (id, payload, options = {}) => {
  const rawResult = await StudentsCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
