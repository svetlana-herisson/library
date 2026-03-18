// src/container.ts
import { Container } from 'inversify';
import { TYPES } from './constants/tokens';
import { IBooksRepository } from './interfaces/IBooksRepository';
import { BookRepository } from './services/BookRepository'; // ваш репозиторий

const container = new Container();

container.bind<IBooksRepository>(TYPES.BooksRepository).to(BookRepository);

export { container };
