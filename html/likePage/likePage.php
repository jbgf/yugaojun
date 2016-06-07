<?php

require ("../../etc/configuration.php");		//连接数据库；
//验证登录；

if ($_POST['action']=='getLikeData'){
		
		$userId = $_POST['userId'];
		$like = array();
	    
	    $query= "SELECT * FROM (SELECT t.ARTICLE_ID as aid ,t.USER_ID FROM table_like t WHERE t.USER_ID='$userId') as t1 LEFT JOIN article as t2 ON t2.ARTICLE_ID=t1.aid WHERE t2.ARTICLE_ID is NOT NULL;";
	    $result = db_connection($query);
	    
	    while($row = mysqli_fetch_array($result[0],MYSQLI_ASSOC)){  
  //用户喜欢的文章的数据
		    array_push($like, array('articleId' => $row['ARTICLE_ID'], 'trailerPath' => $row['TRAILERIMG_PATH']));  
	    }
	    echo json_encode(array("likePage" => $like));
	    

    exit; 
};



