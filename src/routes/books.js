const express = require('express')
const router = express.Router();
const {Book, store} = require('../books');

[1, 2, 3].map(el => {
    const newBook = new Book(`book ${el}`, `description book ${el}`);
    store.books.push(newBook);
});

router.get('/', (req, res) => {
    const { books } = store;
    res.render('books/index', {
        title: 'Books',
        todos: books,
    })
}) // Отображает главную страницу со списком всех задач.

router.get('/create', (req, res) => {
    res.render('books/create' /*отрисовываем форму, указываем ее шаблон /create*/ , {
        title: 'Book | Create', 
        books: {}
    }) // передаем объект с данными
}); // с роут create методом get.
// Отображает форму для создания новой задачи

router.post('/create', (req, res) => {
    const { books } = store // забираем все имеющиеся записи
    const { title, description } = req.body //  получаем title, desc из body 

    const newBook = new Book(title, description) // создаем новый объект класса . На вход принимающий title, desc
    books.push(newBook) // добавляем запись в массив
    res.redirect('/books') // возвращаемся на главную страницу 

     res.status(201).redirect('/books');
}); // Обрабатывает данные формы и создает новую задачу 

router.get('/:id', (req, res) => {
    const {books} = store // забираем все имеющиеся записи
    const {id} = req.params // получаем id из адресной строки
    const idx = books.findIndex(el => el.id === id) // находим индекс и сравниваем с id 
    if (idx === -1) {
        return res.status(404).redirect('/err-404')
    } // если запись не найдена, выводим на страницу 404

    res.render("books/view" /* указываем сам шаблон */, {
        title: "Book | View", // передаем данные title
        books: books[idx] // передаем под нужныи индексом
    }) // отрисовываем шаблон записи 
}); // Отображает конкретную задачу по её идентификатору.

router.get('/update/:id', (req, res) => {
    const {books} = store // забираем все имеющиеся записи
    const {id} = req.params // получаем id из адресной строки
    const idx = books.findIndex(el => el.id === id) // находим индекс и сравниваем с id 
   
    if (idx === -1) {
        return res.status(404).redirect('/err-404')
    } // если запись не найдена, выводим на страницу 404

    res.render("books/update" /* указываем сам шаблон */, {
        title: "Book | Update", // передаем данные title
        books: books [idx] // передаем под нужныи индексом
    })
}); // Отображает форму для обновления задачи.

router.post('/update/:id', (req, res) => {
    const {books} = store // забираем все имеющиеся записи
    const {id} = req.params // получаем id из адресной строки
    const idx = books.findIndex(el => el.id === id) // находим индекс и сравниваем с id 
    const {title, description} = req.body //  получаем title, desc из body 
   
    if (idx === -1) {
        return res.status(404).redirect('/err-404')
    } // если запись не найдена, выводим на страницу 404

    books[idx] = {
        ...books[idx], // разворачиваем запись с помощью спред оператора
        title, // обновляем 
        description, // обновляем
    };


    res.redirect('/books'); // возвращает на главную страницу
}); // Обрабатывает обновление задачи.

router.post('/delete/:id', (req, res) => {
    const {books} = store // забираем все имеющиеся записи
    const {id} = req.params // получаем id из адресной строки
    const idx = books.findIndex(el => el.id === id) // находим индекс и сравниваем с id 
      
    if (idx === -1) {
        return res.status(404).redirect('/err-404')
    } // если запись не найдена, выводим на страницу 404

    books.splice(idx, 1) // удаляем по текущение индексу
    res.redirect('/books') // возвращаемся на страницу 
}); // Удаляет задачу по её идентификатору. 


module.exports = router;