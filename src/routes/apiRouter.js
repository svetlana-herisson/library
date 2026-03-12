const express = require('express');
const {Book, store} = require('../books')
const { v4: uuid } = require('uuid');
const unload = require('../middleware/unload');
const router = express.Router();
const Book = require('../../models/books_models')// экспортируем схему модели
const { IBooksRepository } = require("../interfaces/IBooksRepository");
const container = require('../container'); 

const booksRepository = container.get(IBooksRepository);

router.get('/', async (req, res) => {
    try {
        const books = await booksRepository.getBooks();
        res.json(books);
    } catch (error) {
        console.error(`Ошибка: ${id}:`, error);
        res.status(500).json({ message: 'Не удалось найти книгу' })
    }
}) // получили все книги 


router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const book = await booksRepository.getBook(id);
        if (!book) {
        return res.status(404).json({ message: 'Книга отсутствует' });
    }
    res.json(book);
    } catch (error) {
        console.error(`Ошибка: ${id}:`, error);
        res.status(500).json({ message: 'Не удалось найти книгу' })
  }
}) // находим книгу по ID


router.post('/', async (req, res) => {
    try {
        const newBook = await booksRepository.createBook({ title, desc });
        res.status(201).json(newBook);
    } catch (error) {
        console.error(`Ошибка: ${id}:`, error);
        res.status(500).json({ message: 'Не удалось создать книгу' })
    }
}) //Добавляем новую книгу


router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await booksRepository.updateBook(id, { title, desc });
        if (!updatedBook) {
        return res.status(404).json({ message: 'Книга не найдена' });
    }
    res.json(updatedBook);
  } catch (error) {
        console.error(`Ошибка при обновлении книги с ID: ${id}:`, error);
        res.status(500).json({ message: 'Не удалось найти книгу' })
  }
}) // Обновляем существующую книгу по ID

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await booksRepository.deleteBook(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }
    res.json({ message: 'Книга успешно удалена' });
  } catch (error) {
        console.error(`Ошибка при удалении книги с ID: ${id}:`, error);
        res.status(500).json({ message: 'Не удалось удалить книгу' })
  }
}) // Удаление книги по ID

router.post('/autorization', (req, res) => {
    const user = { id: 1,  mail: "test@mail.ru" };
    res.status(201).json(user)
}) // авторизация пользователя 

module.exports = router;