var mongoose = require('mongoose');
const moment = require("moment");
const mongoosePaginate = require('mongoose-paginate-v2');
const commonHelper = require('../../graphql/commonHelper');
mongoose.set('useFindAndModify', false);
//create schemaOptions
var schemaOptions = {
  toObject: {
    virtuals: true
  }
  , toJSON: {
    virtuals: true
  }
};

var CategoryCurrencySchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  category_type: {type:Number},
  base_price: { type: String, default: 0.00 },
  hour_price: { type: String, default: 0.00 },
  hour_limit: { type: String,default: "0" },
  day_price: { type: String, default: "0.00" },
  day_limit: { type: String, default: "0" },
  price_type: { type: String, default: "job" },
  service_fee: { type: String, default: 0 },
  description: { type: String },
  currency_id:{ type: String },
  created_at: { type: String },
  update_at: { type: String },
  is_delete: { type: Boolean, default: false },
}, schemaOptions);


CategoryCurrencySchema.pre('save', function (next) {
  // get the current date
  var currentDate = moment();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

CategoryCurrencySchema.virtual('created_date').get(function () {
  var created_date = moment(this.created_at);
  return created_date.format('DD/MM/YYYY');
});

CategoryCurrencySchema.plugin(mongoosePaginate);
var CategoryCurrency = mongoose.model('CategoryCurrency', CategoryCurrencySchema);
module.exports = CategoryCurrency;