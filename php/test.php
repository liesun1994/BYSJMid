<?php
header("Content-Type: text/html;charset=utf-8");
include 'appmysql.php';
//include 'App/getEmergency.php';
/*$array=array(
	'car_num'=>'GN-8888',
	'owner_name'=>'王先生',
	'owner_tel'=>'18362894600',
	'sde'=>array('id'=>1123)
);*/
$array=array(
	'car_id'=>13,
	'owner_name'=>'王先生',
	'owner_tel'=>'18362894600',
);
$json=json_encode($array);
//print_r($json);
/*echo $json;
$arr1=json_decode($json);
echo $arr1->{"car_num"}; //获取一层json数据
echo $arr1->{"sde"}->{"id"};
//addCar($json);*/
//echo addCar($json);
/*DBOpen();
$sql="insert into CAR_INFO(car_num,owner_name,owner_tel) values('qwe','a','asd');";
mysql_query($sql);
echo mysql_affected_rows();*/
/*$m=addCar($json);
echo json_decode($m);*/
//deleteCar($json);
//getCarList(3,2);
//getCarList(0, 3);
//从第0个开始，每页两个
//getNEmById(0);
//$array=getUserList(0, 20, 1);
//echo $array;
//AuserLogin('zhouyuhao', '123456');
//echo date('Y-m-d H:i:s',time());
//getEm('123123');

 /**/  
/*function send_post($url, $post_data) {  
  
  $postdata = http_build_query($post_data);  
  $options = array(  
    'http' => array(  
      'method' => 'POST',  
      'header' => 'Content-type:application/x-www-form-urlencoded',  
      'content' => $postdata,  
      'timeout' => 15 * 60 // 超时时间（单位:s）  
    )  
  );  
  $context = stream_context_create($options);  
  $result = file_get_contents($url, false, $context);  
  
  return $result;  
}  
  
//使用方法  
$post_data = array(  
  'username' => 'stclair2201',  
  'password' => 'handan'  
);  
send_post('http://www.qianyunlai.com', $post_data); */ 
getDoneTaskList('123123');
