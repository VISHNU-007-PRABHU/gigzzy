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

var milestoneSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', unique: false },
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', unique: false },
  biding_id:String,
  contract_id:String,
  milestone_ref: { type: String, 'default': shortid.generate },
  start_date: String,
  end_date: String,
  title: String,
  pay_option:Boolean,
  description:  { type: String, default: "" },
  pro_description: { type: String, default: ""} ,
  budget: { type: Number, default: 0.00 },
  timeline: String,
  timeline_type: { type: String ,default:"1"},
  order:{ type: Number,default:2}, 
  delete: { type: Boolean, default: false },
  booking_status: { type: Number,default:9 },
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
  currency_detail: {},
  symbol: String,
  current_currency: {},
  currency_id: String,
  default_currency_rate: String,
  currenct_local_rate: String,
  start_date: String,
  end_date: String,
  description: { type: String },
  created_at: Date,
  end_date: Date,
  accept_date: Date,
  base_price: { type: String, default: 0.00 },
  hour_price: { type: String, default: "0.00" },
  extra_price: { type: String, default: 0.00 },
  extra_price_reason: { type: [String] },
  total: { type: String, default: 0.00 },
  service_fee: { type: String, default: 0.00 },
  admin_fee: { type: String, default: 0.00 },    //admin fee
  provider_fee: { type: String, default: 0.00 }, //provider fee
  final_payment: { type: String, default: 0.00 },
  extra_hour_price: { type: String, default: 0.00 },
  extra_fare: {type: String, default: 0.00  },
  extra_fare_reason: {type: String},
}, schemaOptions);

milestoneSchema.virtual('uid').get(function () {
  return this._id;
});

milestoneSchema.pre('save', function (next, doc) {
  // get the current date
  var currentDate = moment.utc();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});


milestoneSchema.virtual('user_image_url').get(function () {
  if (this.user_image.length > 0) {
    var img = [];
    for (let i = 0; i < this.user_image.length; i++) {
      var data = commonHelper.getBaseurl() + '/images/booking/' + this.user_image[i]
      img.push(data);
    }
    return img
  } else {
    var img = [];
    var data = commonHelper.getBaseurl() + '/images/public/no_img.png';
    img.push(data);
    return img;
  }
});

milestoneSchema.virtual('start_job_image_url').get(function () {
  if (this.start_job_image.length > 0) {
    var img = [];
    for (let i = 0; i < this.start_job_image.length; i++) {
      var data = commonHelper.getBaseurl() + '/images/booking/' + this.start_job_image[i]
      img.push(data);
    }
    return img
  } else {
    var img = [];
    return img;
  }
});

milestoneSchema.virtual('end_job_image_url').get(function () {
  if (this.end_job_image.length > 0) {
    var img = [];
    for (let i = 0; i < this.end_job_image.length; i++) {
      var data = commonHelper.getBaseurl() + '/images/booking/' + this.end_job_image[i]
      img.push(data);
    }
    return img
  } else {
    var img = [];
    return img;
  }
});

milestoneSchema.virtual('created_date').get(function () {
  var created_date = moment(this.created_at);
  return created_date.format('DD/MM/YYYY');
});

milestoneSchema.virtual('bookingDate').get(function () {
  var created_date = moment(this.booking_date);
  if (this.booking_type == 1) {
    return created_date.format('DD/MM/YYYY hh:mm a');
  } else if (this.booking_type == 2) {
    return `${created_date.format('DD/MM/YYYY')} ${this.booking_time}`;
  }
});

milestoneSchema.virtual('job_start_time').get(function () {
  if (this.jobStart_time) {
    return this.jobStart_time;
  } else {
    return ''
  }
});

milestoneSchema.virtual('lat').get(function () {
  if (this.location.coordinates) {
    return this.location.coordinates[1];
  }
});
milestoneSchema.virtual('lng').get(function () {
  if (this.location.coordinates) {
    return this.location.coordinates[0];
  }
});

milestoneSchema.virtual('job_end_time').get(function () {
  if (this.jobEnd_time) {
    return this.jobEnd_time;
  } else {
    return ''
  }
});

milestoneSchema.virtual('actual_time').get(function () {
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

var milestone = mongoose.model('milestone', milestoneSchema);
module.exports = milestone;
