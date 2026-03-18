import { injectable } from 'inversify';
import { IBooksRepository } from '../interfaces/IBooksRepository';
import { BookModel } from '../models/books_models';
import IBook from '../interfaces/IBook';
import { Model, Document } from 'mongoose';

@injectable()
export class BookRepository implements IBooksRepository {
  constructor(private bookModel: Model<IBook & Document>) {}

  async createBook(book: Omit<IBook, 'id'>): Promise<IBook> {
    try {
      const newBook = await this.bookModel.create(book);
      return this.toIBook(newBook);
    } catch (error) {
      console.error('Error creating book:', error);
      throw new Error('Failed to create book');
    }
  }

  async getBook(id: string): Promise<IBook | null> {
    const book = await this.bookModel
      .findById(id)
      .select('-__v')
      .lean()
      .exec();

    if (!book) return null;
    return this.toIBook(book);
  }

  async getBooks(): Promise<IBook[]> {
    const books = await this.bookModel
      .find()
      .select('-__v')
      .lean()
      .exec();
    return books.map(book => this.toIBook(book));
  }

  async updateBook(id: string, book: Partial<Omit<IBook, 'id'>>): Promise<IBook | null> {
    const updatedBook = await this.bookModel
      .findOneAndUpdate(
        { _id: id },
        book,
        { new: true, select: '-__v', lean: true }
      )
      .exec();

    if (!updatedBook) return null;
    return this.toIBook(updatedBook);
  }

  async deleteBook(id: string): Promise<boolean> {
    const result = await this.bookModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  private toIBook(doc: IBook & Document): IBook {
    return {
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      authors: doc.authors,
      favorite: doc.favorite,
      fileCover: doc.fileCover,
      fileName: doc.fileName,
      fileBook: doc.fileBook,
    };
  }
}
