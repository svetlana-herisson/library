import express from 'express';
import { v4 as uuid } from 'uuid';
import unload from '../middleware/unload';
import { IBooksRepository } from '../interfaces/IBooksRepository';
import { container } from '../container';

// Импортируем типы для запросов и ответов
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

import { TYPES } from '../constants/tokens';

const booksRepository = container.get<IBooksRepository>(TYPES.BooksRepository);

// Интерфейс для данных книги
interface Book {
  id: string;
  title: string;
  desc: string;
}

// GET / — получить все книги
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await booksRepository.getBooks();
    res.json(books);
  } catch (error) {
    console.error('Ошибка при получении книг:', error);
    res.status(500).json({ message: 'Не удалось найти книги' });
  }
});

// GET /:id — найти книгу по ID
router.get('/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

if (typeof id !== 'string') {
  return res.status(400).json({ message: 'ID должен быть строкой' });
}

  try {
    const book = await booksRepository.getBook(id);
    if (!book) {
      res.status(404).json({ message: 'Книга отсутствует' });
    }
    res.json(book);
  } catch (error) {
    console.error(`Ошибка при поиске книги с ID ${id}:`, error);
    res.status(500).json({ message: 'Не удалось найти книгу' });
  }
});

// POST / — добавить новую книгу
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { title, desc } = req.body;

  // Валидация обязательных полей
  if (!title || !desc) {
      res.status(400).json({
      message: 'Поля title и desc обязательны для заполнения'
    });
  }

  try {
    const newBook: Book = await booksRepository.createBook({ title, desc });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Ошибка при создании книги:', error);
    res.status(500).json({ message: 'Не удалось создать книгу' });
  }
});

// PUT /:id — обновить существующую книгу по ID
router.put('/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, desc } = req.body;
  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'ID должен быть строкой' });
  }
  // Валидация обязательных полей
  if (!title || !desc) {
      res.status(400).json({
      message: 'Поля title и desc обязательны для заполнения'
    });
  }

  try {
    const updatedBook = await booksRepository.updateBook(id, { title, desc });
    if (!updatedBook) {
       res.status(404).json({ message: 'Книга не найдена' });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error(`Ошибка при обновлении книги с ID ${id}:`, error);
    res.status(500).json({ message: 'Не удалось обновить книгу' });
  }
});

// DELETE /:id — удаление книги по ID
router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'ID должен быть строкой' });
  }  
  try {
    const deleted = await booksRepository.deleteBook(id);
    if (!deleted) {
      res.status(404).json({ message: 'Книга не найдена' });
    }
    res.json({ message: 'Книга успешно удалена' });
  } catch (error) {
    console.error(`Ошибка при удалении книги с ID ${id}:`, error);
    res.status(500).json({ message: 'Не удалось удалить книгу' });
  }
});

// POST /authorization — авторизация пользователя
router.post('/authorization', (req: Request, res: Response): void => {
  const user = {
    id: 1,
    mail: 'test@mail.ru'
  };
  res.status(201).json(user);
});

export default router;
