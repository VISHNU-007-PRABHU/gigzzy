var mongoose = require('mongoose');
const moment = require("moment");
const commonHelper = require('../../graphql/commonHelper');
mongoose.set('useFindAndModify', false);
var Schema = mongoose.Schema;

//create user schema 
var schemaOptions = {
  toObject: {
    virtuals: true
  }
  , toJSON: {
    virtuals: true
  },
  timestamps: true
};


var adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: { type: String, default: 'admin' },
  password: { type: String },
  roles: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
  permissions: [],
  roles_permissions: [],
  is_delete: { type: Boolean, default: false },
  GizzyDeveloper: { type: Boolean, default: false },
}, schemaOptions);

adminSchema.pre('save', function (next) {
  // get the current date
  var currentDate = moment();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

adminSchema.virtual('created_date').get(function () {
  var created_date = moment(this.created_at);
  return created_date.format('DD/MM/YYYY');
});

var admin = mongoose.model('admin', adminSchema);
module.exports = admin;

