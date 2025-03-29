const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const id = posts.length + 1;
    posts.push({ id, title, content });
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('post', { post });
});

app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit', { post });
});

app.post('/update/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
