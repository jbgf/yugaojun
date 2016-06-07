<?php
require ("../etc/configuration.php");		//连接数据库；
if ($_POST['action'] == 'addComment'){
	
	$articleId = $_POST['articleId'];
    $comment = htmlspecialchars($_POST['comment'],ENT_QUOTES);  //存入英文',<>;
    $userId =$_POST['userId'];

    $query ="INSERT INTO comment(ARTICLE_ID,COMMENT,USER_ID,COMMENT_TIME) VALUES ('$articleId', '$comment' ,'$userId',now())";
    db_connection($query);

    echo json_encode(array("addComment" => $userId));
    exit;

};
if ($_POST['action'] == 'getComment'){
    
    $articleId = $_POST['articleId'];
    
    $query ="SELECT c.COMMENT,c.USER_ID,C.COMMENT_TIME,u.AVATAR_PATH,u.SIGN,u.USER_NAME FROM `comment` AS c,`user` AS u WHERE u.user_id = c.user_id AND ARTICLE_ID = $articleId;";
    $result = db_connection($query);

    $comment = array();
    while ($row = mysqli_fetch_array($result[0], MYSQLI_ASSOC)) {
        array_push($comment, array('comment' => $row['COMMENT'], 'commentTime' => $row['COMMENT_TIME'],'userId' => $row['USER_ID'],'avatarPath' => $row['AVATAR_PATH'],'sign' => $row['SIGN'],'userName' => $row['USER_NAME']));
    };

    echo json_encode($comment);
    exit;

};
