const express = require('express');
const {Book, store} = require('../books')
const { v4: uuid } = require('uuid');
const unload = require('../middleware/unload');
const router = express.Router();
const Book = require('../../models/books_models')// экспортируем схему модели



router.get('/', async (req, res) => {
    try {
        const book = await Book.find().select('-__v') 
        // добавляем await, так как асинхронно
        // находим все поля за исключение служебных 

        res.json(book) // когда дождемся записи, возвращаем их 
    } catch (error) {
        res.status(500).json(error)
    }
}) // получили все книги 


router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const book = await Book.findById(id).select('-__v') 
            // добавляем await, так как асинхронно
            // находим все поля id за исключение служебных 
        res.json(book) // возвращаем все найденные поля
    } catch (error) {
        res.status(500).json(error)
    }
}) // находим книгу по ID


router.post('/', async (req, res) => {
    const { title, desc } = req.body
    const newBook = new Book({
        title, 
        desc,
    })
    try {
        await newBook.save()
        res.json(newBook)
    } catch (error) {
        res.status(500).json(error)
    }
}) //Добавляем новую книгу


router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, desc } = req.body

    try {
        await Book.findByIdAndUpdate(id, {title, desc}) 
        // находим объект по id и передаем данные, которые изменяем  
        res.redirect(`/api/books_models/${id}`)
    } catch (error) {
        res.status(500).json(error)
    }
}) // Обновляем существующую книгу по ID

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await Book.deleteOne({_id: id}) 
        // передаем фильтр ч/з _(нижнее подчеркивание и передаем id)
        res.json(true)
    } catch (error) {
        res.status(500).json(error)
    }
}) // Удаление книги по ID

router.post('/autorization', (req, res) => {
    const user = { id: 1,  mail: "test@mail.ru" };
    res.status(201).json(user)
}) // авторизация пользователя 

module.exports = router;