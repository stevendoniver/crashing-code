// Create web server
// Run: node comments.js
// Access: http://localhost:3000/comments
// GET /comments
// POST /comments
// PUT /comments/:id
// DELETE /comments/:id
// GET /comments/:id
// GET /comments/:id/edit

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var comments = [
  {
    id: 1,
    comment: 'Hello World'
  },
  {
    id: 2,
    comment: 'Hello Node.js'
  },
  {
    id: 3,
    comment: 'Hello Express'
  }
];

app.get('/comments', function(req, res) {
  res.json(comments);
});

app.post('/comments', function(req, res) {
  var comment = req.body;
  comments.push(comment);
  res.json(comment);
});

app.put('/comments/:id', function(req, res) {
  var id = req.params.id;
  var comment = req.body;
  comments.forEach(function(item, i) {
    if (item.id === id) {
      comments[i] = comment;
    }
  });
  res.json(comment);
});

app.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  comments = comments.filter(function(item) {
    return item.id !== id;
  });
  res.json({id: id});
});

app.get('/comments/:id', function(req, res) {
  var id = req.params.id;
  var comment = comments.filter(function(item) {
    return item.id === id;
  });
  if (comment.length === 1) {
    res.json(comment[0]);
  } else {
    res.status(404).json({error: 'Not Found'});
  }
});

app.get('/comments/:id/edit', function(req, res) {
  res.send('GET /comments/:id/edit');
});

app.listen(3000, function() {
  console.log('Server is running');
});