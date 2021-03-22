var mongoose = require('mongoose');
const { stringify } = require('querystring');
var Schema = mongoose.Schema;




var medicaldata = mongoose.model('medicaldata',new Schema({
  medicalid:String,
  name:String,
  title:String,
  date:String,
  typeofreport:String,
  imgs:Array


  
}));


module.exports=medicaldata;