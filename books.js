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
        this.fileBook = fileBook;
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
module.exports = {Book, store}