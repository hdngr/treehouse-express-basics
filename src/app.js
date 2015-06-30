'use strict';

var express = require('express');

var app = express();

app.get('/', function(request, response){
	response.send("I Love Treehouse!");
});

app.listen(3000);