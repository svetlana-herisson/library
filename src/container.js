require("reflect-metadata");
const {  Container, decorate, injectable } = require("inversify");
const { BooksRepository } = require("./services/BookRepository");
const { IBooksRepository } = require("./interfaces/IBooksRepository");

const container = new Container();

decorate(injectable(), BooksRepository);

container.bind<IBooksRepository>(IBooksRepository).to(BooksRepository);

module.exports = { container };