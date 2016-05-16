<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$emid=$_REQUEST['emergency_id'];
$emergency_text=$_REQUEST['emergency_text'];
$handler_id=$_REQUEST['handler_id'];
$handler_text=$_REQUEST['handler_text'];
updateEmergency($emid, $emergency_text, $handler_id, $handler_text);
