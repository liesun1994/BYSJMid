<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$start=$_REQUEST['start'];
$limit=$_REQUEST['limit'];
$users=getUserList($start, $limit,2);
echo $users;
