const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

app.use('/api', router);

// Datele inițiale (se pot extinde sau modifica)
const array = [
    { id: 1, name: 'Andrew', age: 25 },
    { id: 2, name: 'Andrew2', age: 26 },
    { id: 3, name: 'Andrew3', age: 27 },
    { id: 4, name: 'Andrew5', age: 28 }
];

// Endpoint GET pentru a prelua lista de elemente
router.get('/getList', (req, res) => {
    const queryId = req.query['id'] ? parseInt(req.query['id']) : null;

    if (queryId) {
        const item = array.find(x => x.id === queryId);
        res.json(item || {});
        return;
    }
    res.json(array);
});

// Endpoint POST pentru a adăuga un nou element în listă
router.post('/addToList', (req, res) => {
    const newItem = req.body;
    
    // Adaugă un ID unic (maxim + 1) pentru noul element
    newItem.id = array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
    array.push(newItem);
    res.json(newItem);
});

// Endpoint PUT pentru a edita un element din listă după ID
router.put('/editList/:id', (req, res) => {
    const idParam = parseInt(req.params['id']);
    const itemIndex = array.findIndex(x => x.id === idParam);

    if (itemIndex === -1) {
        res.status(404).send('Not found');
    } else {
        const updatedData = { id: idParam, ...req.body };
        array[itemIndex] = updatedData;
        res.json(updatedData);
    }
});

app.listen(8080, () => {
    console.log('App is listening on port 8080');
});
