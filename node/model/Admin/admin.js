var mongoose = require('mongoose'); 

var Schema = mongoose.Schema;

//create user schema 

var adminSchema = new Schema({
    email:{type:String,unique:true},
    password:{type:String},
    roles: {type: mongoose.Schema.Types.ObjectId, ref: 'roles'}
});


  var admin = mongoose.model('admin', adminSchema );

  module.exports = admin;
