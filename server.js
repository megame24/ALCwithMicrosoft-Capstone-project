var express = require('express');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 8080;

app.use(morgan('dev'));

app.use(express.static('dist'));
app.use('/bower_components', express.static('bower_components'));
app.use('/images', express.static('app/images'));
app.use('/app', express.static('app'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, function() {
    console.log('Server started at port 8080');
});