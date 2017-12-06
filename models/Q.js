var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	"email" : String ,		 
	"content" : String , 
	"images" : [String] ,
	"time" : Date
});

module.exports = mongoose.model("Q" , schema);