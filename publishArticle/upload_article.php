<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/2/1
 * Time: 17:06
 */

require ("../etc/configuration.php");

$cover_path=$root."\upload\poster\\";             //确定上传的封面存储的文件夹；html页面img无法显示此路径；
$stored_path="upload/poster/";
date_default_timezone_set('PRC');   /*设置本地时间默认格林威治*/
if(
    (
        ($_FILES['cover']["type"]=="image/gif")||($_FILES['cover']["type"]=="image/jpeg")

    )
    &&($_FILES["cover"]["size"]<1000000)
){
    if($_FILES["cover"]["error"]>0){}
    else{
        $file_name=$_FILES['cover']['name'];
        $type = ".".end(explode(".", $file_name));
        if (file_exists("../upload/poster/".$file_name)){
            echo $file_name."文件已存在";
        }else{

            $file_name=date("Y").date("m").date("d").date("H").date("i").date("s").mt_rand(100, 999).$type;
            $cover_path.=$file_name;
            /*上传以中文命名的文件 会上传失败*/
            if(move_uploaded_file($_FILES['cover']['tmp_name'],iconv("UTF-8", "gb2312", $cover_path))){
                echo '上传文件成功';}
        //    move_uploaded_file($_FILES['cover']['tmp_name'],$cover_path);

        };
        $stored_path.=$file_name;
    }
}
if($_POST) {
    $movie_name = htmlspecialchars($_POST['movie_name']);
    echo $movie_name;
   // $introduce = $_POST["introduce"];

    $query = "INSERT INTO movie(MOVIE_NAME, TRAILERIMG_PATH) VALUES ('$movie_name', '$stored_path');
             INSERT INTO article(MOVIE_NAME, TRAILERIMG_PATH,MOVIE_ID) VALUES ('$movie_name', '$stored_path',(SELECT max(MOVIE_ID) FROM MOVIE ))";
    db_connection($query);

}
echo date('H');






