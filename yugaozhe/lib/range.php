<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/1/28
 * Time: 22:49
 */
require ("../etc/configuration.php");		//连接数据库；
if ($_POST['action'] == 'getRange'){
    $query = "SELECT MOVIE_NAME, COVER_PATH, INTRODUCE FROM article ";
    $result = db_connection($query);

    $article = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        array_push($article, array('name' => $row['MOVIE_NAME'], 'path' => $row['COVER_PATH'], 'introduce' => $row['INTRODUCE'] ));
    }
    echo json_encode(array("article" => $article));
    exit;
};

