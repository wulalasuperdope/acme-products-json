const express = require('express');
const path = require('path')
const server = express();
const DB = require('./db');
const db = DB(path.join(__dirname, 'products.json'))
server.use(express.json)

server.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

server.get('/api/products', (req, res, next) => {
    db.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(next)

})

server.delete('/api/products/:id', (req, res, next) => {
    console.log(req.params)

    db.destroy(req.params.id)
        .then(data => {
            res.send(data)
        })
        .catch(next)

})
server.post('/api/products', (req, res, next) => {
    const product = req.body.pro
    db.create(product)
        .then(data => {
            res.send(data)
        })
        .catch(next);
})

server.listen(3000, () => console.log('listening on port 3000'))