import express from 'express';
import { Book, store } from '../books';

const router = express.Router();

// Middleware для парсинга form-данных
router.use(express.urlencoded({ extended: true }));

// Инициализация тестовых данных (лучше вынести в отдельный файл)
if (store.books.length === 0) {
  [1, 2, 3].forEach(el => {
    const newBook = new Book({
      title: `book ${el}`,
      description: `description book ${el}`
    });
    store.books.push(newBook);
  });
}

// GET / — отобразить главную страницу со списком книг
router.get('/', (req, res) => {
  const { books } = store;
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

  const newBook = new Book({
    title,
    description
  });
  store.books.push(newBook);
  res.redirect('/books');
});

// GET /:id — отобразить книгу по ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = store.books.find(book => book.id === id);

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
  const book = store.books.find(book => book.id === id);

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
  const idx = store.books.findIndex(book => book.id === id);

  if (idx === -1) {
    return res.status(404).redirect('/err-404');
  }

  // Валидация обязательных полей
  if (!title || !description) {
    return res.status(400).render('books/update', {
      title: 'Book | Update',
      error: 'Поля title и description обязательны для заполнения',
      book: { ...store.books[idx], title, description }
    });
  }

  store.books[idx] = {
    ...store.books[idx],
    title,
    description,
  };

  res.redirect('/books');
});

// DELETE /:id — удалить книгу (рекомендуемый метод)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const idx = store.books.findIndex(book => book.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  store.books.splice(idx, 1);
  res.json({ message: 'Book deleted successfully' });
});

// POST /delete/:id — альтернативный вариант для браузеров без поддержки DELETE
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const idx = store.books.findIndex(book => book.id === id);

  if (idx === -1) {
    return res.status(404).redirect('/err-404');
  }

  store.books.splice(idx, 1);
  res.redirect('/books');
});

export default router;
