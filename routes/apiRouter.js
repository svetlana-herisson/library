const express = require('express');
const {Book, store} = require('../books')
const { v4: uuid } = require('uuid');
const unload = require('../middleware/unload');
const router = express.Router();


router.get('/', (req, res) => {
    const { books } = store
    res.json(books)
}) // получили все книги 


router.get('/:id', (req, res) => {
    const { books } = store
    const { id } = req.params 
    const book = books.find(el => el.id === id);

    if (book) {
        res.json(book)
    } else {
        res.status(404);
        res.json('404 | Книга не найдена')
    }
}) // находим книгу по ID


router.post('/', unload.single('/unload'), (req, res) => {
    const { books } = store
    const { title, description, authors, favorite, fileCover, fileName } = req.body

    const newBook = new Book(uuid(), title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);
    res.status(201).json(newBook);
}) //Добавляем новую книгу


router.put('/:id', (req, res) => {
    const { books } = store
    const { id } = req.params 
    const index = books.findIndex(el => el.id === id)
    if (index === -1) return res.status(404).json('404 | Книга не найдена');

    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const updatedBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
    books[index] = updatedBook;
    res.json(updatedBook)
}) // Обновляем существующую книгу по ID

router.delete('/:id', (req, res) => {
    const { books } = store
    const { id } = req.params 
    const index = books.findIndex(el => el.id === id)
    if (index === -1) return res.status(404).json('404 | Книга не найдена');

    books.splice(index, 1)
    res.status(204).send()
}) // Удаление книги по ID

router.post('/autorization', (req, res) => {
    const user = { id: 1,  mail: "test@mail.ru" };
    res.status(201).json(user)
}) // авторизация пользователя 

module.exports = router;