<?php

require ("../etc/configuration.php");

if($_POST){
    $userId = $_POST['userId'];
    $articleId = $_POST['articleId'];
};

if($_POST["action"]=="like") {

    $query = "INSERT INTO table_like(USER_ID,ARTICLE_ID) VALUES ('$userId ','$articleId')";
    db_connection($query);
};
if($_POST["action"]=="delete") {
    
   
    $query = "delete from table_like where USER_ID=$userId and ARTICLE_ID=$articleId";
    db_connection($query);

}






