"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const container_1 = require("../container");
const router = express_1.default.Router();
const tokens_1 = require("../constants/tokens");
const booksRepository = container_1.container.get(tokens_1.TYPES.BooksRepository);
// GET / — получить все книги
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield booksRepository.getBooks();
        res.json(books);
    }
    catch (error) {
        console.error('Ошибка при получении книг:', error);
        res.status(500).json({ message: 'Не удалось найти книги' });
    }
}));
// GET /:id — найти книгу по ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'ID должен быть строкой' });
    }
    try {
        const book = yield booksRepository.getBook(id);
        if (!book) {
            res.status(404).json({ message: 'Книга отсутствует' });
        }
        res.json(book);
    }
    catch (error) {
        console.error(`Ошибка при поиске книги с ID ${id}:`, error);
        res.status(500).json({ message: 'Не удалось найти книгу' });
    }
}));
// POST / — добавить новую книгу
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, desc } = req.body;
    // Валидация обязательных полей
    if (!title || !desc) {
        res.status(400).json({
            message: 'Поля title и desc обязательны для заполнения'
        });
    }
    try {
        const newBook = yield booksRepository.createBook({ title, desc });
        res.status(201).json(newBook);
    }
    catch (error) {
        console.error('Ошибка при создании книги:', error);
        res.status(500).json({ message: 'Не удалось создать книгу' });
    }
}));
// PUT /:id — обновить существующую книгу по ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedBook = yield booksRepository.updateBook(id, { title, desc });
        if (!updatedBook) {
            res.status(404).json({ message: 'Книга не найдена' });
        }
        res.json(updatedBook);
    }
    catch (error) {
        console.error(`Ошибка при обновлении книги с ID ${id}:`, error);
        res.status(500).json({ message: 'Не удалось обновить книгу' });
    }
}));
// DELETE /:id — удаление книги по ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'ID должен быть строкой' });
    }
    try {
        const deleted = yield booksRepository.deleteBook(id);
        if (!deleted) {
            res.status(404).json({ message: 'Книга не найдена' });
        }
        res.json({ message: 'Книга успешно удалена' });
    }
    catch (error) {
        console.error(`Ошибка при удалении книги с ID ${id}:`, error);
        res.status(500).json({ message: 'Не удалось удалить книгу' });
    }
}));
// POST /authorization — авторизация пользователя
router.post('/authorization', (req, res) => {
    const user = {
        id: 1,
        mail: 'test@mail.ru'
    };
    res.status(201).json(user);
});
exports.default = router;
