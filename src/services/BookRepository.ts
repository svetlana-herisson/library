import { injectable } from 'inversify';
import { IBooksRepository } from '../interfaces/IBooksRepository';
import  { BookModel }  from "../models/books_models";
import  IBook  from "../interfaces/IBook"

class BookReporitory {
    async createBook (book: IBook) {
        try {
            const newBook = new BookModel(book);
            
            await newBook.save();
            return newBook;
        } catch (error) {
            console.error(error);
        }
    };

    async getBook (id: string) {
        const book = await BookModel.findById(id).select('-__v');
        if (!book) throw new Error('Book not found');
        return book;
    };

        async getBooks() {
        return await BookModel.find().select('-__v');
    };

    async updateBook(id: string, book: IBook) {
        const updatedBook = await BookModel.findOneAndUpdate(
        { _id: id },
        book,
        { new: true, select: '-__v' }
        );
        if (!updatedBook) throw new Error('Book not found');
        return updatedBook;
  }
    async deleteBook(id: string) {
        const result = await BookModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) throw new Error('Book not found');
        return { message: 'Book deleted successfully' };
  }

}