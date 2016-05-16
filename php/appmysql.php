<?php
header("content-type:text/html;charset=utf-8");
error_reporting( E_ALL&~E_NOTICE );//我们只要在乎除NOTICE级别外的其它错误就行了。NOTICE级别可以不用看
function DBOpen(){
	$link = @mysql_connect("localhost:3306","root","root") or die("数据库连接错误".mysql_error());
	$res=@mysql_select_db("bysj",$link) or die("数据库连接错误".mysql_error());
	 
	//*$link = @mysql_connect("w.rdc.sae.sina.com.cn:3307","4y1k02k5lk","hy2m0jmhjj3x4y2jwli50llxi5hm111iwl32wizy") or die("数据库连接错误".mysql_error());
	//$res=@mysql_select_db("app_yuanchuanghui",$lin*/k) or die("数据库连接错误".mysql_error());
	mysql_query("set names utf-8");
	mysql_set_charset('utf8');//设置数据源格式为utf8 哇哈哈哈哈
}
function DBClose(){
	mysql_close();
}

//登录接口   测试完成
function AuserLogin($user_name,$user_password){
	DBOpen();
	$pwd=md5($user_password);
	//token信息需要重新修改
	$sql="select * from user_info where user_name='".$user_name."' and user_password='".$pwd."'";
	$result=mysql_query($sql);
	if(mysql_affected_rows()==1){
		$rs=mysql_fetch_array($result);
		$array=array(
			'code'=>1000,
			'total'=>1,
			'msg'=>'登录成功',
			'data'=>array(
				'user_realname'=>$rs["user_realname"],
				'access_token'=>$rs["access_token"],
			)
		);
		echo json_encode($array);
	}else{
		$array=array(
			'code'=>900,
			'total'=>0,
			'msg'=>'登录失败,用户名或者密码出错',
			'data'=>array()
		);
		echo json_encode($array);
	}
}

//上传用户位置信息  测试完成
function uploadLocation($access_token,$location,$longitude,$latitude){
	DBOpen();
	$sql="update user_info set location='".$location."',longitude='".$longitude."',latitude='".$latitude."' where access_token='".$access_token."'";
	$result=mysql_query($sql);
	if(mysql_affected_rows()==1){
		$array=array(
			'code'=>1000,
			'total'=>1,
			'msg'=>'上传位置成功',
			'data'=>array(
			)
		);
		echo json_encode($array);
	}else{
		$array=array(
			'code'=>900,
			'total'=>0,
			'msg'=>'位置信息获取出错',
			'data'=>array()
		);
		echo json_encode($array);
	}
	DBClose();
}
//列表分页出现问题
function getTodoTaskList($access_token){
	DBOpen();
	$sql1="select user_id from user_info where access_token=".$access_token;
	//echo $sql1;
	$user_info=mysql_query($sql1);
	if(mysql_affected_rows()==1){
		$rss=mysql_fetch_array($user_info);
		$user_id=$rss['user_id'];
		//echo $user_id;
		$sql="select e.emergency_id,e.emergency_type,e.emergency_text,v.user_realname,v.user_tel,v.location,e.status,e.emergency_time from emergency_info e inner join user_info v on e.victim_id=v.user_id and e.status='处理中' and e.handler_id=".$user_id;
		//echo $sql;
		$result=mysql_query($sql);
		$count=mysql_affected_rows();
		//$array=array();
		if($count>=1){
			$datas=array();
			while(($rs=mysql_fetch_array($result))){
				$data=array(
					'emergency_id'=>$rs["emergency_id"],
					'emergency_type'=>$rs["emergency_type"],
					'emergency_text'=>$rs["emergency_text"],
					'user_realname'=>$rs["user_realname"],
					'user_tel'=>$rs["user_tel"],
					'location'=>$rs["location"],
					'status'=>$rs["status"],
					'emergency_time'=>$rs["emergency_time"]
					);
					array_push($datas,$data);
			}
			$array=array(
				'success'=>true,
				'total'=>$count,
				'msg'=>'获取未处理警务信息成功',
				'data'=>$datas
			);
			echo json_encode($array);
		}else{
			$array=array(
				'code'=>900,
				'total'=>0,
				'msg'=>'暂无未处理报警事件',
				'data'=>array()
			);
			echo json_encode($array);
		}
	}else{
		$array=array(
				'code'=>900,
				'total'=>0,
				'msg'=>'用户信息错误',
				'data'=>array()
			);
		echo json_encode($array);
	}
	DBClose();
}

//获取已处理的信息接口
function getDoneTaskList($access_token){
	DBOpen();
	$sql1="select user_id from user_info where access_token=".$access_token;
	//echo $sql1;
	$user_info=mysql_query($sql1);
	if(mysql_affected_rows()==1){
		$rss=mysql_fetch_array($user_info);
		$user_id=$rss['user_id'];
		//echo $user_id;
		$sql="select e.emergency_id,e.emergency_type,e.emergency_text,e.handler_text,e.handler_time,v.user_realname,v.user_tel,v.location,e.status,e.emergency_time from emergency_info e inner join user_info v on e.victim_id=v.user_id and e.status='已处理' and e.handler_id=".$user_id;
		//echo $sql;
		$result=mysql_query($sql);
		$count=mysql_affected_rows();
		//$array=array();
		if($count>=1){
			$datas=array();
			while(($rs=mysql_fetch_array($result))){
				$data=array(
					'emergency_id'=>$rs["emergency_id"],
					'emergency_type'=>$rs["emergency_type"],
					'emergency_text'=>$rs["emergency_text"],
					'handler_text'=>$rs["handler_text"],
					'handler_time'=>$rs["handler_time"],
					'user_realname'=>$rs["user_realname"],
					'user_tel'=>$rs["user_tel"],
					'location'=>$rs["location"],
					'status'=>$rs["status"],
					'emergency_time'=>$rs["emergency_time"]
					);
					array_push($datas,$data);
			}
			$array=array(
				'success'=>true,
				'total'=>$count,
				'msg'=>'获取处理完成警务信息成功',
				'data'=>$datas
			);
			echo json_encode($array);
		}else{
			$array=array(
				'code'=>900,
				'total'=>0,
				'msg'=>'暂无已处理报警事件',
				'data'=>array()
			);
			echo json_encode($array);
		}
	}else{
		$array=array(
				'code'=>900,
				'total'=>0,
				'msg'=>'用户信息错误',
				'data'=>array()
			);
		echo json_encode($array);
	}
	DBClose();
}
//获取紧急任务接口  测试完成
function getEm($access_token){
	DBOpen();
	$sql="select user_id from user_info where access_token=".$access_token;
	$user_info=mysql_query($sql);
	if(mysql_affected_rows()==1){
		$rss=mysql_fetch_array($user_info);
		$user_id=$rss['user_id'];
		//echo $user_id;
		$sql="select e.emergency_id,v.user_realname,v.user_tel,v.location,v.longitude,v.latitude from emergency_info e inner join user_info v on e.victim_id=v.user_id  and e.status='处理中' and e.handler_id=".$user_id." and e.emergency_type='紧急'";
		//echo $sql;
		$result=mysql_query($sql);
		$rs=mysql_fetch_array($result);
		if(mysql_affected_rows()==1){
			$array=array(
				'code'=>1000,
				'total'=>1,
				'msg'=>'获取报警信息成功',
				'data'=>array(
					'emergency_id'=>$rs["emergency_id"],
					'user_realname'=>$rs['user_realname'],
					'user_tel'=>$rs['user_tel'],
					'location'=>$rs['location'],
					'longitude'=>$rs['longitude'],
					'latitude'=>$rs['latitude']
				)
			);
			echo json_encode($array);
		}else{
			$array=array(
				'code'=>900,
				'total'=>0,
				'msg'=>'暂无紧急信息',
				'data'=>array()
			);
			echo json_encode($array);
		}
	}else{
		$array=array(
				'code'=>900,
				'total'=>0,
				'msg'=>'用户信息错误',
				'data'=>array()
			);
		echo json_encode($array);
	}
	DBClose();
}

//接受任务接口  测试完成
function getTask($token,$emergency_id){
	DBOpen();
	$sql="select user_id from user_info where access_token=".$token;
	$user_info=mysql_query($sql);
	if(mysql_affected_rows()==1){
		$rs=mysql_fetch_array($user_info);
		$user_id=$rs['user_id'];
		$sql2="update emergency_info set handler_id=".$user_id.",status='处理中' where emergency_id=".$emergency_id;
		$result=mysql_query($sql2);
		if(mysql_affected_rows()==1){
			$array=array(
				'code'=>1000,
				'total'=>1,
				'msg'=>'接受任务成功',
				'data'=>array(
				)
			);
			echo json_encode($array);
		}else{
			$array=array(
				'code'=>900,
				'total'=>0,
				'msg'=>'接受任务失败',
				'data'=>array()
			);
			echo json_encode($array);
		}
	}else{
		$array=array(
				'code'=>900,
				'total'=>0,
				'msg'=>'用户信息出错',
				'data'=>array()
			);
			echo json_encode($array);
	}
	DBClose();
}

//上传处理信息   测试完成
function uploadHandledInfo($token,$emergency_id,$result_text){
	DBOpen();
	$sql="select user_id from user_info where access_token=".$token;
	$user_info=mysql_query($sql);
	$rs=mysql_fetch_array($user_info);
	$user_id=$rs['user_id'];
	//echo $user_id;
	$em_time=date('Y-m-d H:i:s',time());
	$sql2="update emergency_info set status='已处理',handler_text='".$result_text."',handler_time='".$em_time."' where emergency_id=".$emergency_id." and handler_id=".$user_id;
	//echo $sql2;
	$result=mysql_query($sql2);
	if(mysql_affected_rows()==1){
		$array=array(
			'code'=>1000,
			'total'=>1,
			'msg'=>'处理信息成功',
			'data'=>array(
			)
		);
		echo json_encode($array);
	}else{
		$array=array(
			'code'=>900,
			'total'=>0,
			'msg'=>'处理信息失败',
			'data'=>array()
		);
		echo json_encode($array);
	}
	DBClose();
}

