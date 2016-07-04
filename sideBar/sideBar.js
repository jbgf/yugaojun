    define(["getData","common","poster","explore"],function(getData,common,poster,explore){
            
             sideBar= function(){
                  this.width;
                  this.options;
                  this.state = 0;
                  this.userData;
             };
            
             sideBar.prototype.ini = function(){
                  
                  var that = this;
                  var intervalGetData = setInterval(interval,500);
                  function interval(){
                    
                    if(getData.userData){
                        clearInterval(intervalGetData);
                        common.deleteNull(getData.userData);
                        
                        that.userData = $.extend({}, common.userDefault, getData.userData);

                        that.background();
                        that.sideBarBuild();
                    };
                  };
 
                  
             };
             sideBar.prototype.background = function(){
                  var that = this;
/*手机浏览器的地址栏，所以屏幕高度+100*/
                  $('<div class="background"></div>').css({'height':$(window).height()+100})
                                                     .appendTo('body')
                                                     .click(function(){
                                                                that.sideBarAnimate(400,'left');
                                                                $(this).toggle();
                                                        });
                  $(document).on('click','#toggleBtn',function(){$('.background').toggle();})
             };
             sideBar.prototype.navigation = function(){
                  var that = this;
                  $('.sideBar-content').append(
                             '<div class="home active" style="color:#2386D8;"><i  class="glyphicon glyphicon-list"></i><div>首页</div></div>'
                            +'<div class="sideBarExplore"><i style="color:#4B9E4B" class="glyphicon glyphicon-screenshot"></i><div>发现</div></div>'
                            +'<div class="likeList"><i style="color:#DA4444" class="glyphicon glyphicon-heart"></i><div>喜欢</div></div>'
                       /*     +'<div><i styele="color:#1DC6EE" class="glyphicon glyphicon-comment"></i><div>私信</div></div>'*/
                        );
                  $(document).on('click','.sideBar-content>div',function(){
                            var divClass= $(this).attr("class");
                            var index = $(this).index();
                            var userId = that.userData.userId;
                            //隐藏背景；
                            $(".background").hide();
                            
                            $(this).hasClass('active')?""
                            :divClass == "home"?poster.posterChoose(poster.currentPage,poster.posterNum)
                            :divClass == "sideBarExplore"? explore.ini()
                            :divClass == "likeList" && userId ?location.href = '../html/likePage/likeMain.html'
                            :"";
                            
                            that.active($(this));
                            
                            //登录sideBar 左移；未登录跳转到登录页面；
                            
                            userId?that.sideBarAnimate('fast','left')
                            :index !== 0 && index !== 1?location.href="../login/login.html"
                            : that.sideBarAnimate('fast','left')
                                                    
                                 
                        });
             }
             sideBar.prototype.sideBarBuild = function(){
                        var that = this;
                        $('#sideBar')
                        .css({
                          'width':'80%',
                          'height':$(window).height()+100, /*手机浏览器的地址栏，所以屏幕高度+100*/
                          'position':'fixed'                 
                          
                          
                          
                        })
                        .append('<div class="sideBar-header"></div>')
                        .append('<div class="sideBar-content"></div>')
                        .append('<div class="sideBar-footer"></div>');
                        
                        that.navigation();
                        
                        // 初始化位置；
                        this.width = $('#sideBar').width();
                        $('#sideBar').css({
                          'left':-this.width+'px'
                        });
//看details的时候清空active
                        $(document).on('click','.articleMask',function(){
                              that.active();
                        })
                        
            };

            //动画
            sideBar.prototype.sideBarAnimate = function(time,direction){
                    var that = this;

                    direction = direction == 'left'?'-=':
                                direction == 'right'?'+=':'';
                          $('#sideBar').animate(
                              {
                                left:direction+ that.width,

                              },
                              {
                                duration:time
                              } 
                           
                          );
                    
                    
            };
                        
            sideBar.prototype.logOut = function(){
                   
                          $.ajax({
                            url: '../login/login.php',
                            type: 'POST',
                            dataType: 'json',
                            data: {action: 'logOut'},
                            success:function(data){
                                                location.href = '../login/login.html'
                                              }
                          }); 
                        
                    
            };
            sideBar.prototype.insertData = function(){
                    this.state = 1;
                    var that = this;
                    var userData = that.userData;  
                    
//sideBar-header
                    $('.sideBar-header')
                     .css({
                          'background-image':'url'+'('+getData.articleData[0].trailerPath+')',
                          'background-size':'100% 100%',
                          
                          })
                     
                     .append('<div class="avatarZone">'
                                  +'<img src='+userData.avatarPath+'>'
                                  +'<i id="gateIcon" class="glyphicon"></i>'
                            +'</div>')
                     .append('<div class="signZone">'
                                  +'<div class="userName">'+userData.userName+'</div>'
                                  +'<div class="sign">'+userData.sign+'</div>'
                            +'</div>')
                     .append('<div class="mask"></div>');

//sidbar-header，注销logOut
                     getData.userData.userId ?
                         $('#gateIcon').addClass('glyphicon-log-out')
                                       .click(function() {
                                            that.logOut();
                                       }):
                         $('#gateIcon').addClass('glyphicon-log-in')
                                       .click(function(){
                                                          location.href="../login/login.html"
                                        });
//设置sidebar的蒙版样式；
                    var bgColor=common.randomColor(175,80);        //随机颜色；     
                    $(".sideBar-header .mask").css({
                          'background-color':'#'+bgColor,
                          'opacity':0.6,
                          'height':$('.sideBar-header').height()
                    });
                                        
                    
              
            };
            sideBar.prototype.active = function(element){
                        if(element == null){$('.sideBar-content>div').removeClass('active')
                                                                     .find('i').siblings('div').css({'color':'#000'})   }
                        else{
                            //设置sideBar-content的背景，高亮，颜色；
                            element.addClass('active').siblings('div').removeClass('active')
                                                                  .children('div').css({'color':'black'}).end().end()
                               .children('div').css({
                                    color:element.children('i').css('color')
                               });
                        }
            
            };
                   
            
            var sideBarNew = new sideBar;
                sideBarNew.ini();
                $(document).on('click','#toggleBtn',function(){
                   
                 //    $('#sideBar').css({'height':$(window).height()+'px'});
                    if(sideBarNew.state == 0)sideBarNew.insertData();
                      sideBarNew.sideBarAnimate('fast','right'); 
                })
                
            return sideBarNew;
    })



