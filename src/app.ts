import express from 'express';
import logger from './middleware/logger';
import error404 from './middleware/err-404';
import indexRouter from './routes/indexRouter';
import ejsRouter from './routes/books';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library';

// Middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Исправлено: 'view engine' → 'view engine'

// Роуты
app.use('/', indexRouter);
app.use('/books', ejsRouter);

// Обработка 404
app.use(error404);

async function start() {
  try {
    await mongoose.connect(DB_URI);
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
      console.log('База данных подключена');
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
  }
}

start();
