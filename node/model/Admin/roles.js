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

const rolesSchema = new mongoose.Schema({
    name: String,
    type:String,
    key:String,
    parent_type:String,
    page_type:String,
    user_type:Number,
    admin_type:Number,
    permissions:Array,
    is_delete:{ type: Boolean,default:false },
}, schemaOptions);



rolesSchema.pre('save', function (next) {
  // get the current date
  var currentDate = moment();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

rolesSchema.virtual('created_date').get(function () {
  var created_date = moment(this.created_at);
  return created_date.format('DD/MM/YYYY');
});

rolesSchema.plugin(mongoosePaginate);
var roles = mongoose.model('roles', rolesSchema);
module.exports = roles;