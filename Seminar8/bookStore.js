const Book = require('./Book');


let books = [
    new Book(1, "Dune", "sf", "Frank Herbert"),
    new Book(2, "Robinson Crusoe", "adventures", "Daniel Defoe"),
    new Book(3, "Foundation", "sf", "Asimov")
]

module.exports = books;