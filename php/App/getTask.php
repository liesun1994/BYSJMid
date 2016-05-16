<?php
header("Content-Type: text/html;charset=utf-8");
include '../appmysql.php';
$token=$_POST['access_token'];
$emergency_id=$_POST['emergency_id'];
getTask($token,$emergency_id);