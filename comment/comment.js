define(["common"],function(common){
	comment = function(){
		this.data; 
		this.commentContent ="";
		this.rangeBy = "up";
		
	};
	comment.prototype.ini = function(){
		var windowHeight = $(window).height();
		$('.comment ').remove();
		//添加一个固定的背景
		common.backFixed("show");$(".backFixed").addClass('commentBg');
		$('body').append('<div class="comment"></div>');
		$('#details').css({"position":"fixed"})
		this.navComment();
		this.commentBar();

	};
	comment.prototype.unset = function(){
		/*common.backFixed("hide");*/$(".backFixed").removeClass('commentBg');
		$(".comment").remove();
		$('#details').css({"position":"absolute"})
        
	};
	//比较数据库格式时间2014-12-30 20:58:20.000000；和现在时间的方法
	comment.prototype.getTime = function(commentTime){
		var myDate = new Date();
		
		var commentYMD = commentTime.split(" ")[0],
		commentHMS = commentTime.split(" ")[1],
		YMD = commentYMD.split("-"),
		HMS = commentHMS.split(":");
		HMS[2]=HMS[2].substring(0,2);
		var applydate = new Date(YMD[0],YMD[1]-1,YMD[2],HMS[0],HMS[1],HMS[2]);
		
		//根据时间差来显示时间，如“2天前”
		var timeAgo = myDate - applydate;
		var oneDay = 1000*60*60*24,
			oneHour =1000*60*60,
			oneMinute =1000*60;
		var timeString = timeAgo > (oneDay *7)?commentYMD:
						 timeAgo <= (oneDay *7) && timeAgo >= oneDay ?parseInt(timeAgo/oneDay)+' 天前':
						 timeAgo < (oneHour * 24) && timeAgo >= oneHour ? parseInt(timeAgo/oneHour)+' 小时前':
						 timeAgo < (oneMinute * 60) && timeAgo >= oneMinute?parseInt(timeAgo/oneMinute)+' 分钟前':
						 "刚刚";
		return timeString;
		
	};
	comment.prototype.commentBuild = function(data,range){
		var that = this;
		

		$(".comment .commentZone").remove();
		$.each(data,function(){
							var commentTime = that.getTime(this.commentTime);
							var commentContent = '<div class="commentZone">'
														+'<div class="commentLeft"><img src='+this.avatarPath+'></div>'
														+'<div class="commentRight">'
																+'<div>'+this.userName+'</div>'
																+'<div>'+this.comment+'</div>'
																+'<div>'+commentTime
																		+'<i class="glyphicon glyphicon-thumbs-up"></i>'
																+'</div>'
														+'</div>'
														
												+'</div>';

							if(range == 'up')$(".comment").prepend(commentContent);
							if(range == 'down')$(".comment").append(commentContent);
							
		});
		//设置CSS，让头像高度和宽度一样；
							
		var widthImg = $('.commentLeft img').first().width();
		$('.commentLeft img').css({'height':widthImg});	
		$('.commentRight').last().css({
								'border-bottom': 'none'
		})
	};
	comment.prototype.getComment = function(data){
		
		var that = this;

		that.ini();

		$.ajax({
                    url:  'comment/comment.php', 
                    type: 'POST',
                    data:{
                        	action:'getComment',
                        	articleId:data.articleId
                         },
					dataType: 'json'     
               })
		 .done(function(commentData){
			 		that.commentContent =commentData;
					that.commentBuild(commentData,that.rangeBy);
					
			 		common.backFixed('stop');
					
					
		 });

		if(data)this.data = $.extend({},this.data,data);
		
	};
	comment.prototype.navComment = function(){
				var that = this;
                var navComment = '<div class="navComment ">'
         
                                       +'<span >X</span>'
                                       +'<span>热门评论</span>'
                                       +'<i class="glyphicon"></i>'
                                  +'</div>'
                $(".comment").prepend(navComment);
                that.rangeBy == "up"?$(".navComment i").addClass('glyphicon-arrow-up'):
                					 $(".navComment i").addClass('glyphicon-arrow-down');

                $(".comment").css({"padding-top":$(".navComment").height()});
                $('.navComment i').click(function(){
                      $(this).toggleClass('glyphicon-arrow-up glyphicon-arrow-down');
                      that.rangeBy =  $(this).hasClass('glyphicon-arrow-up')?"up":"down";
                      that.commentBuild(that.commentContent,that.rangeBy);
                });
                $('.navComment span').first().click(function(){
                      that.unset();
                })

    };
	comment.prototype.commentBar = function(){
		var that = this;
		$('.comment').append(
								'<div class="commentBar">'
										+'<div id="comment" style="width:90%;"><input></div>'
										+'<div style="width:10%;"><i class="glyphicon glyphicon-send"></i></div>'
								+'</div>'
							);
		
		$('.commentBar i').click(function(){
				var comment = $('#comment>input ').val();
					
				that.data.userId != undefined?sendComment():location.href='../login/login.html';
				
				function sendComment(){
					var articleId = that.data.articleId;
					if(comment == "") return ;
					$.ajax({
	                        url:'../comment/comment.php', 
	                        type: 'POST',
	                        data:{
	                        		action: 'addComment',
	                        		articleId:articleId,
	                        		comment:comment,
	                        		userId:that.data.userId
	                        	 }
	                       })
					.done(function(){
					 			 that.getComment(that.data);
					 			 $('#comment>input ').val('');
					 	  });
				};
				
		});

	};
	
	commentNew = new comment;
	
	
	return commentNew;
	
})