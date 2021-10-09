var mongoose = require('mongoose');
const moment = require("moment");
const shortid = require('shortid');
const commonHelper = require('../../graphql/commonHelper');
mongoose.set('useFindAndModify', false);
var Schema = mongoose.Schema;
var schemaOptions = {
  toObject: {
    virtuals: true
  }
  , toJSON: {
    virtuals: true
  },
  timestamps: true
};
//create user schema 

var bidingSchema = new Schema({

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', },
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user',  },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category', },
  contract_id: { type: mongoose.Schema.Types.ObjectId, ref: 'contract', },
  category_type: { type: Number },  // 1-parent category , 2-sub category
  biding_ref: { type: String, 'default': shortid.generate },
  booked: { type: String },
  budget: { type: Number, default: 0.00 },
  timeline: String,
  timeline_type: String,
  cover_letter: String,
  description: String,
  experience: String,
  no_of_people: String,
  add_to_shortlist:Boolean,
  
  location: {
    type: { type: String },
    coordinates: []
  },

  booking_status: { type: String,default:"pending" },  // 12.booking,11.user_cancel,8.provider_accept,no_provider],10.user_accept,4.start,13.end,14.completed,15.not available
  start_date: String,
  end_date: String,
  description: { type: String },
  created_at: Date,
  end_date: Date,
  accept_date: Date,
  is_reject: { type: Boolean, default: false },
  is_delete: { type: Boolean, default: false },
  phone_number: { type: String, default: "" },
  user_msg_is_read: { type: Number, default: 0 },
  provider_msg_is_read: { type: Number, default: 0 },
  user_msg_count: { type: Number, default: 0 },
  provider_msg_count: { type: String, default: 0 },
  MerchantRequestID: { type: String, default: "" },
  CheckoutRequestID: { type: String, default: "" },
  resultcode: { type: String, default: 0 },
  TransactionDate: Date,
  MpesaReceiptNumber: { type: String, default: 0 },
  payment_message: { type: String, default: "" },
  mpeas_payment_callback: { type: Boolean, default: false },
  manual_payment_status: { type: Boolean, default: false },
  payment_type: { type: String, default: "" },
  ctob_shotcode: { type: String, default: "" },
  ctob_billRef: { type: String, default: "" },
  currency_detail:{},
  symbol:String,
  current_currency:{},
  currency_id:String,
  default_currency_rate:String,
  currenct_local_rate:String,
}, schemaOptions);

bidingSchema.virtual('uid').get(function () {
  return this._id;
});

bidingSchema.pre('save', function (next, doc) {
  // get the current date
  var currentDate = moment.utc();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});



bidingSchema.virtual('created_date').get(function () {
  var created_date = moment(this.created_at);
  return created_date.format('DD/MM/YYYY');
});

bidingSchema.virtual('bookingDate').get(function () {
  var created_date = moment(this.booking_date);
  if (this.booking_type == 1) {
    return created_date.format('DD/MM/YYYY hh:mm a');
  } else if (this.booking_type == 2) {
    return `${created_date.format('DD/MM/YYYY')} ${this.booking_time}`;
  }
});

bidingSchema.virtual('job_start_time').get(function () {
  if (this.jobStart_time) {
    return this.jobStart_time;
  } else {
    return ''
  }
});

bidingSchema.virtual('lat').get(function () {
  if (this.location.coordinates) {
    return this.location.coordinates[1];
  }
});
bidingSchema.virtual('lng').get(function () {
  if (this.location.coordinates) {
    return this.location.coordinates[0];
  }
});

bidingSchema.virtual('job_end_time').get(function () {
  if (this.jobEnd_time) {
    return this.jobEnd_time;
  } else {
    return ''
  }
});

bidingSchema.virtual('actual_time').get(function () {
  if (this.booking_status == 13 || this.booking_status == 14) {
    var start = moment(this.jobStart_time);
    var end = moment(this.jobEnd_time);
    var duration = moment.duration(end.diff(start));
    var hours = parseInt(duration.asHours());
    var minutes = parseInt(duration.asMinutes()) - hours * 60;
    return `${hours} hour : ${minutes} minutes`;
  } else {
    return 'on going';
  }
});

var biding = mongoose.model('biding', bidingSchema);
module.exports = biding;
