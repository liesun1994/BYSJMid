<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$car_id=$_REQUEST['car_id'];
deleteCar($car_id);