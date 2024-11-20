const express = require('express');
const bookRouter = require('./bookRouter');
const bookStore = require('./bookStore');
const statusRouter = require('./statusRouter');

const port = 3000;

const app = express();

/**
 * Ex5. Middleware pentru logare
 * Scrie în consolă metoda HTTP și URL-ul fiecărei cereri primite de server.
 * Acest middleware ajută la monitorizarea și depanarea cererilor efectuate către server.
 */
const log = (req, res, next) => {
    console.log("Method:", req.method, "URL:", req.url);
    next(); // Trece la următorul middleware
};

app.use(log);

/**
 * Configurare pentru parsarea datelor din cererile de tip POST.
 * Folosește middleware-ul `express.json()` pentru a permite serverului să proceseze corpul cererilor JSON.
 */
// app.use(express.urlencoded({ extended: true })); // Util dacă se trimit date URL-encoded
app.use(express.json()); // Util pentru cereri cu payload JSON

/**
 * Ex.3 Rutare
 * Configurează rutele pentru API-ul cărților.
 * Toate cererile care încep cu `/api` vor fi gestionate de `bookRouter`.
 */
app.use('/api', bookRouter);

/**
 * Ex.4 Router "status"
 * Adaugă un endpoint GET pentru a verifica dacă serverul funcționează.
 * Acesta returnează statusul 200 și un mesaj de succes.
 */
app.use('/api', statusRouter);

/**
 * Ex6. Middleware pentru gestionarea erorilor (handler pentru stack-ul erorii).
 * Scrie în consolă stack-ul complet al erorii pentru o analiză detaliată.
 * Acest middleware trebuie plasat înaintea handler-ului de eroare principal.
 */
app.use((err, req, res, next) => {
    console.error(err.stack); // Afișează stack-ul erorii
    next(); // Trece la următorul handler de eroare
});

/**
 * Middleware general pentru gestionarea erorilor.
 * Returnează un răspuns generic cu status 500 și un mesaj de eroare.
 * Folosit pentru erorile care nu au fost tratate în mod specific.
 */
app.use((err, req, res, next) => {
    res.status(500).json({ Error: `Something broke! ${err}` });
});

/**
 * Pornirea serverului pe portul specificat.
 * Serverul ascultă pe portul 3000 și afișează un mesaj în consolă pentru confirmare.
 */
app.listen(port, () => {
    console.log('Running on port', port);
});
