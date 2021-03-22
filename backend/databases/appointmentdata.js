var mongoose = require('mongoose');
const { stringify } = require('querystring');
var Schema = mongoose.Schema;



var appointmentdata = mongoose.model('appointmentdata',new Schema({
  userid:String,
  drname:String,
  drhospital:String,
  time:String,
  drid:String,
  username:String,
  number:String,
  date:String,
  day:String,
  slotid:String,
  scheduleid:String,
  status:String
}));




module.exports=appointmentdata;