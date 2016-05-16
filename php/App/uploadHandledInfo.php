<?php
header("Content-Type: text/html;charset=utf-8");
include '../appmysql.php';
$access_token=$_POST['access_token'];
$emergency_id=$_POST['emergency_id'];
$result_text=$_POST['handler_text'];
uploadHandledInfo($access_token,$emergency_id,$result_text);