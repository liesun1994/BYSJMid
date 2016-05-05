<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$car_num=$_REQUEST['car_num'];
$owner_name=$_REQUEST['owner_name'];
$owner_tel=$_REQUEST['owner_tel'];
addCar($car_num, $owner_name, $owner_tel);