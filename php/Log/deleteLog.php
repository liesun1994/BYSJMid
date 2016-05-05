<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$log_id=$_REQUEST['log_id'];
deleteLog($log_id);
