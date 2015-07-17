var express = require('express');
var compression = require('compression');

var app = express();

var port = process.env.PORT || 3000;
app.use(compression());
app.use(express.static(__dirname + '/app'));



app.listen(port);

console.log('Listening on port ' + port);

exports = module.exports = app;                         
