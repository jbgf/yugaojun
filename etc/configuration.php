<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/2/16
 * Time: 15:57
 */
$root=$_SERVER['DOCUMENT_ROOT'];          
//$root=$_SERVER['DOCUMENT_ROOT']为F:\xampp\htdocs
/*$root="http://localhost/yugaozhe/";*/                //move_uploaded_file  移动到该url,会有警告；
//连接数据库函数，并查询；

function db_connection($query){
    $mysqli = new mysqli('127.0.0.1', 'jbgf', 'jbgfw1220w','yugaozhe');
	 /*$mysqli = new mysqli('qdm191148621.my3w.com','qdm191148621','jbgfw1220w','qdm191148621_db');*/
    $mysqli->query("SET NAMES utf8");           //防止中文乱码；
    
    if ($mysqli->multi_query($query)){
	    $array = array();
	    do {
	        /* store first result set */
	        if ($result = $mysqli->store_result()) {
	      /*      	if ($mysqli->more_results()) {
	           			$result->free();
	        		}*/
	        	array_push($array,$result);
	        	     		
	        };
	            
	    }while ($mysqli->next_result());
	    return $array;
	};

}
?>