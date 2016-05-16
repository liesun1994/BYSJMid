<?php
header("Content-Type: text/html;charset=utf-8");
include '../appmysql.php';
$user_name=$_POST['user_name'];
$user_password=$_POST['user_password'];
AuserLogin($user_name, $user_password);
