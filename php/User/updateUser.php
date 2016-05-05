<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$user_id=$_REQUEST['user_id'];
$user_realname=$_REQUEST['user_realname'];
$user_tel=$_REQUEST['user_tel'];
$user_tips=$_REQUEST['user_tips'];
updateUserInfo($user_id, $user_realname, $user_tel, $user_tips);
