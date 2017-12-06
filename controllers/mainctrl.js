var formidable = require("formidable");
var path = require("path");
var url = require("url");
var Q = require("../models/Q.js");
var User = require("../models/User.js");

//显示首页
exports.showIndex = function(req,res){
	//测试：
	// req.session.login = true;
	// req.session.email = "shao@163.com";
	//测试：
	res.render("index" , {
		"column" : "index",
		"login" : req.session.login ,
		"email" : req.session.email
	});
}

//小电视中内嵌的一个表单
exports.form2 = function(req,res){
	res.render("form2" , {
		id : url.parse(req.url , true).query.id
	});
}

//图片的上传
exports.doFatietupian = function(req,res){
	var form = new formidable.IncomingForm();
	//得到GET请求的参数
	var id = url.parse(req.url , true).query.id;
	//设置上传文件夹
	form.uploadDir  = path.resolve(__dirname , "../uploads");
	//保留拓展名
	form.keepExtensions = true;
	
	form.parse(req , function(err , fields , files){
		//提炼出刚刚上传的图片的文件名
		var pathname = url.parse(files.tu.path).pathname.match(/\/(upload_.+)$/)[1];
		//相当于回调函数
		res.send('<script type="text/javascript">window.parent.finish'+ id + '("' + pathname + '");</script>');
	});
}

//发帖功能
exports.doSaveQ = function(req,res){
	if(!req.session.email) return;

	var form = new formidable.IncomingForm();
	form.parse(req , function(err , fields , files){
		var email = req.session.email;
		var content = fields.content;
		var images = fields.images;
		var time = new Date();

		//保存
		Q.create({
			email  : email ,
			content : content, 
			images  : images ,
			time  : time 
		},function(){
			res.json({"result" : 1});
		});
	});
}

//拉取所有帖子
exports.getQ = function(req,res){
	var page = url.parse(req.url , true).query.page;
	var pagesize = url.parse(req.url , true).query.pagesize;
	//统计总条数
	Q.count({},function(err,count){
		//得到当前页的帖子，按时间倒序
		Q.find({}).sort({"time" : -1}).skip((page - 1) * pagesize).limit(pagesize).exec(function(err,results){
			res.json({"count" : count ,"results" : results});
		});
	});
	
}

//通过email查询昵称和头像、一句话简介
exports.getUser = function(req,res){
	//GET请求
	var email = url.parse(req.url , true).query.email;

	User.find({"email" : email},function(err,results){
		if(results.length == 0) return;
		res.json({
			"email" : results[0].email ,
			"avatar" : results[0].avatar ,
			"introduction" : results[0].introduction ,
			"nickname" : results[0].nickname 
		});
	});
}