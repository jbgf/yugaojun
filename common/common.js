define(function(){
        common = function(){
            this.windowHeight= $(window).height()+100; /*手机浏览器的地址栏，所以屏幕高度+100*/
            this.articleData="";
            this.page="";
            this.background;
            this.userDefault = {
                  state:"out",
                  userId:"",
                  avatarPath:'/common/pic/default.jpg',
                  userName:'',
                  sign:''

             }
        };
        common.prototype.deleteNull = function (data){
            $.each(data,function(index,value){
                  if(value==null)delete data[index];
            })

        };
                        
                        
        //设置随机颜色；
        common.prototype.randomColor = function(start,range){

                function random(num){
                    return num=start+Math.round(Math.random()*range);    //0-255有时产生浓色；
                };
                var r=random(r),
                    g=random(g),
                    b=random(b);
                var hex = [
                r.toString( 16 ),
                g.toString( 16 ),
                b.toString( 16 )
                ];
                $.each( hex, function( nr, val ) {
                if ( val.length === 1 ) {                    
                hex[ nr ] = "0" + val;
                }
                });
                return hex.join( "" ).toUpperCase();          
                                  
        };
        //设置背景；
        common.prototype.backFixed= function(module){
              var that = this;
              if(module=="show"||!module){
                   $('.backFixed').remove();              
                   $('body').append('<div class="backFixed" >'
                                          +'<i class="rotateRefresh glyphicon glyphicon-refresh"></i>'
                                    +'</div>');
                   that.background = $('.backFixed');                                                            
              }
              if(module=="hide")$('.backFixed').fadeOut();
              if(module=="stop")$('.backFixed i').remove();   
                      
        };
        common.prototype.historyRecord = function(data){
            
            history.pushState({page:data}, "", "?"+data);
           
            
            window.onpopstate = function(){
                 this.page = location.href.split("?")[1] ;
                 
                
            };
          

            
           
        };
        var commonNew = new common;
        return commonNew;
})
