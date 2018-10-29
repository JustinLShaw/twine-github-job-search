var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var Job = require('./models/job.js');
var app = express();

app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, 'static')))
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hw5-new')

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieSession({
  name: 'local-session',
  keys: ['Twine'],
  maxAge: 24 * 60 * 60 * 1000
}))


app.get('/', function (req, res, next) {
  res.render('index');
});

app.get('/analytics', function (req, res, next) {
  res.render('analytics');
});

app.use(function (err, req, res, next) {
  return res.send('ERROR :  ' + err.message)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + (process.env.PORT || 3000))
})
