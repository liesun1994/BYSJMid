<?php
header("content-type:text/html;charset=utf-8");
error_reporting( E_ALL&~E_NOTICE );//我们只要在乎除NOTICE级别外的其它错误就行了。NOTICE级别可以不用看
function DBOpen(){
	$link = @mysql_connect("localhost:3306","root","root") or die("数据库连接错误".mysql_error());
	$res=@mysql_select_db("bysj",$link) or die("数据库连接错误".mysql_error());
	mysql_query("set names utf-8");
	mysql_set_charset('utf8');//设置数据源格式为utf8 哇哈哈哈哈
}
function DBClose(){
	mysql_close();
}
/*对user信息表的操作*/
function getUserById($id){
	DBOpen();
	$sql="select user_id,user_name,user_realname,user_tel,location,user_tips from user_info where user_id=".$id;
	$result=mysql_query($sql);
	if(mysql_affected_rows()==1){
		$rs=mysql_fetch_array($result);
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'查找成功',
			'data'=>array(
				'user_id'=>$rs["user_id"],
				'user_name'=>$rs["user_name"],
				'user_realname'=>$rs["user_realname"],
				'user_tel'=>$rs["user_tel"],
				'location'=>$rs["location"],
				'user_tips'=>$rs["user_tips"]
			)
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'查找失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
	
	DBClose();
}
function getUserList($start,$limit,$role){
	DBOpen();
	$pagenow=($start/$limit)+1;
	$sql2="select count(*) as count from user_info where org_id=".$role;
	$r=mysql_query($sql2);
	$total=0;
	while(($rr=mysql_fetch_array($r))){
		$total=$rr["count"];
	}
	$sql="call sp_page (".$pagenow.",".$limit.",' user_id,user_name,user_realname,user_tel,location,longitude,latitude,user_tips ',' user_info where org_id=".$role."',' order by user_id desc')";
	$result=mysql_query($sql);
	$count=mysql_affected_rows();
	$array=array();
	if($count>=1){
		$datas=array();
		while(($rs=mysql_fetch_array($result))){
			$data=array(
				'user_id'=>$rs["user_id"],
				'user_name'=>$rs["user_name"],
				'user_realname'=>$rs["user_realname"],
				'user_tel'=>$rs["user_tel"],
				'location'=>$rs["location"],
				'longitude'=>$rs["longitude"],
				'latitude'=>$rs["latitude"],
				'user_tips'=>$rs["user_tips"]
				);
				array_push($datas,$data);
		}
		$array=array(
			'success'=>true,
			'total'=>$total,
			'msg'=>'查找成功',
			'data'=>$datas
		);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'查找失败',
			'data'=>array()
		);
	}
	DBClose();
	return json_encode($array);
}
function addUser($user_name,$user_realname,$user_tel,$org_id,$user_tips){
	DBOpen();
	$token=time();
	$sql="insert into user_info(user_name,user_realname,user_tel,org_id,user_tips) values ('".$user_name."','".$user_realname."','".$user_tel."',".$org_id.",'".$user_tips."');";
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'添加成功',
			'data'=>array()
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'添加失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
}
function deleteUser($user_id){
	DBOpen();	
	$sql="delete from USER_INFO where user_id=".$user_id;
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'删除成功',
			'data'=>array()
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'删除失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
} 
function updateUserpassword($user_name,$oldpwd,$newpwd){
	DBOpen();
	$sql="update user_info set user_password='".md5($newpwd)."' where user_name='".$user_name."' and user_password='".md5($oldpwd)."'";
	//echo $sql;
	mysql_query($sql);
		if(mysql_affected_rows()==1){
			$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'修改成功',
			'data'=>array()
			);
			echo json_encode($array);
		}else{
			$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'修改密码失败',
			'data'=>array()
			);
			echo json_encode($array);
		}
	DBClose();
}
function updateUserInfo($id,$user_realname,$user_tel,$user_tips){
	DBOpen();
	$sql="update user_info set user_realname='".$user_realname."',user_tel='".$user_tel."',user_tips='".$user_tips."' where user_id=".$id;
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'修改信息成功',
			'data'=>array()
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'修改信息失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
}
function resetUserpwd($user_id){
	DBOpen();
	$pwd=md5('123456');
	$sql="update user_info set user_password='".$pwd."' where user_id=".$user_id;
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'重置密码成功',
			'data'=>array()
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'重置密码失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
}
function userLogin($user_name,$user_password){
	DBOpen();
	$pwd=md5($user_password);
	$sql="select * from user_info where user_name='".$user_name."' and user_password='".$pwd."'";
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'登录成功',
			'data'=>array()
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'登录失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
}

/*对emergency数据操作*/
function getEmById($id){
 	DBOpen();
	$sql="select e.emergency_id,v.user_realname,v.user_tel,v.location,v.longitude,v.latitude,e.status,e.emergency_time from emergency_info e inner join user_info v on e.victim_id=v.user_id and e.emergency_id=".$id;
	$result=mysql_query($sql);
	$rs=mysql_fetch_array($result);
	$array=array();
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'查找成功',
			'data'=>array(
				'emergency_id'=>$rs["emergency_id"],
				'user_realname'=>$rs["user_realname"],
				'user_tel'=>$rs["user_tel"],
				'location'=>$rs["location"],
				'longitude'=>$rs["longitude"],
				'latitude'=>$rs["latitude"],
				'status'=>$rs["status"],
				'emergency_time'=>$rs["emergency_time"]
			)
		);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'查找失败',
			'data'=>array()
		);
	}
	DBClose();
	return json_encode($array);
 }
function getEmList($start,$limit){
	DBOpen();
	$sql2="select count(*) as count from emergency_info";
	$r=mysql_query($sql2);
	$total=0;
	while(($rr=mysql_fetch_array($r))){
		$total=$rr["count"];
	}
	$pagenow=($start/$limit)+1;
	//echo $total;
	$sql="call sp_page (".$pagenow.",".$limit.",' e.emergency_id,e.emergency_text,e.emergency_type,v.user_realname,v.user_tel,v.location,v.longitude,v.latitude,e.status,e.emergency_time ',' emergency_info e inner join user_info v on e.victim_id=v.user_id ',' order by e.emergency_id asc');";
	$result=mysql_query($sql);
	$count=mysql_affected_rows();
	if($count>1){
		$datas=array();
		while(($rs=mysql_fetch_array($result))){
			$data=array(
				'emergency_id'=>$rs["emergency_id"],
				'user_realname'=>$rs["user_realname"],
				'user_tel'=>$rs["user_tel"],
				'location'=>$rs["location"],
				'longitude'=>$rs["longitude"],
				'latitude'=>$rs["latitude"],
				'status'=>$rs["status"],
				'emergency_time'=>$rs["emergency_time"],
				'emergency_text'=>$rs["emergency_text"],
				'emergency_type'=>$rs["emergency_type"]
				);
				array_push($datas,$data);
		}
		$array=array(
			'success'=>true,
			'total'=>$total,
			'msg'=>'查找成功',
			'data'=>$datas
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'查找失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
	DBClose();
}

function getEmUnhandleList($page,$limit){
	DBOpen();
	$sql2="select count(*) as count from emergency_info  where status !='已处理'";
	$r=mysql_query($sql2);
	$total=0;
	while(($rr=mysql_fetch_array($r))){
		$total=$rr["count"];
	}
	//$pagenow=($start/$limit)+1;
	//echo $total;
	$sql="call sp_page (".$page.",".$limit.",' e.emergency_id,v.user_realname,v.user_tel,v.location,v.longitude,v.latitude,e.status,e.emergency_time ',' emergency_info e inner join user_info v on e.victim_id=v.user_id where e.status!=\'已处理\'',' order by e.emergency_id asc');";
	$result=mysql_query($sql);
	$count=mysql_affected_rows();
	if($count>1){
		$datas=array();
		while(($rs=mysql_fetch_array($result))){
			$data=array(
				'emergency_id'=>$rs["emergency_id"],
				'user_realname'=>$rs["user_realname"],
				'user_tel'=>$rs["user_tel"],
				'location'=>$rs["location"],
				'longitude'=>$rs["longitude"],
				'latitude'=>$rs["latitude"],
				'status'=>$rs["status"],
				'emergency_time'=>$rs["emergency_time"]
				);
				array_push($datas,$data);
		}
		$array=array(
			'success'=>true,
			'total'=>$total,
			'msg'=>'查找成功',
			'data'=>$datas
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'查找失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
	DBClose();
}

function addEmergency($token){
	
}

function deleteEmergency($em_id){
	DBOpen();
	$sql="delete from emergency_info where emergency_id=".$em_id;
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'删除成功',
			'data'=>array()
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>true,
			'total'=>0,
			'msg'=>'删除失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
}
/*对car信息表的操作*/
function getCarById($car_id){
	DBOpen();	
	$sql="select car_id,car_num,owner_name,owner_tel from car_info where car_id=".$car_id;
	$result=mysql_query($sql);
	$rs=mysql_fetch_array($result);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'Msg'=>"查看成功",
			'data'=>array(
				'car_id'=>$rs["car_id"],
				'car_num'=>$rs["car_num"],
				'owner_name'=>$rs["owner_name"],
				'owner_tel'=>$rs["owner_tel"]
			)
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'Msg'=>"查看失败",
			'data'=>array()
		);
		echo json_encode($array);
	}
	
}
function getCarList($start,$limit){
	DBOpen();
	$sql2="select count(*) as count from car_info ";
	$r=mysql_query($sql2);
	$total=0;
	while(($rr=mysql_fetch_array($r))){
		$total=$rr["count"];
	}
	$pagenow=($start/$limit)+1;
	//echo $total;
	$sql="call sp_page (".$pagenow.",".$limit.",' car_id,car_num,owner_name,owner_tel ',' car_info ',' order by car_id asc')";
	$result=mysql_query($sql);
	$count=mysql_affected_rows();
	if($count>1){
		$datas=array();
		while(($rs=mysql_fetch_array($result))){
			$data=array(
				'car_id'=>$rs["car_id"],
				'car_num'=>$rs["car_num"],
				'owner_name'=>$rs["owner_name"],
				'owner_tel'=>$rs["owner_tel"],
				);
				array_push($datas,$data);
		}
		$array=array(
			'success'=>true,
			'total'=>$total,
			'msg'=>'查找成功',
			'data'=>$datas
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'查找失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
	DBClose();
}
function addCar($car_num,$owner_name,$owner_tel){
	DBOpen();
	$sql="insert into CAR_INFO(car_num,owner_name,owner_tel) values('".$car_num."','".$owner_name."','".$owner_tel."');";
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'添加成功',
			'data'=>array()
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'添加失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
	DBClose();
}
function deleteCar($car_id){
	DBOpen();
	$sql="delete from car_info where car_id=".$car_id;
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'删除成功',
			'data'=>array()
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>true,
			'total'=>0,
			'msg'=>'删除失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
}
function updateCar($car_id,$car_num,$owner_name,$owner_tel){
	DBOpen();
	$sql="update car_info set car_num='".$car_num."',owner_name='".$owner_name."',owner_tel='".$owner_tel."' where car_id=".$car_id;
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'修改信息成功',
			'data'=>array()
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'修改信息失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
}

/*对日志表信息的操作*/
function getLogList($start,$limit){
	DBOpen();
	$sql2="select count(*) as count from log_info ";
	$r=mysql_query($sql2);
	$total=0;
	while(($rr=mysql_fetch_array($r))){
		$total=$rr["count"];
	}
	$pagenow=($start/$limit)+1;
	$sql="call sp_page (".$pagenow.",".$limit.",' log_id,log_text,log_time ',' log_info ',' order by log_time asc')";
	$result=mysql_query($sql);
	$count=mysql_affected_rows();
	if($count>1){
		$datas=array();
		while(($rs=mysql_fetch_array($result))){
			$data=array(
				'log_id'=>$rs["log_id"],
				'log_text'=>$rs["log_text"],
				'log_time'=>$rs["log_time"]
				);
				array_push($datas,$data);
		}
		$array=array(
			'success'=>true,
			'total'=>$total,
			'msg'=>'查找成功',
			'data'=>$datas
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>false,
			'total'=>0,
			'msg'=>'查找失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
	DBClose();
}
function deleteLog($log_id){
	DBOpen();
	$sql="delete from log_info where log_id=".$log_id;
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'success'=>true,
			'total'=>1,
			'msg'=>'删除成功',
			'data'=>array()
		);
		echo json_encode($array);
	}else{
		$array=array(
			'success'=>true,
			'total'=>0,
			'msg'=>'删除失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
}
/*app操作*/




