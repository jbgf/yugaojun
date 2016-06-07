define(["jquery","getData","common"],function($,getData,common){
		likePage = function()	{

		}
		likePage.prototype.ini = function(){
			var that = this;
			var userPath ='/login/login.php';
			var likePath ='likePage.php';
			$.when(getData.getUserData(userPath))
			 .done(function(likeUserData){
					common.deleteNull(likeUserData.logInf);			 		
			 		var  userData= $.extend({},common.userDefault,likeUserData.logInf);
			 		
			 		var data = {action: 'getLikeData',
			 					userId:userData.userId	
			 					};
			 		$.when(getData.getLikeData(likePath,data))
			 		 .done(function(likeData){
			 		 	  var pageData = $.extend({}, userData, likeData);
			 		 	  
			 		 	  that.build(pageData);	
			 		 });
			 });

		};
		likePage.prototype.build = function(pageData){
				var body = $("body");
				var avatarPath = pageData.avatarPath;
				var avatar = $('<div class="avatar"><img src='+avatarPath+'></div>');
				var avatarWidth = $(window).width()/5;
				avatar.appendTo(body)
					  .css({
					  		'width':avatarWidth,
					  		'height':avatarWidth
					  });

				var sign = $('<div class="sign"><span>'+pageData.userName+'</span><br/><span>'+pageData.sign+'</span></div>');					  
				sign.appendTo(body);

				var likeZone = $("<div class='likeZone'></div>");
				likeZone.appendTo(body);
				var trailerWidth = likeZone.width()/5;
				
				$.each(pageData.likePage,function(index,value){
					var likeArticle = $("<div class='likeArticle'><img></div>");
					likeArticle.appendTo(likeZone)
					   .css({
					   		width:'20%',
					   		height:trailerWidth,
					   		
					   })
					   .children('img')	
					   .attr({src:'/'+value.trailerPath});

				}) 
		}
		likePageNew = new likePage;
		likePageNew.ini();
		return likePageNew;
})