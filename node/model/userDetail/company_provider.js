var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require("moment");
const commonHelper = require('../../graphql/commonHelper');
const env = process.env

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
var Schema = mongoose.Schema;
//create user schema 
var companyProviderSchema = new Schema({
  company_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'company' },
  register_status: { type: String, },
  register_link_status:{ type: String, },
  provider_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'detail' },
  role: { type: Number, }, 
  user_type : { type: String,default:"" },          
  name: { type: String, },
  password: { type: String, },
  email: { type: String, },
  country_code: { type: String, },
  phone_no: { type: String, },
  address: { type: String, },
  location: {
    type: { type: String },
    coordinates: []
  },
  image: String,
  provider_subCategoryID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sub_category' }],        //companyProviders
  personal_document: [String],
  professional_document: [String],
  booked: [],
  profile: { type: String },
  rating: { type: String, default: "2.5" },
  comments: { type: String },
  Upload_percentage: { type: String, default: 0 },
  otp: { type: String },                                                          // otp (4 digit no) 
  email_otp: { type: String },                                                    // email otp (6 digit no)
  online: { type: Number, default: 0 },                                           // provider online status (1,0)
  proof_status: { type: Number, default: 0 },                                     // provider proof status   (1,0)
  otp_verification: { type: Number, default: 0 },                                 // otp status               (1,0)
  email_otp_verification: { type: Number, default: 0 },                           // email otp status          (1,0)
  last_otp_verification: { type: Date },                                          // last otp verified time    (utc time)
  last_email_otp_verification: { type: Date },                                    // last email otp verified time  (utc time)
  payout_companyProviders: [{}],
  bank_name: { type: String },
  ifsc_code: { type: String },
  account_no: { type: Number },
  device_id:{type:String,default:""},
  delete: { type: Boolean,default: false },
  email_reset_link:{ type: String,default: "" },
  demo:{type:Boolean,default:false},
  demo_end_time:Date,
  created_at: Date,
  kra_pin:{ type: String },
  payout_phone:{ type: String },
  payout_frist_name:{ type: String },
  payout_second_name:{ type: String },
  payout_id:{ type: String },
  payout_option:{ type: String },
  account_name:{ type: String },
  branch_name:{ type: String },
  routing_name:{ type: String },
}, schemaOptions);

companyProviderSchema.virtual('img_url').get(function () {
  if (this.image) {
    return commonHelper.getBaseurl() + '/images/user/profile/' + this.image
  } else {
    return env.APP_URL + '/images/public/no_img.png';

  }
});

companyProviderSchema.virtual('personal_document_url').get(function () {
  if (this.personal_document.length > 0) {
    var img = [];
    for (let i = 0; i < this.personal_document.length; i++) {
      var data = commonHelper.getBaseurl() + '/images/provider/document/' + this.personal_document[i]
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
companyProviderSchema.virtual('professional_document_url').get(function () {
  if (this.professional_document.length > 0) {
    var img = [];
    for (let i = 0; i < this.professional_document.length; i++) {
      var data = commonHelper.getBaseurl() + '/images/provider/document/' + this.professional_document[i]
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

companyProviderSchema.virtual('phone_number').get(function () {
  return this.country_code + this.phone_no;
});

companyProviderSchema.virtual('uid').get(function () {
  return this._id;
});
companyProviderSchema.virtual('lat').get(function () {
  if (this.location.coordinates) {
    return this.location.coordinates[1];
  }
});
companyProviderSchema.virtual('lng').get(function () {
  if (this.location.coordinates) {
    return this.location.coordinates[0];
  }
});
companyProviderSchema.pre('save', function (next) {
  // get the current date
  var currentDate = moment.utc();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

companyProviderSchema.virtual('created_date').get(function () {
  var created_date = moment(this.created_at);
  return created_date.format('DD/MM/YYYY');
});

companyProviderSchema.plugin(mongoosePaginate);
companyProviderSchema.index({ location: "2dsphere" });
companyProviderSchema.plugin(random);


var companyProvider = mongoose.model('companyProvider', companyProviderSchema);

module.exports = companyProvider;