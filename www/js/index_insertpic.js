(function(){
	//数组
	window.picuparr = [];
	//计数 
	var count = 0;

	//图片上传类，每一个类的实例是一个li，内嵌一个iframe、一个菊花图、一个缩略图
	function PicUpItem(){
		//随机一个数字 Date.parse()得到1970年1月1日0:0:0到现在的毫秒数，拼接一个随机6位数
		this.id = Date.parse(new Date()) + "" +  parseInt(Math.random() * 899999 + 100000);
		//在数组中的顺序
		this.idx = count;
		console.log(count);
		count++;
		 
		//自己的状态，是加号状态，还是图片状态
		this.state = 0; //0加号，1是图片
		 
		//自己的dom
		this.$dom = $([
			'<li>',
			'	<iframe src="/form2?id=' + this.id + '" width="80" heigth="80" frameborder = "0"></iframe>',
			'	<div class="preview" style="display:none;"></div>',
			'	<div class="shanchubtn" style="display:none;">×</div>',
			'	<div class="juhua" style="display:none;">',
			'		<img src="images/loading.svg" width="80" height="80" >',
			'	</div>',
			'</li>'
		].join(""));

		//上树
		$("#insertpic_box_ul").append(this.$dom);


		//得到自己的菊花
		this.$juhua = this.$dom.find(".juhua");
		//得到自己的预览图
		this.$preview = this.$dom.find(".preview");
		//得到自己的iframe
		this.$iframe = this.$dom.find("iframe");
		//得到自己的叉号
		this.$shanchubtn = this.$dom.find(".shanchubtn");
		//备份this
		var self = this;


		//定义专属于自己的finish回调函数！
		window["finish" + this.id] = function(picurl){
			//数组中改变
			picuparr[self.idx] = picurl;
			//后台给你图片地址了，此时加载一个图片，当这个图片加载完毕之后，隐藏菊花、显示预览图
			var image = new Image();
			image.src = "uploads/" + picurl;
			image.onload = function(){
				self.$juhua.hide();
				// alert("我相当于一个回调函数，我知道了图片的地址" + picurl);
				self.$preview.css({
					"width" : 80,
					"height" : 80,
					"background" : "url(uploads/" + picurl + ")" ,
					"background-size" : "cover" ,
					"background-position" : "center center"
				}).show();
				self.$iframe.hide();
			}
		}

		//定义专属于自己的uping函数
		window["uping" + this.id] = function(){
			self.$juhua.show();
			self.$iframe.hide();
			//放一个占位符
			picuparr[self.idx] = "正在上传"
			//改状态
			self.state = 1;

			//如果不到9图就能继续上传
			if(count < 9){
				new PicUpItem();
			}
		}

		//事件监听
		this.$dom.bind("mouseenter",function(){
			if(self.state == 1){
		 
				self.$shanchubtn.show();
			}
		});
		this.$dom.bind("mouseleave",function(){
			self.$shanchubtn.hide();
		});

		//小插号的监听
		this.$shanchubtn.click(function(){
			//删除DOM
			self.$dom.remove();
			//数组中删除
			picuparr.splice(self.idx , 1);
			//减去
			count-=2;
			if(count == 8){
				new PicUpItem();
			}
		});
		
	}

	//一上来实例化一个
	new PicUpItem();

	var start , stop;
	//可以被排序
	$("#insertpic_box_ul").sortable({
		"items" : "li:not(:last)" ,
		"start" : function(event, ui){
			start = ui.item.index();
		},
		"stop" : function(event, ui){
			stop = ui.item.index();

			picuparr.splice(stop , 0 , picuparr.splice(start , 1)[0]);
		}
	});

	//绿色发帖按钮的事件监听
	$("#fabu_btn").click(function(){
		$.ajax(
			{
				"url" : "/q",
				"type" : "POST",
				"traditional" : true,
				"data" : {
					"content" : $("#content_textarea").val() ,
					"images" : picuparr
				},
				"success" : function(){
					alert("发布成功！");
					$("#content_textarea").val("");
					$("#insertpic_box_ul").empty();
					new PicUpItem();
					window.picuparr = [];
				}
			}
		);
	});

})();