import { v4 as uuid } from 'uuid';

interface BookData {
  id?: string;
  title?: string;
  description?: string;
  authors?: string;
  favorite?: boolean;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}

class Book {
  public id: string;
  public title: string;
  public description: string;
  public authors?: string;
  public favorite?: boolean;
  public fileCover?: string;
  public fileName?: string;
  public fileBook?: string;

  constructor(data: BookData = {}) {
    this.id = uuid();
    this.title = data.title || '';
    this.description = data.description || '';
    this.authors = data.authors || '';
    this.favorite = data.favorite || false;
    this.fileCover = data.fileCover || '';
    this.fileName = data.fileName || '';
    this.fileBook = data.fileBook || '';
  }
}

interface Store {
  books: Book[];
}

const store: Store = {
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

export { Book, store };
