"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.Book = void 0;
const uuid_1 = require("uuid");
class Book {
    constructor(data = {}) {
        this.id = (0, uuid_1.v4)();
        this.title = data.title || '';
        this.description = data.description || '';
        this.authors = data.authors || '';
        this.favorite = data.favorite || false;
        this.fileCover = data.fileCover || '';
        this.fileName = data.fileName || '';
        this.fileBook = data.fileBook || '';
    }
}
exports.Book = Book;
const store = {
    books: [
        new Book({
            title: '1984',
            description: 'Dystopian novel by George Orwell',
            authors: 'George Orwell',
            favorite: false,
            fileCover: 'cover1984.jpg',
            fileName: '1984.pdf'
        }),
        new Book({
            title: 'To Kill a Mockingbird',
            description: 'Novel by Harper Lee',
            authors: 'Harper Lee',
            favorite: false,
            fileCover: 'cover_mockingbird.jpg',
            fileName: 'mockingbird.pdf'
        }),
        new Book({
            title: 'The Great Gatsby',
            description: 'Novel by F. Scott Fitzgerald',
            authors: 'F. Scott Fitzgerald',
            favorite: true,
            fileCover: 'cover_gatsby.jpg',
            fileName: 'gatsby.pdf'
        }),
        new Book({
            title: 'Moby Dick',
            description: 'Novel by Herman Melville',
            authors: 'Herman Melville',
            favorite: false,
            fileCover: 'cover_moby_dick.jpg',
            fileName: 'moby_dick.pdf'
        })
    ]
};
exports.store = store;
