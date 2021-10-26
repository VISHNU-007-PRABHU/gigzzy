// grab the things we need
const mongoose = require('mongoose');
const moment = require("moment");
const commonHelper = require('../../graphql/commonHelper')
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
function url_path(data){
   return commonHelper.url_path('user/profile',data)
}
  
const DetailImageSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'detail' },
    small_image: { type: String, default: '',get:url_path },
    large_image: { type: String, default: '',get:url_path },
    image_tag: { type: String, default: '' },
    model_type: { type: String, default: '' },
    doc_type: { type: String, default: '' },
    doc_category: { type: String, default: '' },
    doc_formate: { type: String, default: '' },
    delete:{ type: Boolean, default: false },
}, schemaOptions);

DetailImageSchema.pre('save', function (next) {
    // get the current date
    var currentDate = moment();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

DetailImageSchema.virtual('created_date').get(function () {
    var created_date = moment(this.created_at);
    return created_date.format('DD/MM/YYYY');
});

DetailImageSchema.plugin(mongoosePaginate);
mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('DetailImage', DetailImageSchema);