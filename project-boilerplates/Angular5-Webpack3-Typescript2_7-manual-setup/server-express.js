var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'dist')));


// 404 catch
app.all('/', (req, res) => {
    console.log("DIR :", __dirname);
    console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
    res.status(200).sendFile(path.join(__dirname + '/src/index.html'));
});

// Handle 404 Error
/*
app.use(function(req, res) {
	res.status(400);
	res.render('404', {body: '404: File Not Found', data: "Plese Go Back to Home page."});
});
*/

// Handle 500 Error
app.use(function (error, req, res, next) {
    res.status(500);
    res.render('500', { body: '500: Internal Server Error', data: error });
});

// Listen for requests
/* var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
}); */

app.listen(3000);
