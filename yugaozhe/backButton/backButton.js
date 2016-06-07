define(['head','poster','details','explore','sideBar','common'],function(head,poster,details,explore,sideBar,common){
        backButton = function(){
            
        };
        backButton.prototype.ini = function(){

                this.explore();
                this.sideBar();

                this.listenHistory();
        };
        backButton.prototype.listenHistory = function(){
                
                        window.onpopstate = function(){
                    /*处理侧边栏的激活*/
                            common.page = location.href.split("?")[1] ;
                            if(common.page =="home")sideBar.active($('.home'));
                            if(common.page == "details")sideBar.active();
                        };
        };
        backButton.prototype.explore = function(){
                var that = this;
                
                $(document).on("click",".explore .exit",function(){
                        that.listenHistory();
                        exploreUnset();
                        
                        
                })
                var exploreUnset = function(){
                        $('body').find('.explore').remove().end()
                              //   .append(explore.components)   //把detach的部分head和poster加回来
                                 .css({padding:0,'background-color':'#fff'});
                       // this.listenHistory();
                       // details.unSet();
                       
                        history.go(-1);
                        head.headCommon();
                };
                
        };
        backButton.prototype.details = function(){
                $("#details").remove();   
        };
        backButton.prototype.sideBar = function(){
                var that = this;
                $(document).on('click','.sideBar-content>div',function(){
                    if($('#details').length || $('#details').length > 0)that.details();
                        
                })
        }
        var backButtonNew = new backButton;
        backButtonNew.ini();
        return backButtonNew;
})
