$(function(){
	//拿到页面上的暗记，查看是否登录
	var login = $("#login_hint").html() == 1;
	var email = $("#email_hint").html();
	
	if(login && email){
		$.ajax({
			"type" : "CHECKOUT" , 
			"url" : "/info" ,
			"data" : {
				"email" : email
			},
			"success" : function(data){
				$("#avatar_small_pic").attr("src" , data.avatar);
				$("#nicknamespan").html(data.nickname);
			}
		});
	}
});