var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.static('public'));
app.use('/bower_components', express.static('public/bower_components'));
app.use('/img', express.static('public/app/img'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080, function() {
    console.log('Server started at port 8080');
});