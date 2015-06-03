// third party plugins
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

// mock user data
var users = require('./mock/users.json');
var posts = require('./mock/posts.json');

var app = express();

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

// confusing...  Two folders stored under same routes???
// simpler...
// app.use('/', express.static(__dirname + '/frontend'));
app.use('/', express.static(__dirname + '/static'));
app.use('/mock', express.static(__dirname + '/mock'));

// serves the index.html file for the 'fake' front end site
app.get('/', function(req, res, next) {
    console.log("Hello there!!!");
});

app.get('/admin', checkAccess, function(req, res) {
    var user = req.session.user;
    res.render('main', {user: user, posts: posts});
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    authenticate(req.body.username, req.body.password, function(err, user) {
        if (user) {
            req.session.user = user;
            res.redirect('admin');
        } else {
            req.session.error = err;
            res.redirect('login');
        }
    })
});

// authenticate a user using fake data 
// in the mock/users.json file
function authenticate(name, password, callback) {
    var user = users[name];
    if (!user) return callback(new Error('This user does not exist!'));
    if (password === user.password) return callback(null, user);
}

// checkAccess
function checkAccess(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = "You must be logged in to access this page!";
        res.redirect('/login');
    };
}

app.listen('3000', function() {
    console.log("Frontend static site running at localhost:3000 \n" + 
                "Admin app running at localhost:3000/admin");
});
