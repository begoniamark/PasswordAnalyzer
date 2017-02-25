<?php
try{
$pdo=new PDO('mysql:host=localhost;dbname=password_analyzer','root','');
}
catch(PDOException $e)
{
	exit('Database error.');
}
?>
