Запрос в БД для вставки книг:
``` c
db.books.insertMany([
    { 
        title = "Золотой компас ", 
        description = "Подрастковая фантастика",
        authors = "Филип Пулман",
        favorite = true,
    },    
    { 
        title = "Эрагон", 
        description = "Подрастковая фантастика",
        authors = "Кристофер Паолини",
        favorite = true,
    },
    
]);
```
Запрос для поиска полей документов коллекции books по полю title

```c
    db.books.find({ title: "Moby Dick" })
```

Запрос для редактирования полей: description и authors коллекции books по _id записи.
```c
db.books.updateOne( { id: ObjectId(1) }, { $set: { description: "Обновленное описание книги.", authors: "Обновленные авторы" } } );
```