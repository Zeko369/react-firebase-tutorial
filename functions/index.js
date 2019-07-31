const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

exports.foobar = functions.https.onRequest((request, response) => {
  response.json({ foo: request.query.foo || 'bar' });
});

// or with express

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('/:id', (req, res) => res.send(posts.getById(req.params.id)));
app.post('/', (req, res) => res.send(posts.create(req.body)));
app.put('/:id', (req, res) => res.send(posts.update(req.params.id, req.body)));
app.delete('/:id', (req, res) => res.send(posts.delete(req.params.id)));
app.get('/', (req, res) => res.send(posts.list()));

// Expose Express API as a single Cloud Function:
exports.posts = functions.https.onRequest(app);
