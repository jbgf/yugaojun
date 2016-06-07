<?php
require ("../etc/configuration.php");		//连接数据库；
	 if($_POST["action"] == "checkUserName"){
	 		$userName =htmlspecialchars($_POST['userName']);
			
			$userNameState =array();
		    $query = "select * from user where USER_NAME='$userName'";
		    
		    $result = db_connection($query);
		    while($row = mysqli_fetch_array($result[0],MYSQLI_ASSOC)){  
	  //用户数据及文章数量；
			    array_push($userNameState, array('userId' => $row['USER_ID']));  
		    }
		    if(count($userNameState)==0){
		    	echo "no";
		    }else{echo "yes";}
			
	    exit; 
	 }
	 if($_POST["action"] == "signUp"){
	 		$userName =htmlspecialchars($_POST['userName']);
	 		$passWord = htmlspecialchars($_POST['passWord']);
	 		$email = htmlspecialchars($_POST["email"]);
		    $query = "INSERT INTO `user` (USER_NAME,PASS_WORD,EMAIL)VALUES('$userName','$passWord','$email')";
		    
		    db_connection($query);
		    
	    exit; 
	 }