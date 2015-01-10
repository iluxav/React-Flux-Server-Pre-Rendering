var globals = require('./src/js/global');
globals.isServer = true;
var http = require('http'),
    browserify = require('browserify'),
    literalify = require('literalify'),
    fileSystem = require('fs'),
    express = require('express'),
    React = require('react'),
    request = require("request"),
    remote = require('./src/js/remote')()

// This is our React component, shared by server and browser thanks to browserify
MyApp = React.createFactory(require('./src/js/components/app'))


var app = express();
app.set('views', __dirname + '/dist');
app.set('view engine', 'ejs');
/* serves main page */

app.get("/api/catalog", function(req, res) {
    remote.get(function(data) {
        res.json(data);
    });
});
/* serves all the static files */
app.get("/dist/js/*", function(req, res) {
    console.log('static file request : ' + req.params);
    res.sendfile(__dirname + '/dist/js/' + req.params[0]);
});


app.get("**", function(req, res) {
    request("http://localhost:3000/api/catalog", function(error, response, items) {
        res.render('index', {
            react: React.renderToString(MyApp({
                items: JSON.parse(items)
            }))
        })
    });
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
