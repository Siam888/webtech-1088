const express = require('express')



const app = express()
const router = express.Router()

app.use(express.json())
app.use('/api', router);

const array = [
    {
        id: 1,
        name: 'Andrew',
        age: 25
    },
    {
        id: 2,
        name: 'Andrew2',
        age: 26
    },
    {
        id: 3,
        name: 'Andrew3',
        age: 27
    },
    {
        id: 4,
        name: 'Andrew5',
        age: 28
    },
]

router.get('/getList', (req, res) => {
    res.json(array);
})

router.post('/addToList', (req, res) => {
    const el = req.body;

    array.push(el);

    res.json(el);
})

router.get('/getById', (req, res) => {
    const id = parseInt(req.query["id"])

    const element = array.find(x => x.id === id)

    res.json(element)
})

app.listen(8080)

console.log('App is listening on 8080');




