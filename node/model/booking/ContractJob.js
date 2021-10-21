var mongoose = require('mongoose');
const moment = require("moment");
const commonHelper = require('../../graphql/commonHelper');
const shortid = require('shortid');
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

var contractSchema = new Schema({
    name: { type: String },
    description: { type: String },
    budget: { type: String, default: "0" },
    timeline: { type: String, default: "0" },
    timeline_type: { type: String ,default:"1"},
    terms_condition: { type: String },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', unique: false },
    provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', unique: false },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category', unique: false },
    address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'address' },
    biding_id: String,
    category_type: { type: Number },  // 1-parent category , 2-sub category
    contract_ref: { type: String, 'default': shortid.generate },
    location: {
        type: { type: String },
        coordinates: []
    },
    booking_status: { type: Number },  // 12.booking,11.user_cancel,8.provider_accept,no_provider],10.user_accept,4.start,13.end,14.completed,15.not available
    booked: { type: String },
    location_code: { type: String, },
    currency_code: { type: String, },
    current_page: { type: String, },
    contract_status: { type: Number},  // c1.pending,c2.job posted,c3.admin-approved,c4
    availability: [],
    hours: { type: String },
    contract_date: Date,
    contract_cron_date: String,
    contract_time: String,
    contract_hour: String,
    start_date: String,
    end_date: String,
    data: [{}],
    base_price: { type: String, default: 0.00 },
    hour_price: { type: String, default: "0.00" },
    extra_price: { type: String, default: 0.00 },
    extra_price_reason: { type: [String] },
    total: { type: String, default: 0.00 },
    hour_limit: { type: String, default: "0" },
    price_type: { type: String, default: "job" },
    day_price: { type: String, default: "0.00" },
    day_limit: { type: String, default: "0" },
    service_fee: { type: String, default: 0.00 },
    admin_fee: { type: String, default: 0.00 },    //admin fee
    provider_fee: { type: String, default: 0.00 }, //provider fee
    final_payment: { type: String, default: 0.00 },
    extra_hour_price: { type: String, default: 0.00 },
    job_status: { type: Number },    //0.start,10.pending,4.ongoing,13.end,14.completed
    jobStart_time: { type: Date },
    jobEnd_time: { type: Date },
    total_time: { type: String },
    available_provider: [{ type: mongoose.Schema.Types.ObjectId, ref: 'detail' }],
    user_image: [],
    start_job_image: [],
    end_job_image: [],
    charge_id: { type: String },
    provider_rating: { type: Number, default: 0 },
    provider_comments: { type: String },
    user_rating: { type: Number, default: 0 },
    user_comments: { type: String, default: "" },
    user_comments_status: { type: Number, default: 0 },
    user_rating_status: { type: Number, default: 0 },
    provider_rating_status: { type: Number, default: 0 },
    payment_status: { type: Number, default: 0 }, // 0.base_price_pending,1.base_price_paid,2.refund success,3.refund failed,4.transaction_pending,5.completed
    contract_type: { type: Number, default: 1 },//1.now,2,later
    created_at: Date,
    contract_alert: { type: Number, default: 0 },
    end_date: Date,
    accept_date: Date,
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
    is_delete: { type: Boolean, default: false },
    current_currency: {},
    currency_id: String,
    default_currency_rate: String,
    currenct_local_rate: String,
    currenct_milestone_status:Number,
    currenct_milestone_id:String,
    milestones_status:{type:Number,default:0}
}, schemaOptions);

contractSchema.virtual('uid').get(function () {
    return this._id;
});

contractSchema.pre('save', function (next, doc) {
    // get the current date
    var currentDate = moment.utc();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});


contractSchema.virtual('user_image_url').get(function () {
    if (this.user_image.length > 0) {
        var img = [];
        for (let i = 0; i < this.user_image.length; i++) {
            var data = commonHelper.getBaseurl() + '/images/contract/' + this.user_image[i]
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

contractSchema.virtual('start_job_image_url').get(function () {
    if (this.start_job_image.length > 0) {
        var img = [];
        for (let i = 0; i < this.start_job_image.length; i++) {
            var data = commonHelper.getBaseurl() + '/images/contract/' + this.start_job_image[i]
            img.push(data);
        }
        return img
    } else {
        var img = [];
        return img;
    }
});

contractSchema.virtual('end_job_image_url').get(function () {
    if (this.end_job_image.length > 0) {
        var img = [];
        for (let i = 0; i < this.end_job_image.length; i++) {
            var data = commonHelper.getBaseurl() + '/images/contract/' + this.end_job_image[i]
            img.push(data);
        }
        return img
    } else {
        var img = [];
        return img;
    }
});

contractSchema.virtual('created_date').get(function () {
    var created_date = moment(this.created_at);
    return created_date.format('DD/MM/YYYY');
});

contractSchema.virtual('contractDate').get(function () {
    var created_date = moment(this.contract_date);
    if (this.contract_type == 1) {
        return created_date.format('DD/MM/YYYY hh:mm a');
    } else if (this.contract_type == 2) {
        return `${created_date.format('DD/MM/YYYY')} ${this.contract_time}`;
    }
});

contractSchema.virtual('job_start_time').get(function () {
    if (this.jobStart_time) {
        return this.jobStart_time;
    } else {
        return ''
    }
});

contractSchema.virtual('lat').get(function () {
    if (this.location.coordinates) {
        return this.location.coordinates[1];
    }
});
contractSchema.virtual('lng').get(function () {
    if (this.location.coordinates) {
        return this.location.coordinates[0];
    }
});

contractSchema.virtual('job_end_time').get(function () {
    if (this.jobEnd_time) {
        return this.jobEnd_time;
    } else {
        return ''
    }
});

contractSchema.virtual('actual_time').get(function () {
    if (this.contract_status == 13 || this.contract_status == 14) {
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


var contract = mongoose.model('contract', contractSchema);

module.exports = contract;
