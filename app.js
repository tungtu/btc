var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

/**
 * Store Mongodb
 * */
var Prices = require('./models/price');

var mongoose = require('mongoose');

var uri = "mongodb://root:YavWodNetshyip7@ds249787.mlab.com:49787/tungtu-btc";
// var uri = "mongodb://172.17.0.3:27017/prices"; //test local

mongoose.connect(uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log('Mongodb connected ');
});

var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
	maxConnections: 10,
	// This will be called for each crawled page
	callback: function (error, res, done) {
		if (error) {
			console.log(error);
		} else {
			var $ = res.$;

			var time_update = $(".h-head small").text().split(" ");
			var date = time_update[time_update.length - 1];
			var time = time_update[time_update.length - 2];

			var rate_usd = $("#quote_price").text();
				rate_usd = rate_usd.substr(1);
			var rate_usd_float = rate_usd.replace(/,/g,'');


			var rate_vnd = $("#coin-table .text-primary").text().split("~");
				rate_vnd = rate_vnd[1].split(" ");
				rate_vnd = rate_vnd[0];
			var rate_vnd_float = rate_vnd.replace(/,/g,'');

			new Prices({
				'date_update': date,
				'time_update': time,
				'rate_usd': rate_usd,
				'rate_float_usd': rate_usd_float,
				'rate_vnd': rate_vnd,
				'rate_float_vnd': rate_vnd_float
			}).save(function(err, result) {
				if (err) throw err;
				if(result) {
					console.log("Update success");
				}
			});
		}
		done();
	}
});

c.queue('https://webgia.com/tien-ao/bitcoin/');

var cron = require('node-cron');

cron.schedule('*/2 * * * *', function(){
	c.queue('https://webgia.com/tien-ao/bitcoin/');
});

module.exports = app;
