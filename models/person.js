var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var personSchema = new Schema({
FullName:{type:String},
Chernova:{type:String},
DOBY:{type:Number},
DOBM:{type:Number},
DOBD:{type:Number},
DeathM:{type:Number},
DeathD:{type:Number},
DeathY:{type:Number},
Nationality:{type:String},
Height:{type:Number},
Profession:{type:String},
Tags:[String]

});

var User = mongoose.model('Person',personSchema,'Person');
module.exports= User;