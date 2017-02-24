<?php

    include_once('includes/connection.php');
	
	$query=$pdo->prepare("SELECT COUNT(*) AS Total FROM passwords"); 
    $query->execute();
    $result=$query->fetch();
    echo json_encode($result['Total']);
    
?>
