var formidable = require("formidable");
var User = require("../models/User.js");
var path = require("path");
var url = require("url");
// var gm = require('gm');

//显示info的页面
// exports.showInfo = function(req,res){
// 	//如果用户没有登录，那么呈递error错误页面
// 	if(!req.session.login){
// 		res.render("error" , {
// 			"tip" : "请先登录",
// 			"column" : "info" , 		//每一个render都要有这个属性
// 			"login" : req.session.login ,//每一个render都要有这个属性
// 			"email" : req.session.email//每一个render都要有这个属性
// 		});
// 		return;
// 	}
 
// 	res.render("info" , {
// 		"column" : "info" , 		//每一个render都要有这个属性
// 		"login" : req.session.login ,//每一个render都要有这个属性
// 		"email" : req.session.email//每一个render都要有这个属性
// 	});
// };

//Ajax提供用户信息
exports.checkoutInfo = function(req,res){
	//得到前端提交的email
	// var form = new formidable.IncomingForm();
	// form.parse(req , function(err , fields , files){
		var mail=req.session.email
		//检索数据库
		User.find({"mail" : mail} , function(err , results){
			
			res.json({
				"mail" : results[0].mail ,
				"name" : results[0].nickname ,
				"introduction" : results[0].introduction ,
				"avatar" : results[0].avatar
			});
		});
	// });
}

//修改用户信息
exports.updateInfo = function(req,res){
	//得到前端提交的表单信息
	var form = new formidable.IncomingForm();
	form.parse(req , function(err , fields , files){
		//email在session中
		var email = req.session.email;

		//更改数据！$set不要忘记！！
		User.update({"email" : email} , {"$set" : {
			"nickname" : fields.nickname ,
			"introduction" : fields.introduction
		}} , function(err , results){
			res.json({"result" : err ? -1 : 1})
		});
	});
}

//处理上传
exports.uploadavatar = function(req,res){
	//得到前端提交的表单信息
	var form = new formidable.IncomingForm();
	//设置上传文件夹
	form.uploadDir  = path.resolve(__dirname , "../uploads");
	//保留拓展名
	form.keepExtensions = true;

	form.parse(req , function(err , fields , files){
		//提炼出刚刚上传的图片的文件名
		var pathname = url.parse(files.avatar.path).pathname.match(/\/(upload_.+)$/)[1];
		//将这个文件夹名存入session！
		req.session.avatarurl = pathname;
		//跳转页面
		res.redirect("/cut");
	});
}

//显示上传头像的表单
exports.showform = function(req,res){
	res.render("form");
}


//呈递裁切页面
exports.showcut = function(req,res){
	//【开发便利语句开始】
	// req.session.avatarurl = "192.jpg";
	//【开发便利语句结束】
	//在这里用gm得到图片的尺寸！
	var avatarurl = path.resolve(__dirname , "../uploads") + "/" + req.session.avatarurl;
	gm(avatarurl).size(function(err , size){
		//得到尺寸，原始尺寸我们称为origin_w、origin_h
		var origin_w = size.width;
		var origin_h = size.height;
		//约束图片在460*360之间
		//看看这个图片宽高比有没有超过460 / 360
		if(origin_w / origin_h >= 460 / 360 && origin_w > 460){
			//让图片的显示尺寸为（等比例变化）
			var view_w = 460;
			var view_h = (460 / origin_w) * origin_h;
		}else if(origin_w / origin_h <= 460 / 360 && origin_h > 360){
			var view_h = 360;
			var view_w = (360 / origin_h) * origin_w;
		}else{
			var view_w = origin_w;
			var view_h = origin_h;
		}

		
		res.render("cut" , {
			"avatarurl" : req.session.avatarurl ,
			"view_w" : view_w ,
			"view_h" : view_h,
			"origin_w" : origin_w,
			"origin_h" : origin_h
		});
	});


}

//处理裁剪
exports.docut = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req , function(err , fields , files){
		//得到前端传过来的四个参数：
		var x = fields.x;
		var y = fields.y;
		var w = fields.w;
		var h = fields.h;

		var avatarurl = path.resolve(__dirname , "../uploads") + "/" + req.session.avatarurl;
		var avatarurl_new = path.resolve(__dirname , "../www/useravatars") + "/" + req.session.avatarurl;

		//让gm开始裁剪！
		gm(avatarurl).crop(w,h,x,y).write(avatarurl_new, function (err) {
			//数据库持久
			User.update({"email" : req.session.email} , {"$set" : {"avatar" : "/useravatars/" + req.session.avatarurl}},function(){
				res.json({"result" : 1});
			})
		});
	});
}