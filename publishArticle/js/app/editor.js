/**
 * Created by Administrator on 2016/2/1.
 */
define(function(){

    $(function(){
        var editor= function(){
            $("#publishArticle").append(
            '<form  class="form-horizontal col-lg-6" action="upload_article.php" method="POST" enctype="multipart/form-data">'
        /*电影名字*/
                    +'<div  class="form-group">'
                        +'<label  >电影名字:</label>'

                        +'<input id="movie_name" name="movie_name" type="text" class="form-control"  placeholder="movie name">'

                    +'</div>'
        /*封面图片*/
                    +'<div class="form-group">'
                        +'<label  >上传封面图片:</label>'

                        +'<input id="cover"  name="cover" type="file" >'

                    +'</div>'
        /*编辑文本*/
                    +'<div class="form-group">'
                          +'<label  >编辑文章:</label>'
                          +'<textarea id="article" class="form-control" name="introduce"></textarea>'
                    +'</div>'
                    +'<div  class="form-group">'
                          +'<button id="submit"  class="btn btn-primary pull-right"  type="submit">提交</button>'
                    +'</div>'
            +'</form>').addClass('row');

            /*文本编辑器summernote初始化***************************************************************/
            $(".container #article").summernote({
                    height:200,
                    lang: 'zh-CN',
                    focus: true,
            });
             
            

        };

        return {editor:editor()}
    })

    


});