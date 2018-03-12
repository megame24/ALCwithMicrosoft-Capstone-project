var express = require('express');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 8080;

app.use(morgan('dev'));

app.use(express.static('public'));
app.use('/bower_components', express.static('public/bower_components'));
app.use('/resources', express.static('public/app/resources'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function() {
    console.log('Server started at port 8080');
});