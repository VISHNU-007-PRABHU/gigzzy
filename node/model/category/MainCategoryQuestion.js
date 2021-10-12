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

const MainCategorQuestionySchema = mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
    delete: { type: Boolean, default: false },
    question:String,
    question_type:String,
    multiple_option:[],
    single_option:String,
    option_type:String,
}, schemaOptions);

MainCategorQuestionySchema.pre('save', function (next) {
    var currentDate = moment();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

MainCategorQuestionySchema.virtual('created_date').get(function () {
    var created_date = moment(this.created_at);
    return created_date.format('DD/MM/YYYY');
});

MainCategorQuestionySchema.plugin(mongoosePaginate);
mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('MainCategoryImage', MainCategorQuestionySchema);