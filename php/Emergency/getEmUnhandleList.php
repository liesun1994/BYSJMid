<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$page=$_REQUEST['page'];
$limit=$_REQUEST['limit'];
getEmUnhandleList($page,$limit);