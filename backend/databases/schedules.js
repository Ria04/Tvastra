var mongoose = require('mongoose');
const { stringify } = require('querystring');
const { strict } = require('assert');
var Schema = mongoose.Schema;

var slotsschema =new Schema({
   time:String,
   day:String,
   isdisabled:Boolean,
   hospital:String,
   isbooked:Boolean,
   bookeddate:String
});


var schedules = mongoose.model('schedules',new Schema({
    email:String,
    days:String,
    date:Date,
    selecthospital:String,
    fromtime:String,
    totime:String,
    interval:String,
    schedule:[slotsschema],
    isdisabled:Boolean,
    createdby:String


  
}));


module.exports=schedules;