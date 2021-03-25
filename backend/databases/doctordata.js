var mongoose = require('mongoose');
const { stringify } = require('querystring');
var Schema = mongoose.Schema;




var doctordata = mongoose.model('doctordata',new Schema({
  name:{
    type:String,
    trim:true,
    required:true
  },
  email:{
    type:String,
    lowercase:true,
    trim:true,
    required:true,
    unique:true
  },
  password:String,
  gender:{
    type:String,
    lowercase:true,
    trim:true,
    required:true,
    enum:["male","female","other"]
  },
  date:String,
  phone_number:Number,
  city:String,
  state:String,
  country:String,
  img:String,
 yourhospital:String,
 achievements:String,
 exp:Number,
 qualifications:String,
 awards:String,
 specialization:String,
 fees:Number,
 description:String,
 treatments:String,


  
}));


module.exports=doctordata;