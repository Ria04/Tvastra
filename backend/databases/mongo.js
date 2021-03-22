var mongoose = require('mongoose');
const { stringify } = require('querystring');
var Schema = mongoose.Schema;



var signupdata = mongoose.model('signupdata',new Schema({
  name:String,
  email:String,
  password:String,
  gender:String,
  date:String,
  phone_number:Number,
  city:String,
  state:String,
  country:String,
  isdoctor:Boolean,
  img:String
}));




module.exports=signupdata;