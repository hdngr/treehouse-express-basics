// third party plugins
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

// mock user data
var posts = require('./mock/posts.json');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/frontend/static'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/frontend/templates');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/blog', function(req, res) {
    res.render('blog', {posts: posts});
});

app.get('/blog/:permalink', function(req, res) {
    if (req.params.permalink) {
        res.render('post');
    } else {
        res.render('blog', {posts: posts});
    }  
});

app.listen('3000', function() {
    console.log("Frontend site running at localhost:3000");
});
