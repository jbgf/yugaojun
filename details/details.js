    define(["comment","common","getData","poster","sideBar","head"],function(comment,common,getData,poster,sideBar,head){
            details = function(){

            };
            details.prototype.ini = function(){
                var that = this;
                
                
                function build(){
                    //文档高度就是第一页面的高度？poster
                    
                    $('body').append('<div id="details" ></div>');
                    var details = $("#details");
                    details.append('<div class="navDetails"></div>');
                    
                };
//广告
                function ad(details){
                    
                    details.append('<div class="ad"></div>');
                    var ad = $('.ad');
                    ad.append('<span>广告Ad</span>'
                             +'<div class="close">X</div>')
                       .on('click','.close',function(){
                                ad.remove();
                                findLast(details);
                        });
                }
                function findLast(details){
                    
                    var last = details.children('div').last();
                    last.addClass('last');
                    details.css({"padding-bottom":last.css('height')});
                    
                }
//触发details页面，设置样式；
                $(document).on('click','.articleMask',function(){
                    build();
                    var details = $("#details");
                    that.navDetails();

                    ad(details);
                    findLast(details);
                    common.background.show();

                    var userInf = getData.userData;
                    var index = $(this).index('.articleMask');
                    var detailsData = $.extend({}, getData.articleData[index], userInf);
                    
                    that.show(detailsData)
                    
                });
            };
            details.prototype.navDetails = function(){
                    
                    var nav =
                        '<nav  class="navbar " >'
                             //高度为50=margin+padding+font-size等所有高度加起来； 
                                  +'<button id="toggleBtn" type="button" class="navbar-toggle" >'
                                    +'<span class="icon-bar" ></span>'
                                    +'<span class="icon-bar" ></span>'
                                    +'<span class="icon-bar" ></span>'
                                    +'<span class="icon-bar" ></span>'
                                  +'</button>'

                                  +'<button type="button" class="navbar-toggle" style="margin-right:0;border:transparent;padding:6px 10px 2px">'
                                    +'<span class="glyphicon glyphicon-search" style="color:#fff;font-size:24px;"></span>'
                                    
                                  +'</button>'
                                
                      +'</nav>';
                    $(".navDetails").append(nav)
                                    .css({
                                          'position':'fixed',
                                          'width':'100%',
                                          'overflow':'hidden'
                                          })
                                    .children('nav')
                                    .css({'background-color':'transparent',
                                          'border':'0',
                                          'margin-bottom':'0'
                                        })
                                    .children('#toggleBtn')
                                    .css({
                                        'float':'left',
                                        'border':'transparent'
                                        })
                                    .children('.icon-bar').css({
                                        'background-color':'#fff'
                                        });
                    
            };
            details.prototype.show = function(data){
                var that = this;
                common.historyRecord('details');
                var commentNum =data.commentCount !== null ?data.commentCount+' 条评论':'影视评论';
                var catagrory = data.catagrory||"",
                    introduce =data.introduce||"";
                    posterPath = data.posterPath?data.posterPath:data.trailerPath;

                //$('#poster').empty()
                    $("#details").append('<img class="trailer" style="height:'+$(window).height()/3+'px" src='+data.trailerPath+'>'
                                        +'<div class="name">'
                                              +'<div class="col-xs-9">'+data.name+'</div>'
                                              +'<div class="col-xs-3" style="padding-top:14px;padding-bottom:14px;">'
                                                    +'<i class="glyphicon glyphicon-bookmark"></i>'
                                              +'</div>'
                                        +'</div>'
                                        +'<div class="catagrory">'+catagrory+'</div>'
                                        +'<div class="introduce">'+introduce+'</div>'
                                        
                                        +'<div class="posterZone container">'
                                            +'<div class="row">'
                                                +'<div class="col-xs-5 left"><img src='+posterPath+'></div>'
                                                +'<div class="col-xs-7 right" >'
                                                      +'<div ><i class="glyphicon glyphicon-star"></i>对其评分</div>'
                                                      +'<div ><i style="color:rgb(237,181,45);" class="glyphicon glyphicon-star"></i></div>'
                                                      +'<div ></div>'
                                                +'</div>'
                                            +'</div>'
                                        +'</div>'
                                        +'<div class="commentFront"><span>'+commentNum+'<span><i class="glyphicon glyphicon-comment"></i></div>'
                                        );
                
                 
                that.scroll();
                
                var commentFront = $('.commentFront');
                commentFront/*.css({'margin-bottom':'56px'})*/.click(function(){
                    comment.getComment(data); 
                })
                
                                         
            };

            details.prototype.scroll = function(){  
                var nav = $(".navDetails");
                var headHeight = $(".navDetails nav").height();
                var changeHeight = $("img.trailer").height()-headHeight;
                //var bgColor = $(".details .name").css("background-color");
                var moveZoneBuild = function (){
                    $("<div class='moveZone'></div>").css({
                              'background-color': 'rgb(6,103,145)',
                              'position':'absolute',
                              'top':headHeight,
                              'width':'100%',
                              'height':headHeight
                          }).appendTo(nav);
                };    
                
                //滚动条下拉到一定位置，导航条应用一些动画，恢复背景色；
                
                moveZoneBuild();
                var moveDiv = $(".moveZone");
                var state = "out";
                /*避免多次绑定动画*/
                $(document).off("scroll").on("scroll",function(){
                    
                    var scrollHeight = $(window).scrollTop();
/*决定位置的点*/                    
                    if(state == "out" && scrollHeight>changeHeight/2)
                    {
                                  moveDiv.animate(
                                  {
                                        "top":'-='+headHeight+'px',
                                  },
                                  {
                                    "duration":"fast"
                                  } 
                                  );
                              state = "in"
                             // console.log(state+","+scrollHeight+","+changeHeight)                    
                    }
                    else if(state == "in" && scrollHeight>changeHeight*3/2){
                          moveDiv.stop(true,true);
                          
                    }
                    else if(state == "in" && scrollHeight < changeHeight/2)
                    {
                              
                              moveDiv.animate({
                                      "top":'-='+headHeight+'px'
                              },
                              {
                                duration:'fast',
                                complete:function(){
                                    $(this).css({"top":headHeight});
                                    
                                }
                              });
                              
                              state = "out";
                            
                    };
                })
            };
            
            var detailsNew = new details;
            detailsNew.ini();
            return detailsNew;
             
    })



