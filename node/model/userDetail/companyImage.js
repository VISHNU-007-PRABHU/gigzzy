// grab the things we need
const mongoose = require('mongoose');
const moment = require("moment");
mongoose.set('useFindAndModify', false);
var mongoosePaginate = require('mongoose-paginate-v2');
//create schemaOptions
var schemaOptions = {
    toObject: {
        virtuals: true
    }
    , toJSON: {
        virtuals: true
    },
    timestamps: true
};

const CompanyImageSchema = mongoose.Schema({
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
    small_image: { type: String, default: '' },
    large_image: { type: String, default: '' },
    image_tag: { type: String, default: '' },
    doc_type: { type: String, default: '' },
    doc_category: { type: String, default: '' },
    doc_formate: { type: String, default: '' },
    delete:{ type: Boolean, default: false },
}, schemaOptions);

CompanyImageSchema.pre('save', function (next) {
    // get the current date
    var currentDate = moment();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

CompanyImageSchema.virtual('created_date').get(function () {
    var created_date = moment(this.created_at);
    return created_date.format('DD/MM/YYYY');
});

CompanyImageSchema.plugin(mongoosePaginate);
mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('CompanyImage', CompanyImageSchema);