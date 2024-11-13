// Create web server

// Require express
const express = require('express');
// Require body-parser
const bodyParser = require('body-parser');
// Require comments.json
const comments = require('./comments.json');
// Require file system
const fs = require('fs');
// Require path
const path = require('path');

// Create express app
const app = express();

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create route for get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Create route for post comments
app.post('/comments', (req, res) => {
    comments.push(req.body);
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
    res.json(comments);
});

// Create route for delete comments
app.delete('/comments/:id', (req, res) => {
    comments.splice(req.params.id, 1);
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
    res.json(comments);
});

// Create route for put comments
app.put('/comments/:id', (req, res) => {
    comments[req.params.id] = req.body;
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
    res.json(comments);
});

// Create port
const port = 3000;

// Listen port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

