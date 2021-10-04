var mongoose = require('mongoose');
const moment = require("moment");
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
function url_path(data){
  return commonHelper.url_path('contract',data)
}
var bidingImageSchema = new Schema({
  contract_id: { type: mongoose.Schema.Types.ObjectId, ref: 'contract' },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
  small_image: { type: String, default: '',get:url_path  },
  large_image: { type: String, default: '',get:url_path  },
  image_tag: { type: String, default: '' },
  doc_type: { type: String, default: '' },
  doc_category: { type: String, default: '' },
  doc_formate: { type: String, default: '' },
  delete: { type: Boolean, default: false },
}, schemaOptions);

bidingImageSchema.virtual('uid').get(function () {
  return this._id;
});

bidingImageSchema.pre('save', function (next, doc) {
  // get the current date
  var currentDate = moment.utc();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});


bidingImageSchema.virtual('user_image_url').get(function () {
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

bidingImageSchema.virtual('start_job_image_url').get(function () {
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

bidingImageSchema.virtual('end_job_image_url').get(function () {
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

bidingImageSchema.virtual('created_date').get(function () {
  var created_date = moment(this.created_at);
  return created_date.format('DD/MM/YYYY');
});

bidingImageSchema.virtual('bookingDate').get(function () {
  var created_date = moment(this.booking_date);
  if (this.booking_type == 1) {
    return created_date.format('DD/MM/YYYY hh:mm a');
  } else if (this.booking_type == 2) {
    return `${created_date.format('DD/MM/YYYY')} ${this.booking_time}`;
  }
});

bidingImageSchema.virtual('job_start_time').get(function () {
  if (this.jobStart_time) {
    return this.jobStart_time;
  } else {
    return ''
  }
});

bidingImageSchema.virtual('lat').get(function () {
  if (this.location.coordinates) {
    return this.location.coordinates[1];
  }
});
bidingImageSchema.virtual('lng').get(function () {
  if (this.location.coordinates) {
    return this.location.coordinates[0];
  }
});

bidingImageSchema.virtual('job_end_time').get(function () {
  if (this.jobEnd_time) {
    return this.jobEnd_time;
  } else {
    return ''
  }
});

bidingImageSchema.virtual('actual_time').get(function () {
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

var bidingImage = mongoose.model('bidingImage', bidingImageSchema);
module.exports = bidingImage;
