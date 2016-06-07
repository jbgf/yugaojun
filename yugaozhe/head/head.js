/**
 * Created by Administrator on 2016/1/26.
 */
    
    define(function(){

            var head= function(){
                
               this.isBigScreen=$(window).width()>768;
            };
            head.prototype.ini = function(){
                $("#head").css({"overflow":"visible"})
            };
            head.prototype.headCommon = function(){
                this.ini();
                var bigScreenNav=
                        '<div class="container" style="width:100%;border-bottom:1px solid #DCDADA;">'
                                +'<div class="row" >'
                                    +'<div class="col-xs-12" style="padding-top:1em;">'
                                                    +'<div style="float:left;">'
                                                        +'<img src="head/l.jpg" class="img-circle" style="bottom:5px;height:50px;width:50px;">'
                                                    +'</div>'
                                    +'</div>'
                                +'</div>'
                                
                                +'<div class="row" >'
                                    +'<div class="col-xs-12" >'
                                        +'<div id="nav" class="pull-right" >'
                                                            +'<ul style="list-style:none;">'
                                                                +'<li><a href="../login/login.html">Log in</a>or</li>'
                                                                +'<li><a href="">Sign up</a></li>'
                                                            +'</ul>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                        +'</div>',
                   smallScreenNav=
                        '<nav  class="navbar " >'
                             //高度为50=margin+padding+font-size等所有高度加起来； 
                                  +'<button id="toggleBtn" type="button" class="navbar-toggle" >'
                                    +'<span class="icon-bar" ></span>'
                                    +'<span class="icon-bar" ></span>'
                                    +'<span class="icon-bar" ></span>'
                                    +'<span class="icon-bar" ></span>'
                                  +'</button>'
                                  
                /*                  +'<div class="dropdown" style="display:inline;">'
                                      +'<button id="switchButton" class="navbar-toggle" style="padding:6px 0;float:none;border:transparent;font-size:20px;font-weight:bold;color:#fff;" data-toggle="dropdown" >'
                                            +'切换风格 '
                                            +'<span class="caret"></span>'
                                      +'</button>'
                                      +'<ul class="dropdown-menu" >'
                                            +'<li><a href="#">Action</a></li>'
                                            +'<li><a href="#">Another action</a></li>'
                                            +'<li><a href="#">Something else here</a></li>'
                                            +'<li role="separator" class="divider"></li>'
                                            +'<li><a href="#">Separated link</a></li>'
                                      +'</ul>'
                                  +'</div>'

                                  +'<button type="button" class="navbar-toggle" style="margin-right:0;border:transparent;padding:6px 10px 2px">'
                                    +'<span class="glyphicon glyphicon-search" style="color:#fff;font-size:24px;"></span>'
                                    
                                  +'</button>'*/
                                
                            +'</nav>';
                
                var nav=this.isBigScreen?bigScreenNav:smallScreenNav;
                
                $("#head").css({position:"static"}).empty().append(nav);
                
                $("#toggleBtn").css({
                        'float':'left',
                        'border':'transparent'
                        })
                    .children('.icon-bar').css({
                        'background-color':'#fff'
                        });
            };
           
            headNew = new head;
            return headNew;
    })



