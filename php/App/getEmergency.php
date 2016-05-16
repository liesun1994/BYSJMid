<?php
header("Content-Type: text/html;charset=utf-8");
include '../appmysql.php';
$access_token=$_POST['access_token'];
getEm($access_token);
