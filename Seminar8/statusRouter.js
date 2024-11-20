const express = require('express');

const statusRouter = express.Router();

/**
 * Ex.4 Endpoint pentru verificarea statusului serverului.
 * Această rută întoarce un răspuns JSON cu un mesaj de confirmare și statusul 200,
 * indicând că serverul funcționează corect.
 */
statusRouter.get('/status', (req, res) => {
    res.status(200).json({ message: 'Server is alive and well' });
});

/**
 * Rută separată pentru testarea middleware-ului de gestionare a erorilor.
 * Declanșează intenționat o eroare pentru a verifica comportamentul handler-ului de erori.
 */
statusRouter.get('/test-error', (req, res, next) => {
    throw new Error('This is a test error!');
});

module.exports = statusRouter;
