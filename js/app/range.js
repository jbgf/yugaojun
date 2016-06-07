/*根据“热度”排名*/

define(function(){

    $(function(){
        var range= function(){
            $("#main #range").append(
                                        '<div id="rangeTitle" ><h2>排名</h2></div>'
                                        +'<div id="rangeContent" ></div>'
                               )
            getRange();

        }
        function getRange(){
            $.ajax({
                    url:"lib/range.php",        /*url:"lib/range.php?action=getRange",type:"get"不用data*/
                    data:{action:"getRange"},
                    type:"post",
                    dataType:"json",
                    success:function(json){

                        if(json.article.length>0){
                            $.each(json.article,function(){
                                $("#rangeContent").append(

                                        '<div class="row rangeRow" >'
                                            +'<div class="col-xs-3"><img src="'+this['path']+'"></div>'
                                            +'<div class="col-xs-9">'+this["name"]+'</div>'
                                        +'</div>'
                                )
                            })
                        }
                    }
            })
        }
        return {range:range()}

    })


})




