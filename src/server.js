import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { getAllStudents, getStudentById } from './services/students.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(getEnvVar('PORT', 8700));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.json(students);
  });

  app.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    const student = await getStudentById(id);

    if (student === null) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    res.json(student);
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.json(contacts);
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (contact === null) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.json(contact);
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
