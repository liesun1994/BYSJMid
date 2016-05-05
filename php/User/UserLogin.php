<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$user_name=$_REQUEST['user_name'];
$user_password=$_REQUEST['user_password'];
userLogin($user_name, $user_password);
