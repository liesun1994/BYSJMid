<?php
header("Content-Type: text/html;charset=utf-8");
include '../mysql.php';
$car_id=$_POST['car_id'];
$car_num=$_POST['car_num'];
$owner_name=$_POST['owner_name'];
$owner_tel=$_POST['owner_tel'];
updateCar($car_id, $car_num, $owner_name, $owner_tel);
