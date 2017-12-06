		(function(){
			//拿到页面上的暗记，查看是否登录
			var login = $("#login_hint").html() == 1;
			var email = $("#email_hint").html();

			if(!login){
				$("#col_left").hide();
				$("#tiwenbox").hide();
				return;
			}
			
			//如果登录了，拉取用户信息，改变左栏
			if(login && email){
				$.ajax({
					"type" : "CHECKOUT" , 
					"url" : "/info" ,
					"data" : {
						"email" : email
					},
					"success" : function(data){
						$("#avatar_big_pic").attr("src" , data.avatar);
						$("#nickname_b").html(data.nickname);
						$("#introduction_span").html(data.introduction);
					}
				});
			}

			//点击插入图片按钮的事件
			$("#insertpic_button").click(function(event){
				//阻止事件继续传播，这样的话就不会点击a标签的时候，也会触发document的点击事件了
				event.stopPropagation();
				$("#insertpic_box").removeClass('fade').addClass('show');
			});

			//点击插入图片框的外部关闭这个框框
			$(document).click(function(event){
				//你点击的最内层元素
				var target = event.target || event.srcElement;
				//如果点击的这个元素，不是#insertpic_box的后代，它也不是#insertpic_box本身，就关闭悬浮框
				if($(target).parents("#insertpic_box").length <= 0 && !$(target).is("#insertpic_box")){
					$("#insertpic_box").removeClass('show').addClass('fade');
				} 
			});
		})();