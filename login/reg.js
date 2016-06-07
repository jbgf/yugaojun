+function($){
	
	var Reg = function(element,option){
		this.$element = $(element);
		this.option = option;
		this.state = "right";
		this.input = this.$element.find('input');
		
		this.userNameRepeat;
		this.lastUserNameInput;
		this.regTestData = {};
	};

	
	//启动执行动画；
	Reg.prototype.getText = function (){
		var that = this;
		var text,className;
		that.button();

		that.input.blur(function(){
			
			var index = that.input.index(this);
			text = that.input.eq(index).val();
			className = that.$element.children('div').eq(index).attr("class");
			var data = {"text":text,className:className,index:index};
			that.regTestData = data;
			that.testReg(data);
			
		});
		
				
	}
	Reg.prototype.button = function(){
			var that = this;
			
			$(document).on('click','.button',function(){
						//因为blur比click早发生，所以state可以先得到判断值；
						if(that.state == "wrong"){
									return false;
						};
						that.input.each(function(index,element){
								//重名优先
								if(that.userNameRepeat == "yes")return false;
								var text = $(element).val();
								var className = that.$element.children('div').eq(index).attr("class");
								var data = {"text":text,className:className,index:index,state:that.state}
								
								that.testReg(data);
								if(that.state == "wrong"){
									return false;
								};
								//信息不完整；
								if(that.state == "null"){
									var nullData = $.extend({}, data, {tip:"请填写完整信息"});
									
									that.animate(nullData);
									return false;
								};
						});
						if(that.state == "right"){
								
								
								var userName = that.input.eq(0).val();
								var passWord = that.input.eq(1).val();
								var email = that.input.eq(2).val();
								var signUpData = {
									action:"signUp",
									userName:userName,
									passWord:passWord,
									email:email
								};
//插入user表								
								$.when(that.signUp(signUpData))
								 .done(function(){
								 		$.getScript("/login/logIn.js", function() {
										  	var loginData = {
											            action:'logIn',
											            userName:userName,
											            passWord:passWord
											                    	};
//模拟登录操作/跳过；
										  	logIn(loginData);
//ajax操作成功应用动画；										  	
										  	var rightData = $.extend({}, that.regTestData, {index:"complete",tip:"注册成功"});
											that.animate(rightData);
										});
								 })
						}
			})
	}
	Reg.prototype.signUp = function(data){
		return $.ajax({
							url: '/login/signUp.php',
							type: 'POST',
							data: data
						});
						
	}
	Reg.prototype.testReg = function (data){
		var that = this;
		
		function getReg(className){
			var userNameReg = /^[a-zA-Z0-9_]{1,16}$/;
			var passWordReg =/^[0-9A-Za-z]{6,20}$/;
			var emailReg =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

			var regExp = className == "userName"?userNameReg
			:className == "passWord"?passWordReg
			:className == "email"?emailReg
			:"";
			return regExp;
		};
		function getTip (className){
			var tip = className == "userName"?"数字或字母"
			:className == "passWord"?"请设置6-20位的<br/>含有数字或字母的密码"
			:className == "email"?"邮箱格式不正确"
			:"";
			return tip;
		};
		
		var regExp = getReg(data.className);
		var tip = getTip(data.className);
		
			!regExp.test(data.text)?
			(data.text !=""?that.state = "wrong"
			:that.state="null")
			:that.state="right";
		
		var testData = $.extend({}, data, {test:that.state,tip:tip});
		if(testData.test == "right" && testData.className =="userName"){
			that.checkUserName(testData.text);

                  var intervalGetData = setInterval(interval,500);
                  function interval(){
                    if(that.userNameRepeat){
                        clearInterval(intervalGetData);
                        testData = $.extend({}, testData,{userNameRepeat:that.userNameRepeat,tip:"重名了"});
						if(testData.userNameRepeat == "yes"){that.animate(testData)}                      	
                    }
                  }
		}
		if(testData.test != "right" && testData.test != "null"){
			that.animate(testData);
		}
		
	
		
	};
	Reg.prototype.checkUserName = function(userName){
			var that = this;
				if(userName !=that.lastUserNameInput){
					$.ajax({
							url: '/login/signUp.php',
							type: 'POST',
							data: {action:"checkUserName",userName:userName}
						})
						.done(function(repeat){
						 		that.lastUserNameInput = userName;
						 		if(repeat == "no"){that.userNameRepeat = "no";}
						 		if(repeat == "yes"){that.userNameRepeat = "yes";}
						 		
						 })
				}			
						
	}
	Reg.prototype.animate = function(data){
		var that = this;
		var index = data.index,
			tip = data.tip,
			text = data.text,
			test = data.test;


			if(data.test == "repeat"){tip = "重名啦";}
			if(data.test == "wrong"){};
			
			
			$(".toolTip").remove();
		var toolTip = $("<div class='toolTip' style='padding:15px;text-align:center'>"+tip+"</div>");
		
		$('body').append(toolTip);
		var toolTipWidth = toolTip.width(),
			toolTipHeight = toolTip.height();	
			toolTip.css({"margin-left":-(toolTipWidth+2*15)/2,
						 "margin-top":-(toolTipHeight+2*15)/2
			});
		var fade = function(){toolTip.fadeOut()}
			setTimeout(fade,1200);
			
			if(typeof index == "number"){
			
/*直接采用select（）会和前面的settimeout冲突，也要采取settimeout方法*/				
				function t(){that.input.eq(index).select()/*.val("")*/};
				setTimeout(t,400);
				
			} 

			else if(index == "complete"){
				var circle =$('<div class="circleProgress_wrapper" style="display:table-cell;vertical-align:middle">'
					        +'<div class="wrapper right">'
					            +'<div class="circleProgress rightcircle"></div>'
					        +'</div>'
					        +'<div class="wrapper left">'
					            +'<div class="circleProgress leftcircle"></div>'
					        +'</div>'
					        +'<i class="iconFont" style="display:inline-block">&#xe603;</i>'
		 		+'</div>');
				var button = $('.button');
				var buttonWidth = button.width();

				$('.button').html("").append (circle);
				circle.css({"left":(buttonWidth-30)/2});
				var timeStr= $(".leftcircle").css("animation-duration"),timeDelay;
				timeDelay = timeStr.substring(0,timeStr.length-1)*1000;

				setTimeout(function(){location.href = "/index.html"},timeDelay+500)
				
			}
	
	
		
	}

var old = $.fn.Reg;

$.fn.Reg =function(){
	
	return this.each(function() {
		var $this = $(this)
		var data = $this.data('bs.Reg')

		if(!data) $this.data('bs.Reg',(data = new Reg(this)))
		data.getText();
		

	})
}
$.fn.Reg.Constructor = Reg;
$.fn.Reg.noConflict = function (){
	$.fn.Reg = old;
	return this
}

}(window.jQuery)


