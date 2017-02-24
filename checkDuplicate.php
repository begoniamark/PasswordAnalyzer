<?php

    include_once('includes/connection.php');
    $password = $_GET['password'];
	$query=$pdo->prepare("SELECT Count(password) as count from passwords where password=?");
    $query->bindValue(1,$password);
    $query->execute();
    $result=$query->fetch();

    echo json_encode($result);
    
 ?>	 