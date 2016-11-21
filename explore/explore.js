define(["getData","common"],function(getData,common){
	explore = function(){
		this.components;
	};
	explore.prototype.ini = function(){
		common.backFixed('show');
		var that = this;
		var $body = $('body');
		
		if(!($('.explore').length && $('.explore').length>0))
		$body.append('<div class="explore" style="width:100%;height:100%;"></div>');

		common.historyRecord('explore');
		//that.components = $('#poster').detach();
		
        that.exploreBuild();
	
	};
	
	explore.prototype.frame = function(){
		//框架设计函数；		
		function block(num,target,module){
			var propertyOne , propertyTwo;
			if(module == "h"){ propertyOne = "width"; propertyTwo = "height";}
			else if(module = "v"){propertyOne = "height"; propertyTwo = "width";}

			for(var i=0;i<num;i++){
					$("<div class=block"+i+"></div>").appendTo(target)
												  .css(propertyOne,(100/num)+'%')
												  .css(propertyTwo,'100%')
			};
			
		};

		function rowColumn(num,array,target,module){
			//vertical,就分列；horizontal就分行；
					var propertyOne,propertyTwo,className;
					if(module == "v"){propertyOne = "width";propertyTwo = "height"; className = "column"};
					if(module == "h"){propertyOne = "height";propertyTwo = "width";className = "row"};
	
					for(var i=0;i<num;i++){
					
					$('<div class='+className+i+'></div>').appendTo(target)
													.css(propertyOne,(100/num)+'%')
													.css(propertyTwo,'100%');

					};
					$(target ).addClass('frame');
					var rowColumn= $(target ).children("[class*='"+className+"']");
					rowColumn.each(function(index){
						block(array[index],$(this),module);
					});
			
		};

		var windowsTile ='<div class="windowsTile">'
								+'<div class="windowsTile-content"></div>'
								+'<div class="brand ">'
										/*	+'<div class="badge">'
											+'<i class="glyphicon glyphicon-play"></i>'
											+'</div>'*/
								+'</div>'
						 +'</div>';
			
		rowColumn(3,[1,2,2],'.explore','h');

//第1行	
		$('.row0 .block0').addClass('gallery');

//第2行			
		$('.row1 .block0').addClass('photos');
		$('.row1 .block1').addClass('exploreCatagrory');
		rowColumn(2,[2,2],'.exploreCatagrory','h');
			
//第3行
		var exit = $('.row2 .block1');
		exit.addClass('exit');
		var character = $('.row2 .block0');character.addClass('character');
		rowColumn(2,[1,2],'.character','v');
		//	rowColumn(2,[2,1],'.exit','v');

		var block = $('div[class*="block"]').not('.frame');
		block.append(windowsTile);

		

		var frame = {
			exit:exit,
			character:character	
		}
		return frame;
	};

	explore.prototype.exploreBuild = function(){
		var frame = this.frame();
		var that = this;
//gallery
		var article= getData.articleData;
		var gallery = $('.gallery .windowsTile');
		gallery.empty();

		$.each(article,function(index){
				gallery.append('<div class="windowsTile-content">'
											+'<img src='+this.trailerPath+'>'
								+'</div>'
								);
		});	
		gallery.append('<div class="brand ">'
										+'<span class="label">gallery</span>'
										+'<div class="badge">'
											+'<i class="glyphicon glyphicon-pause"></i>'
										+'</div>'
					 +'</div>');
		var option = {period:6000};
		gallery.tile(option);
		$('.badge').click(function(){
			var icon = $(this).find('i');
			icon.toggleClass('glyphicon-pause glyphicon-play');
			icon.hasClass('glyphicon-play')?gallery.tile('pause'):
			gallery.tile(option);
		})
//photos
		var photos = $('.photos .windowsTile');
		photos.find('.windowsTile-content').append('<img src='+article[0].trailerPath+'>')
		photos.find('.brand').append('<span class="label">photos</span>')

//catagrory;
		var catagroryTiles = $('.exploreCatagrory .windowsTile');
		var catagrory = {
			icon:['icon-facetime-video','icon-plane',' icon-road',' icon-globe'],
			color:['lightOrange','green','purple','yellow']
		};
		
		catagroryTiles.each(function(index) {
			$(this).addClass(catagrory.color[index])
				   .children('.windowsTile-content').addClass('icon')
				   .append('<i class='+catagrory.icon[index]+'></i>')
		});
//character
		var character = frame.character;
		character.css({width:(3/4)*100+'%'})
		var characterRow = character.children("[class*=column]");
		characterRow.eq(0).css({width:2/3*100+'%'});
		characterRow.eq(1).css({width:1/3*100+'%'});	
		var avatarZone = $('.character').find('.windowsTile-content');
//随机排序；因为数据库获取的是按顺序的？		
		var avatarArray = [0,1,2];
		function randomsort(a, b) {
		return Math.random()>.5 ? -1 : 1;
		};
		avatarArray.sort(randomsort);
//获取随机数据；		
		$.when(getData.getActorData())
		 .done(function(data){
		 		
		 		$.each(data,function(index){
		 			avatarZone.eq(avatarArray[index]).append('<img src='+this.avatar+'>')
		 		});
		 		avatarZone.find('img').load(function(){
		 			common.backFixed('hide');
		 		})
		 		
		 });
//exit;
		var exit = frame.exit;
//返回；
		exit.addClass('orange')
			.find('.windowsTile-content')
			.addClass('icon')
			.append('<i class="icon-home"></i>');
								   
		exit.css({width:(1/4)*100+'%'})	
	};

	exploreNew = new explore;

	return exploreNew;
});
	
	






