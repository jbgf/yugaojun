<?php

require ("../etc/configuration.php");		//连接数据库；
	if ($_POST['action']=='getActorData'){
	
	$actor = array();
    $query = "drop procedure if exists dowhile;drop TABLE if exists random;
			  CREATE PROCEDURE dowhile()
			  BEGIN
			  DECLARE v1 INT DEFAULT 3;
					DECLARE v2 INT ;
					CREATE TEMPORARY TABLE random(id INT(11));
				  WHILE v1 > 0 DO
						
						SET v2 = ROUND(RAND() *((SELECT	MAX(actor_id) FROM `actor`) - (SELECT	MIN(actor_id)	FROM `actor`))+ (SELECT	MIN(actor_id)	FROM `actor`));
						IF v2 NOT IN (SELECT id FROM random) THEN
							INSERT INTO random(id) VALUES(v2);
							SET v1 = v1 - 1;
						END IF;
				  END WHILE;
				END;
				CALL dowhile;
				SELECT * FROM	`actor` AS t1 RIGHT JOIN random t2 ON t1.ACTOR_ID = t2.id ;"; 
    $result = db_connection($query);
    
    while($row = mysqli_fetch_array($result[0],MYSQLI_ASSOC)){  
	    //登录成功
	    array_push($actor, array('avatar' => $row['ACTOR_AVATAR']));  
    }
    echo json_encode($actor);
    exit; 
   
};

?>
