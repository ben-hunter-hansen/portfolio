var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
    res.sendfile('./app/index.html');
});

app.listen(port);

console.log('Listening on port ' + port);

exports = module.exports = app;                         
