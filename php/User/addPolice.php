<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$user_name=$_REQUEST['user_name'];
$user_realname=$_REQUEST['user_realname'];
$user_tel=$_REQUEST['user_tel'];
$user_tips=$_REQUEST['user_tips'];
addUser($user_name, $user_realname, $user_tel, 1, $user_tips);
