var mongoose = require('mongoose');
const moment = require("moment");
const commonHelper = require('../../graphql/commonHelper');
const { status } = require('../../model_data');
mongoose.set('useFindAndModify', false);
var Schema = mongoose.Schema;

//create user schema 
var schemaOptions = {
    toObject: {
        virtuals: true
    }
    , toJSON: {
        virtuals: true
    },
    timestamps: true
};


var currencySchema = new mongoose.Schema({
    name: { type: String },
    code: { type: String },
    symbol: { type: String },
    status: { type: String },
    rate: { type: String },
    location: { type: String },
    country_code: { type: String },
    location_code: { type: String },
    default_currency: { type: String },
    is_delete: { type: Boolean, default: false },
}, schemaOptions);

currencySchema.pre('save', function (next) {
    // get the current date
    var currentDate = moment();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

currencySchema.virtual('created_date').get(function () {
    var created_date = moment(this.created_at);
    return created_date.format('DD/MM/YYYY');
});

var currency = mongoose.model('currency', currencySchema);
module.exports = currency;

