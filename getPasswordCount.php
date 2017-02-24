<?php

    include_once('includes/connection.php');
    $password = $_GET['password'];
	$query=$pdo->prepare("SELECT * from passwords where password=?");
    $query->bindValue(1,$password);
    $query->execute();
    $num=$query->rowCount();

  	echo json_encode($num);
 ?>	 