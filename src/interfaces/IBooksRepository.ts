import  IBook  from './IBook';

export interface IBooksRepository {
  createBook(book: Omit<IBook, 'id'>): Promise<IBook>;
  getBook(id: string): Promise<IBook | null>;
  getBooks(): Promise<IBook[]>;
  updateBook(id: string, book: Partial<IBook>): Promise<IBook | null>;
  deleteBook(id: string): Promise<boolean>;
}
