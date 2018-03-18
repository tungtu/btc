const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const PricesSchema = new Schema({
		date_update: {
			type: String,
		},
		time_update: {
			type: String
		},
		rate_usd: {
			type: String
		},
		rate_float_usd: {
			type: String
		},
		rate_vnd: {
			type: String
		},
		rate_float_vnd: {
			type: String
		}
	},
	{
		timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
	}
);


module.exports = mongoose.model('Prices', PricesSchema);