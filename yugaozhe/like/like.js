define(["getData","poster"],function(getData,poster){
	like = function(){

	};
	like.prototype.sendLike = function(){
		$("#poster").on("click",".heart",function(){
			var that = this;
			var userInf = getData.userData;
            if(userInf.userId){
                $(this).toggleClass('glyphicon-heart-empty glyphicon-heart red heartBeat');
                setTimeout(function(){
                                 $(that).removeClass('heartBeat');    
                           },300);
            }else{
                location.href='../login/login.html';
            };       

			var action = $(this).hasClass('red')?"like":"delete";
			var index = $(this).index(".heart");
			var articleData = getData.articleData[index];
			
			$.ajax({
				url: '../like/like.php',
				type: 'POST',
				dataType: 'json',
				data: {
						action: action,
						userId:userInf.userId,
						articleId:articleData.articleId
					}
			});
		})
	};

	likeNew = new like;
	likeNew.sendLike();
	
})