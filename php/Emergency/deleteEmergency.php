<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$em_id=$_REQUEST['emergency_id'];
deleteEmergency($em_id);
