var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.static('public'));
app.use('/bower_components', express.static('public/bower_components'));

app.listen(8080, function() {
    console.log('Server started at port 8080');
});