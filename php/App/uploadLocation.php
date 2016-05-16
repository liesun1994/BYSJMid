<?php
header("Content-Type: text/html;charset=utf-8");
include '../appmysql.php';
$access_token=$_POST['access_token'];
$location=$_POST['location'];
$longitude=$_POST['longitude'];
$latitude=$_POST['latitude'];
uploadLocation($access_token,$location,$longitude,$latitude);