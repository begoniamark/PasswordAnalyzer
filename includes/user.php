<?php
class users
{
    public function fetch_data($username,$password)  {
        global $pdo;
        $query=$pdo->prepare("select *,Concat_WS(' ' ,FirstName,Surname) as name from users where username=? and password=?");
		$query->bindValue(1,$username);
		$query->bindValue(2,$password);
		$query->execute();
		return $query->fetch();
	}
}
?>