var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require("moment");
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

var MainCategorySchema = new mongoose.Schema({
  category_name: { type: String, },
  description: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
  child:[],
  child_name:[],
  image: { type: String },
  gst: { type: String, default: "0.00" },
  service_fee: { type: String, default: "0" },
  certificates: [],
  created_at: { type: String },
  update_at: { type: String },
  is_parent: { type: Boolean, default: true },    // 1 == category ,2 == sub_category
  is_future: { type: Boolean, default: false },       // 1 == future , 2 == not future
  is_block: { type: Boolean, default: false },       // 1 == show , 2 == not show
  category_type: { type: Number, default: 1 },     // 1 is category ,2 is subcategory
  delete: { type: Number, default: 0 },
}, schemaOptions);


MainCategorySchema.pre('save', function (next) {
  // get the current date
  var currentDate = moment();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

MainCategorySchema.virtual('created_date').get(function () {
  var created_date = moment(this.created_at);
  return created_date.format('DD/MM/YYYY');
});

MainCategorySchema.plugin(mongoosePaginate);
var MainCategory = mongoose.model('MainCategory', MainCategorySchema);

module.exports = MainCategory;