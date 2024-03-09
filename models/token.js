var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tokenSchema = new Schema({
    Token: String,
 
    Date: Date
});

var Token = mongoose.model('Token', tokenSchema, 'Token');

module.exports = Token;