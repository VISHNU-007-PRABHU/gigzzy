// grab the things we need
const mongoose = require('mongoose');
const moment = require("moment");
const commonHelper = require('../../graphql/commonHelper');
mongoose.set('useFindAndModify', false);
var mongoosePaginate = require('mongoose-paginate-v2');
//create schemaOptions
var schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    },
    timestamps: true
};

const permissoinSchema = new mongoose.Schema({
    name: String,
    type:String,
    key:String,
    page_type:String,
    permission:Array,
    is_delete:{ type: Boolean,default:false },
}, schemaOptions);


permissoinSchema.pre('save', function (next) {
  // get the current date
  var currentDate = moment();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

permissoinSchema.virtual('created_date').get(function () {
  var created_date = moment(this.created_at);
  return created_date.format('DD/MM/YYYY');
});

permissoinSchema.plugin(mongoosePaginate);
var permission = mongoose.model('permission', permissoinSchema);
module.exports = permission;