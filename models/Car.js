var mongoose = require("mongoose");

var schema = new mongoose.Schema({ 
	"id": Number,
	"brand": String,
	"series_name": String,
	"type": String,
	"seat": Number,
	"color": String,
	"colorEnglish": String,
	"image": String,
	"directory": String,
	"engine": String,
	"paifang": String,
	"biansuxiang": String,
	"price": Number,
	"km": Number,
	"goumaidate": String,
	"saler": String,
	"detail": String
});

module.exports = mongoose.model("Car", schema);