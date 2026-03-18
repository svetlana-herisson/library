"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
// src/container.ts
const inversify_1 = require("inversify");
const tokens_1 = require("./constants/tokens");
const BookRepository_1 = require("./services/BookRepository"); // ваш репозиторий
const container = new inversify_1.Container();
exports.container = container;
container.bind(tokens_1.TYPES.BooksRepository).to(BookRepository_1.BookRepository);
