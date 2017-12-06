var formidable = require("formidable");
var crypto = require("crypto");
var User = require("../models/User.js");

//显示注册页面
exports.showRegist = function(req,res){
	res.render("regist" , {
		//当前所在的栏目
		"column" : "regist",
		"login" : req.session.login ,
		"email" : req.session.email
	});
}


//执行注册
exports.doRegist = function(req,res){
	//识别用户的请求
	var form = new formidable.IncomingForm();
	form.parse(req , function(err , fields , files){
		console.log(fields);
		var mail = fields.mail;
		var password = fields.password;

		//此时要进行加密！下面的语句表示用SHA256加密password然后处理为16进制
		//拼接一个我是考拉的目的就是防止黑客能够破译，增加破译难度。
		password = crypto.createHash('SHA256').update(password + "加密").digest("hex");
		console.log(mail , password)

		//在写入数据库之前，我们再次验证用户名是否存在了！
		User.count({"mail" : mail} , function(err , count){
			//如果用户名不存在
			if(count == 0){
				//写入数据库
				User.create({
					"mail" : mail , 
					"password" : password
				},function(err){
					//返回值：
					//1 成功
					//-1 错误
					res.json({"status" : err ? "no" : "ok"});
				});
			}else{
				//-2用户名被占用
				res.json({"result" : "1"});
			}
		});
			
	});
}

//检查用户名是否被占用
//执行注册
exports.checkUserExist = function(req,res){
	//识别用户的请求
	var form = new formidable.IncomingForm();
	form.parse(req , function(err , fields , files){
		var email = fields.email;
		User.count({"email" : email} , function(err , count){
			res.json({"result" : count});
		});
	});
}