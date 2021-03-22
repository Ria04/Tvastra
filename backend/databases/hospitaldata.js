var mongoose = require('mongoose');
const { stringify } = require('querystring');
var Schema = mongoose.Schema;



var hospitaldata = mongoose.model('hospitaldata',new Schema({
  name:String,
  img:String,
  treatment:String,
  beds:String,
  specialization:String,
  location:String,
  description:String
}));




module.exports=hospitaldata;