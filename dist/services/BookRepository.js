"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
let BookRepository = class BookRepository {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBook = yield this.bookModel.create(book);
                return this.toIBook(newBook);
            }
            catch (error) {
                console.error('Error creating book:', error);
                throw new Error('Failed to create book');
            }
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookModel
                .findById(id)
                .select('-__v')
                .lean()
                .exec();
            if (!book)
                return null;
            return this.toIBook(book);
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.bookModel
                .find()
                .select('-__v')
                .lean()
                .exec();
            return books.map(book => this.toIBook(book));
        });
    }
    updateBook(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBook = yield this.bookModel
                .findOneAndUpdate({ _id: id }, book, { new: true, select: '-__v', lean: true })
                .exec();
            if (!updatedBook)
                return null;
            return this.toIBook(updatedBook);
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.bookModel.deleteOne({ _id: id }).exec();
            return result.deletedCount > 0;
        });
    }
    toIBook(doc) {
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
};
exports.BookRepository = BookRepository;
exports.BookRepository = BookRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BookRepository);
