var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var ejs = require('ejs');
var app = new express();

var port = 3060;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'views')));

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.get('/home',function(req,res){
    return res.sendFile(__dirname + '/views/home.html');
});


app.get('/chat', function (req, res) {
    res.render('client/index')
});

app.listen(port, function(err) {
    if (err) {
        console.error(err)
    } else {
        console.info(" Listening on port %s. Open up http://localhost:%s/home",port,port)
    }
});
