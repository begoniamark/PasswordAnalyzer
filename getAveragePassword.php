<?php

    include_once('includes/connection.php');

	$query=$pdo->prepare("SELECT PasswordStrength, COUNT(*) AS `Count` FROM passwords GROUP BY PasswordStrength");
    $query->execute();
    $result=$query->fetchAll();

    foreach ($result as $row) { 
    	echo json_encode($row['1']) . ',';
    } 

		

 ?>	               


                                