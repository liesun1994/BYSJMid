<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$user_name=$_REQUEST['user_name'];
$oldpwd=$_REQUEST['oldpwd'];
$newpwd=$_REQUEST['newpwd'];
updateUserpassword($user_name, $oldpwd, $newpwd);
