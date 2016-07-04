<?php
require ("../etc/configuration.php");		//连接数据库；
if ($_POST['action'] == 'getPoster'){
	$pn = $_POST['posterNum'];
	$start = ($_POST['currentPage']-1)*$pn;			//当前页面;

	if(isset($_POST['userId'])){
        $userId = $_POST['userId'];
        $query ="drop TABLE if exists COMMENT_AID;
             CREATE TEMPORARY TABLE COMMENT_AID
             (SELECT C.ARTICLE_ID,COUNT(C.`COMMENT`) AS COMMENT_COUNT FROM `comment` C GROUP BY C.ARTICLE_ID);
             SELECT t1.USER_ID as LIKE_USER_ID,t2.* FROM
             (SELECT * from table_like WHERE USER_ID = $userId) as t1 RIGHT JOIN  /*LIKE*/
             (SELECT A.* ,C.COMMENT_COUNT FROM article A LEFT JOIN 
             COMMENT_AID C /*评论条数*/
             on A.ARTICLE_ID=C.ARTICLE_ID ORDER BY A.ARTICLE_ID DESC LIMIT $start,$pn) as t2
             ON t2.ARTICLE_ID= t1.ARTICLE_ID ;";
    }else{
        $query = "drop TABLE if exists COMMENT_AID;
            CREATE TEMPORARY TABLE COMMENT_AID
            (SELECT C.ARTICLE_ID,COUNT(C.`COMMENT`) AS COMMENT_COUNT FROM `comment` C GROUP BY C.ARTICLE_ID);
            (SELECT A.* ,C.COMMENT_COUNT FROM article A LEFT JOIN 
            COMMENT_AID C /*评论条数*/
            on A.ARTICLE_ID=C.ARTICLE_ID ORDER BY A.ARTICLE_ID DESC LIMIT $start,$pn)";
    }
    
    
    $result = db_connection($query);

    $poster = array();
    while ($row = mysqli_fetch_array($result[0], MYSQLI_ASSOC)) {
        if ($row['COMMENT_COUNT']) {
            $comment_count=$row['COMMENT_COUNT'];
        }else{
            $comment_count =0;
        };
        if (isset($row['LIKE_USER_ID'])) {
            $likeUserID=$row['LIKE_USER_ID'];
        }else{
            $likeUserID =null;
        };
        array_push($poster, array('name' => $row['MOVIE_NAME'],'trailerPath' => $row['TRAILERIMG_PATH'], 'posterPath' => $row['POSTER_PATH'], 'movieId' => $row['MOVIE_ID'] ,'articleId' => $row['ARTICLE_ID'],'catagrory' => $row['CATAGRORY'],'introduce' => $row['INTRODUCE'],'commentCount' => $comment_count,
            'likeUserID' => $likeUserID));
    };
    echo json_encode(array("poster" => $poster));
    exit;

};
