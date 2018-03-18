var express = require('express');
var router = express.Router();
var Prices = require('../models/price');

/* GET home page. */

router.get('/', function (req, res, next) {
	return res.json({statuscode : 404,message : '404 not found'});
});

router.get('/api/btc', function (req, res, next) {
	Prices.findOne({}, {}, {sort:{created_at:-1}}, function(err, result) {
		if (err) throw err;
		if (result) {
			var json_test = {
				"time": {
					"date_update": result.date_update,
					"time_update": result.time_update
				},
				"bpi": {
					"USD": {
						"code": "USD",
						"symbol": "&#36;",
						"rate": result.rate_usd,
						"description": "United States Dollar",
						"rate_float": result.rate_usd_float
					},
					"VND": {
						"code": "VND",
						"symbol": "VND",
						"rate": result.rate_vnd,
						"description": "Vietnam Dong",
						"rate_float": result.rate_vnd_float
					}
				}
			};
			return res.json({statuscode : 200,results : json_test});
		}
	});

});

module.exports = router;
