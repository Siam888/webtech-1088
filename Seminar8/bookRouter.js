const express = require('express');
const Book = require('./Book');
const books = require('./bookStore');

const bookRouter = express.Router();

/**
 * Middleware pentru a valida parametrul `id` din cerere.
 */
const checkId = (req, res, next) => {
    if (req.params.id && isNaN(req.params.id)) {
        res.status(400).json({ error: "ID invalid" });
    } else {
        next();
    }
};

/**
 * Rută pentru gestionarea cererilor de tip GET și POST pentru cărți.
 */
bookRouter.route('/books')
    .get((req, res) => {
        // Filtrează cărțile în funcție de gen, dacă este specificat.
        const { genre } = req.query;
        const filteredBooks = genre
            ? books.filter(book => book.genre === genre)
            : books;

        res.json(filteredBooks);
    })
    .post((req, res) => {
        // Validează obiectul cărții înainte de a continua
        const validationResult = validateBook(req.body);
        if (!validationResult.valid) {
            return res.status(400).json({ error: validationResult.error });
        }
        const { id, name, genre, author } = req.body;
        const newBook = new Book(id, name, genre, author);

        books.push(newBook);
        console.log(books);

        res.json(newBook);
    });

/**
 * Rută pentru actualizarea unei cărți după ID.
 */
bookRouter.put('/updateBooks/:id', checkId, (req, res) => {
    // Găsește cartea după ID și actualizează câmpurile acesteia.
    const { id } = req.params;
    const { name, genre, author } = req.body;

    const bookToUpdate = books.find(book => book.id == id);
    if (bookToUpdate) {
        bookToUpdate.name = name;
        bookToUpdate.genre = genre;
        bookToUpdate.author = author;

        res.json(bookToUpdate);
    } else {
        res.sendStatus(404);
    }
});

/**
 * Rută pentru ștergerea unei cărți după ID.
 */
bookRouter.delete('/books/:id', checkId, (req, res) => {
    // Găsește indexul cărții de șters și o elimină din listă.
    const { id } = req.params;

    const bookIndex = books.findIndex(book => book.id == id);
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.json(deletedBook);
    } else {
        res.sendStatus(404);
    }
});

/**
 * Rută pentru a returna lista de cărți sortată alfabetic după nume.
 */
bookRouter.get('/sortedBooks', (req, res) => {
    // Sortează cărțile alfabetic după numele acestora.
    const sortedBooks = books.sort((a, b) => a.name.localeCompare(b.name));
    res.json(sortedBooks);
});

/**
 * Validează un obiect carte pentru cererile de tip POST.
 * @param {Object} book - Obiectul cărții care trebuie validat.
 * @returns {Object} - Rezultatul validării cu câmpurile `valid` și `error`.
 */
function validateBook(book) {
    if (!book || typeof book !== "object") {
        return { valid: false, error: "Date invalide: cartea trebuie să fie un obiect." };
    }

    const requiredFields = {
        id: "number",
        name: "string",
        genre: "string",
        author: "string",
    };

    for (const [field, type] of Object.entries(requiredFields)) {
        if (!book.hasOwnProperty(field)) {
            return { valid: false, error: `Câmp obligatoriu lipsă: '${field}'.` };
        }

        const value = book[field];

        if (field === "id") {
            const id = parseInt(value);
            if (Number.isNaN(id)) {
                return { valid: false, error: "ID invalid: trebuie să fie un număr valid." };
            }

            if (books.some(existingBook => existingBook.id === id)) {
                return { valid: false, error: `ID duplicat: o carte cu ID-ul ${id} există deja.` };
            }
        } else if (typeof value !== type || !value) {
            return { valid: false, error: `Câmp invalid '${field}': trebuie să fie un ${type} valid și să nu fie gol.` };
        }
    }

    return { valid: true };
}

module.exports = bookRouter;
