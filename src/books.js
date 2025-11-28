const express = require('express');
const  { v4: uuid } = require('uuid');

const app = express();
app.use(express.json());

class Book {
    constructor(id = uuid(), title = '', description = '', authors = '', favorite = Boolean, fileCover = '', fileName = '', fileBook = "") {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook
    }
}


const store = {
    books: [
        new Book(uuid(), '1984', 'Dystopian novel by George Orwell', 'George Orwell', 'false', 'cover1984.jpg', '1984.pdf'),
        new Book(uuid(), 'To Kill a Mockingbird', 'Novel by Harper Lee', 'Harper Lee', 'false', 'cover_mockingbird.jpg', 'mockingbird.pdf'),
        new Book(uuid(), 'The Great Gatsby', 'Novel by F. Scott Fitzgerald', 'F. Scott Fitzgerald', "true", 'cover_gatsby.jpg', 'gatsby.pdf'),
        new Book(uuid(), 'Moby Dick', 'Novel by Herman Melville', 'Herman Melville', 'false', 'cover_moby_dick.jpg', 'moby_dick.pdf')
    ],
} 

app.post('/login', (req, res) => {
    const user = { id: 1,  mail: "test@mail.ru" };
    res.status(201).json(user)
}) // авторизация пользователя 

app.get('/api/books', (req, res) => {
    const { books } = store
    res.json(books)
}) // получили все книги 

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books', (req, res) => {
    const { books } = store
    const { title, description, authors, favorite, fileCover, fileName } = req.body

    const newBook = new Book(uuid(), title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);
    res.status(201).json(newBook);
}) //Добавляем новую книгу

app.put('/api/books/:id', (req, res) => {
    const { books } = store
    const { id } = req.params 
    const index = books.findIndex(el => el.id === id)
    if (index === -1) return res.status(404).json('404 | Книга не найдена');

    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const updatedBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
    books[index] = updatedBook;
    res.json(updatedBook)
}) // Обновляем существующую книгу по ID

app.delete('/api/books/:id', (req, res) => {
    const { books } = store
    const { id } = req.params 
    const index = books.findIndex(el => el.id === id)
    if (index === -1) return res.status(404).json('404 | Книга не найдена');

    books.splice(index, 1)
    res.status(204).send('OK')
}) // Удаление книги по ID


const PORT = process.env.PORT || 3000; // Использует PORT из окружения или 3000 по умолчанию
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

