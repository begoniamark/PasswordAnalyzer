<?php

    include_once('includes/connection.php');

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $password = $request->password;
    $strengthFlag = $request->strengthFlag;

	$query=$pdo->prepare("SELECT * FROM passwords WHERE password= ?");
    $query->bindValue(1, $password);
    $query->execute();
    $num=$query->rowCount();
    	$query2=$pdo->prepare("INSERT into passwords Values(null,?,?,Now())");
    	$query2->bindValue(1,$password);
 		$query2->bindValue(2,$strengthFlag);
    	$query2->execute();
	if($num>=1){
		
	}
 ?>	 