<!DOCTYPE html>
<html>
	<head>
		<?php
			header("Content-Type: text/html;charset=utf-8");
			include 'php/mysql.php';
		?>
		<meta charset="utf-8" />
		<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=jMOc35fgMUrOfHhFYgMN9SZ2uZhi8kY2"></script>
		<title>附近警员</title>
		
	</head>
	<body>
		<div id='allmap' style="width:900px;height:560px"></div>
		<?php
			//实现报警具体信息
			$ne=getEmById(1);
			$neinfo=json_decode($ne);
			//print_r($neinfo);
			$longitude=$neinfo->data->longitude;
			$latitude=$neinfo->data->latitude;
			$user_realname=$neinfo->data->user_realname;
			$ne_text=$neinfo->data->non_emergency_text;	
			$ne_type=$neinfo->data->non_emergency_type;
			$user_tel=$neinfo->data->user_tel;
			/*echo $longitude;
			echo $latitude;
			echo $ne_text;
			echo $ne_type;*/
		?>
		
		<script type="text/javascript">
		// 百度地图API功能	
		map = new BMap.Map("allmap");
		var pt1=new BMap.Point(<?php	echo $longitude.','.$latitude;?>);
		map.centerAndZoom(pt1, 15);
		var help =new BMap.Icon("http://yuanchuanghui-bysj.stor.sinaapp.com/help.jpg", new BMap.Size(25, 25), {    //小车图片
   			offset: new BMap.Size(0, -5),    //相当于CSS精灵
    		imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
 	});
		var marker = new BMap.Marker(pt1,{icon:help});  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
/*
	var label = new BMap.Label("我是文字标注哦",{offset:new BMap.Size(20,-10)});
	marker.setLabel(label);*/
	var data_info = [
		<?php
			$polices=getUserList(0, 20, 1);
			$pinfo=json_decode($polices);
			//print_r($pinfo);
			$i=0;
			while($pinfo->data[$i]->user_id){
				$p_user_id=$pinfo->data[$i]->user_id;
				$p_user_realname=$pinfo->data[$i]->user_realname;
				$p_user_tel=$pinfo->data[$i]->user_tel;
				$p_longitude=$pinfo->data[$i]->longitude;
				$p_latitude=$pinfo->data[$i]->latitude;
				echo '['.$p_longitude.','.$p_latitude.',';
				echo '"警员id:&nbsp;&nbsp;'.$p_user_id.'<br>警员姓名:'.$p_user_realname.'<br>联系电话:'.$p_user_tel.'"],';
				$i++;
			}
		?>
		];
	var opts = {
				width : 250,     // 信息窗口宽度
				height: 80,     // 信息窗口高度
				title : "信息窗口" , // 信息窗口标题
				enableMessage:true//设置允许信息窗发送短息
			   };
	var myIcon =new BMap.Icon("http://yuanchuanghui-bysj.stor.sinaapp.com/police.jpg", new BMap.Size(20, 35), {    //小车图片
    offset: new BMap.Size(0, -5),    //相当于CSS精灵
    imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
 	});
	for(var i=0;i<data_info.length;i++){
		var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]),{icon:myIcon});  // 创建标注
		var content = data_info[i][2];
		map.addOverlay(marker);               // 将标注添加到地图中
		addClickHandler(content,marker);
	}
	function addClickHandler(content,marker){
		marker.addEventListener("click",function(e){
			openInfo(content,e)}
		);
	}
	function openInfo(content,e){
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	}
</script>
	</body>
</html>
