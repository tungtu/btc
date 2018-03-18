var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/btc', function (req, res, next) {

	var json_test = {
		"time": {
			"updated": "Mar 18, 2018 02:13:00 UTC",
			"updatedISO": "2018-03-18T02:13:00+00:00",
			"updateduk": "Mar 18, 2018 at 02:13 GMT"
		},
		"bpi": {
			"USD": {
				"code": "USD",
				"symbol": "&#36;",
				"rate": "7,649.8175",
				"description": "United States Dollar",
				"rate_float": 7649.8175
			},
			"VND": {
				"code": "GBP",
				"symbol": "&pound;",
				"rate": "5,484.9191",
				"description": "British Pound Sterling",
				"rate_float": 5484.9191
			}
		}
	};

	res.json(json_test)
});

module.exports = router;
