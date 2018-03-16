var express = require('express');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 8080;
var enviro = require('./environments');
var base = enviro.prodEnv.base;

app.use(morgan('dev'));

app.use(express.static(base));
app.use('/bower_components', express.static('bower_components'));
app.use('/images', express.static('app/images'));
app.use('/app', express.static('app'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/' + base + '/index.html');
});

app.listen(port, function() {
    console.log('Server started at port 8080');
});