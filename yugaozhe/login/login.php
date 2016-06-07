<?php

require ("../etc/configuration.php");		//连接数据库；
//验证登录；

session_start() ; 

function cookie_session($key,$value,$time){
	for ($i=0; $i <count($key); $i++) {
		$key_name = $key[$i]; 
		setcookie($key_name, $value[$key_name], $time);
		$_SESSION[$key_name]=$value[$key_name];
	};
	

};

if ($_POST['action']=='logIn'){
		$userName =htmlspecialchars($_POST['userName']);
		$passWord = htmlspecialchars($_POST['passWord']);
		$user = array();
		$like = array();
		$logInState =array();
	    $query = "select USER_ID,USER_NAME,AVATAR_PATH,SIGN,COUNT(a.ARTICLE_ID) AS COUNT_ARTICLE from user,article a where USER_NAME='$userName' and PASS_WORD='$passWord' limit 1;";
	    $query.= "SELECT * FROM (SELECT t.ARTICLE_ID as aid ,t.USER_ID FROM table_like t WHERE t.USER_ID=(SELECT USER_ID FROM `user` WHERE USER_NAME='$userName' and PASS_WORD='$passWord')) as t1 LEFT JOIN article as t2 ON t2.ARTICLE_ID=t1.aid 
			WHERE t2.ARTICLE_ID is NOT NULL;";
	    $result = db_connection($query);
	    while($row = mysqli_fetch_array($result[0],MYSQLI_ASSOC)){  
  //用户数据及文章数量；
		    array_push($user, array('userId' => $row['USER_ID'] , 'avatarPath' => $row['AVATAR_PATH'], 'userName' => $row['USER_NAME'], 'sign' => $row['SIGN'],
		    	'countArticle' => $row['COUNT_ARTICLE']));  
	    }
	    while($row = mysqli_fetch_array($result[1],MYSQLI_ASSOC)){  
  //用户喜欢的文章的数据
		    array_push($like, array('articleId' => $row['ARTICLE_ID'], 'trailerPath' => $row['TRAILERIMG_PATH']));  
	    }
//user cookie
	    $key = array("userId","avatarPath","userName","sign","countArticle");
	    $value = $user[0];
	    $time =time()+3600*3;//cookie3小时过期
	    cookie_session($key,$value,$time); 

		array_push($logInState, array('state' => 'in'));
		echo json_encode(array("logInState" => $logInState));
    exit; 
};

//检查是否处于登录状态；	
if($_POST['action']=='checkLogIn'){

	 $logInf = array();

	 if(isset($_SESSION['userId'])){
	 		echo json_encode(array("logInf" => $_SESSION));
	    	
	    	exit; 
	 }else{
	 		if(isset($_COOKIE['userId'])){
	 			echo json_encode(array("logInf" => $_COOKIE));
		 		
		    	exit; 
	 		}else{
	 			$query = "select COUNT(a.ARTICLE_ID) AS COUNT_ARTICLE from article a";
    			$result = db_connection($query);

    			while($row = mysqli_fetch_array($result[0],MYSQLI_ASSOC)){  
				    //登录成功
				    array_push($logInf, array('state' => 'out','countArticle' => $row['COUNT_ARTICLE']));  
			    }
		    	echo json_encode(array("logInf" => $logInf[0]));
		    	exit; 
	 		}
	 }
};
if($_POST['action']=='logOut'){
	session_destroy();
	setcookie('userId',"");
	echo json_encode(array("logInf" => "out"));
	exit;
}

