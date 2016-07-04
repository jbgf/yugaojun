define(["poster","getData"],function(poster,getData){
	pagination = function(){

	};

	pagination.prototype.ini = function(){
				var that = this;
				var interval = setInterval(interval,500);
				function interval(){
					
					if(getData.userData){

							clearInterval(interval);
							var data = getData.userData;
							that.page(data);
							
					}
				};
		
	};
	pagination.prototype.page = function(data){
				var pageNum = Math.ceil( data.countArticle/poster.posterNum);
				var windowWidth = $(window).width();
				$('<div class="paging"><div>dfdfdf</div></div>').appendTo('body');
				pagingBuild(1,2);
				var paging = $(".paging");
				paging.on('click','.pagingPage',function(){
							var pageIconNum = parseInt($(this).text());
						    	$(this).addClass('active').siblings('div').removeClass('active');
						 
						    pagingBuild(pageIconNum,2);
						    poster.posterChoose(pageIconNum,poster.posterNum);
				});
				function pagingBuild(activeNum,range){
							var paging = $(".paging");
							paging.empty();
							var min,max;
							min= activeNum-range ,/*显示的最大和最小的页码*/
							max= activeNum + range;
							var ellipsis = '<div class="ellipsis">···</div>'
										  +'<div>'+pageNum+'</div>';
							var preEllipsis = '<div>1</div>'
											 +'<div class="ellipsis">···</div>';										  
							if(activeNum >= pageNum-range){
								min=pageNum-2*range,max=pageNum;
								ellipsis ="";
							};
							if(activeNum<=range+2){
								if(activeNum == range+2){preEllipsis='<div>1</div>'}
								else{preEllipsis = "";}
							}
							for(var i=min ;i<=max;i++){
										if(i<1){continue};  //小于1的就不显示了；
										if(i==activeNum){$(".paging").append('<div class="active">'+i+'</div>');continue;}
										$(".paging").append('<div>'+i+'</div>');
							};
							paging.append(ellipsis).prepend(preEllipsis);
						
							
				//pageIcon css
							var pageIcon = $(".paging>div")
							pageIconHeight = pageIcon.first().height(),
						    iconFontSize = pageIcon.css('font-size').replace("px",""),
						    pageIconPadding = (pageIconHeight-iconFontSize)/2;
						    pageIcon.addClass('pagingPage');

						    pageIcon.css({"padding-top":pageIconPadding+'px',"padding-bottom":pageIconPadding+'px'});
				//paging css
							var pagingWidth = paging.width(),
						    marginLeft = (windowWidth-pagingWidth)/2;

							$(".paging").css({"margin-left":marginLeft});
				};
	};

	pagination.prototype.unSet = function(){

	};
	paginationNew = new pagination;
	paginationNew.ini()
	return paginationNew;
})