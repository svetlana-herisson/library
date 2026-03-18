"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = require("../books");
const router = express_1.default.Router();
// Middleware для парсинга form-данных
router.use(express_1.default.urlencoded({ extended: true }));
// Инициализация тестовых данных (лучше вынести в отдельный файл)
if (books_1.store.books.length === 0) {
    [1, 2, 3].forEach(el => {
        const newBook = new books_1.Book({
            title: `book ${el}`,
            description: `description book ${el}`
        });
        books_1.store.books.push(newBook);
    });
}
// GET / — отобразить главную страницу со списком книг
router.get('/', (req, res) => {
    const { books } = books_1.store;
    res.render('books/index', {
        title: 'Books',
        books: books
    });
});
// GET /create — отобразить форму для создания новой книги
router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Book | Create',
        book: {}
    });
});
// POST /create — создать новую книгу
router.post('/create', (req, res) => {
    const { title, description } = req.body;
    // Валидация обязательных полей
    if (!title || !description) {
        return res.status(400).render('books/create', {
            title: 'Book | Create',
            error: 'Поля title и description обязательны для заполнения',
            book: req.body
        });
    }
    const newBook = new books_1.Book({
        title,
        description
    });
    books_1.store.books.push(newBook);
    res.redirect('/books');
});
// GET /:id — отобразить книгу по ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const book = books_1.store.books.find(book => book.id === id);
    if (!book) {
        return res.status(404).redirect('/err-404');
    }
    res.render('books/view', {
        title: 'Book | View',
        book: book
    });
});
// GET /update/:id — отобразить форму для обновления книги
router.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const book = books_1.store.books.find(book => book.id === id);
    if (!book) {
        return res.status(404).redirect('/err-404');
    }
    res.render('books/update', {
        title: 'Book | Update',
        book: book
    });
});
// POST /update/:id — обновить книгу
router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const idx = books_1.store.books.findIndex(book => book.id === id);
    if (idx === -1) {
        return res.status(404).redirect('/err-404');
    }
    // Валидация обязательных полей
    if (!title || !description) {
        return res.status(400).render('books/update', {
            title: 'Book | Update',
            error: 'Поля title и description обязательны для заполнения',
            book: Object.assign(Object.assign({}, books_1.store.books[idx]), { title, description })
        });
    }
    books_1.store.books[idx] = Object.assign(Object.assign({}, books_1.store.books[idx]), { title,
        description });
    res.redirect('/books');
});
// DELETE /:id — удалить книгу (рекомендуемый метод)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const idx = books_1.store.books.findIndex(book => book.id === id);
    if (idx === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    books_1.store.books.splice(idx, 1);
    res.json({ message: 'Book deleted successfully' });
});
// POST /delete/:id — альтернативный вариант для браузеров без поддержки DELETE
router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const idx = books_1.store.books.findIndex(book => book.id === id);
    if (idx === -1) {
        return res.status(404).redirect('/err-404');
    }
    books_1.store.books.splice(idx, 1);
    res.redirect('/books');
});
exports.default = router;
