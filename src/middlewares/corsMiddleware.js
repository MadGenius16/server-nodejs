import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      // Дозволяємо запити без заголовка Origin (наприклад, Postman, мобільні додатки, curl)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.onrender.com')
      ) {
        return callback(null, true);
      }

      return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200,
  });
