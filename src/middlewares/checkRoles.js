// src/middlewares/checkRoles.js

import createHttpError from 'http-errors';

import { StudentsCollection } from '../db/models/student.js';
import { ROLES } from '../constants/index.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    const { role } = user;
    if (roles.includes(ROLES.TEACHER) && role === ROLES.TEACHER) {
      next();
      return;
    }

    if (roles.includes(ROLES.PARENT) && role === ROLES.PARENT) {
      const { id } = req.params;
      // Если id не указан (например, для GET /students),
      // то просто пропускаем, т.к. контроллер сам отфильтрует студентов по parentId.
      if (!id) {
        next();
        return;
      }

      // Если id указан, проверяем, что студент принадлежит этому родителю.
      const student = await StudentsCollection.findOne({
        _id: id,
        parentId: user._id,
      });

      if (student) {
        next();
        return;
      }
    }

    next(createHttpError(403));
  };
