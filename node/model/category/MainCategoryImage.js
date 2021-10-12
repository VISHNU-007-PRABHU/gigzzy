// grab the things we need
const mongoose = require('mongoose');
const moment = require("moment");
mongoose.set('useFindAndModify', false);
var mongoosePaginate = require('mongoose-paginate-v2');
const commonHelper = require('../../graphql/commonHelper')
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
    return commonHelper.url_path('category',data)
 }

const MainCategoryImageSchema = mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
    small_image: { type: String, default: '',get:url_path  },
    large_image: { type: String, default: '',get:url_path  },
    image_tag: { type: String, default: '' },
    doc_type: { type: String, default: '' },
    doc_category: { type: String, default: '' },
    doc_formate: { type: String, default: '' },
    delete: { type: Boolean, default: false },
}, schemaOptions);

MainCategoryImageSchema.pre('save', function (next) {
    var currentDate = moment();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

MainCategoryImageSchema.virtual('created_date').get(function () {
    var created_date = moment(this.created_at);
    return created_date.format('DD/MM/YYYY');
});

MainCategoryImageSchema.plugin(mongoosePaginate);
mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('MainCategoryImage', MainCategoryImageSchema);