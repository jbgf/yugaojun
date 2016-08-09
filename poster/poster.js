    define("poster",["getData","common","head"],function(getData,common,head){
            
            var poster= function(){
                
                
                this.test='test';
                this.currentPage;        //当前页面；
                this.posterNum;          //每页展示的电影poster数量；
                this.data;                          //存放数据库查询的数据；
            };
            
          
            poster.prototype.bigScreenPoster   = function(){};
              
            poster.prototype.smallScreenPoster = function(){
                      
                      var that = this;
                      $.when(getData.getUserData())
                                    .done(function(data) {
                                     
                                        getData.userData = data.logInf;
                                        
                                        var userInf = data.logInf;
                                        var articleData = {
                                                  action: 'getPoster',
                                                 
                                                  currentPage:that.currentPage,
                                                  posterNum:that.posterNum
                                                }; 
                                        //获取poster数据； 
                                        if(userInf.userId){articleData = $.extend({},articleData,{userId:userInf.userId});}         
                                        $.post(
                                              'poster/poster.php', 
                                              articleData, 
                                              function(json) {
                                                    getData.articleData = json.poster; 
                                                    $.each(json.poster,function(){
                                                        
                                                        $('<div><img class="trailerImg" src='+this.trailerPath+'></div>')
                                                          .css({                        //设置页面布局：3个poster
                                                                  width:'100%',
                                                                  height:($(window).height()-$('#head').height())/that.posterNum,
                                                                  position:'relative'
                                                          })
                                                          .append('<div class="articleMask"></div>')
                                                          .append('<div class="ui">'
                                                                  +'<span>'+this.name+'</span>'
                                                                  +'<i  class="glyphicon glyphicon-heart-empty heart "></i>'  
                                                                  +'</div>')
                                                          .appendTo('#poster');
                                                    });
                                                    $('.trailerImg').load(function(){
                                                        common.backFixed('hide');
                                                    });
                 
                  //js写入cookie,还是采用php写入；
                                                          //if(userInf.state == "in")cookie.writeCookie(userInf,1);
                  //随机颜色蒙版；
                                                          /*$('#poster .articleMask').each(function(index){
                                                           
                                                              var color=common.randomColor(155,100);
                                                              $(this)
                                                                  .css({
                                                                    'background-color':'#'+color,          //随机设置颜色;如下155-255是浅色的
                                                                    'opacity':'0.4'
                                                                  })*/
                  //"红星"收藏电影功能；
                                                          
                                                          $('.heart').each(function(index){
                                                                var that = this;
                                                                var likeUserID = json.poster[index].likeUserID;
                                                                
                                                                likeUserID == userInf.userId && userInf.userId !=null ? $(this).toggleClass('glyphicon-heart-empty glyphicon-heart red'):'';
                                                                
                                                          });
                                                    

                                              },'json');
                                      })
            
                      

            };
            poster.prototype.posterChoose = function(currentPage,posterNum){
                   
                   common.historyRecord('home');
                   $("#poster").empty();
                   head.headCommon();
                   this.currentPage = currentPage;
                   this.posterNum = posterNum;
                   common.backFixed();

                   head.isBigScreen?this.bigScreenPoster():this.smallScreenPoster();
                 
            };

            
                 
            var posterMaker = new poster();
            posterMaker.posterChoose(1,3);
            return posterMaker;             //返回实例；
            
            

            

    }
             
    )



