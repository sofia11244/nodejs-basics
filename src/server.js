// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import studentsRouter from './routers/students.js';
import { env } from './utils/env.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env('PORT', '10000'));

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
      message: 'Hello World!',
    });
  });

  app.use(studentsRouter); // Yönlendiriciyi app'e middleware olarak ekliyoruz

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use(cookieParser());

};




// bunu kullanabilirsin
// import dotenv from "dotenv";
// dotenv.config();
// const PORT = Number(process.env.PORT) || 3000;


// ya da böyle:


// server.js sadece middleware'leri ve router'ları yükleyen bir dosya.