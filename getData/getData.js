define("getData",function(){
		
		var getData = function(){
				this.userData;
				this.articleData;
				
            //    this.currentPage=currentPage;        //当前页面；
            //    this.posterNum=posterNum;          //每页展示的电影poster数量；
            //    this.data;                          //存放数据库查询的数据；
		};
		
		getData.prototype.getPoster = function(){
		return $.post({
                        url:    'poster/poster.php', 
                        data:    {action: 'getPoster',currentPage:that.currentPage,posterNum:that.posterNum},
                        
					    dataType: 'json'     
                       });
		}
		getData.prototype.getUserData = function(path){
        var serverPath = path?path:'/login/login.php';
        return $.ajax({
				      	url: serverPath,
				      	method: "POST",
				      	dataType:"json",
				      	data: {"action":'checkLogIn'}
				      	
				      }); 
        		
        }; 

        getData.prototype.getActorData = function(){
		        return $.ajax({
						      	url: '../explore/explore.php',
						      	method: "POST",
						      	dataType: 'json',
						      	data: {
						      			action: 'getActorData'

						      		}
						      	
						      }); 
		        		
		}; 	
        getData.prototype.getLikeData = function(path,data){
        		var serverPath = path;
		        return $.ajax({
						      	url: serverPath,
						      	method: "POST",
						      	dataType: 'json',
						      	data: data
						      }); 
		        		
		}; 	
		var newData = new getData;
		return newData;
})