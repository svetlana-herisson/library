import  IBook  from './IBook';


export interface IBooksRepository {
  getBooks(): Promise<any[]>;
  getBook(id: string): Promise<any | null>;
  createBook(book: any): Promise<any>;
  updateBook(id: string, book: any): Promise<any | null>;
  deleteBook(id: string): Promise<boolean>;
}