<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>酷讯酒店地图</title>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.2"></script>
<style type="text/css">
a{text-decoration:none;color:#6ce;font-size:14px;}
a:hover{text-decoration:underline;}
</style>
</head>
<body>
<div style="float:left;width:520px;height:340px;border:1px solid gray" id="container"></div>
<div style="float:left;width:200px;height:340px;border:1px solid gray;border-width:1px 1px 1px 0;padding:0 10px 0 0;line-height:1.8em;">
    <ul>
    <?php

    /**
     *  连接数据库
     */

    $mysql_server_name="localhost";         // 数据库服务器名称
    $mysql_username="root";                 // 连接数据库用户名
    $mysql_password="root";                 // 连接数据库密码
    $mysql_database="bysj";                  // 数据库的名字
    
    // 连接到数据库
    $conn=mysql_connect($mysql_server_name, $mysql_username,$mysql_password) 
            or die("Could not connect: ".mysql_error());
    
    // 从表中提取信息的sql语句
    $strsql="select * from user_info";
    // 执行sql查询
    $result=mysql_db_query($mysql_database, $strsql, $conn);
    
    // 获取查询结果
    $arr_point = '[';
    $maker = '';
    $ops = '';
    $i = 0;
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $img = '';
        echo '<li>
                <span style="float:right;">'.$row["price"].'元</span>
                <a onmouseover="openMyWin(infoWindow'.$i.',point['.$i.'])" href="#">'.$row['title'].'</a>
             </li>';

        $arr_point .= 'new BMap.Point('.$row["point"].'),';
        
        $maker .= 'var marker'.$i.' = new BMap.Marker(point['.$i.'],{icon:myIcon});';

        $addverlay .= 'map.addOverlay(marker'.$i.');';

        $ops .= 'var opts'.$i.' = {offset : new BMap.Size(0, -25), title : \'<span style="font-size:14px;color:#0A8021">'.$row['title'].'</span>\'};';
        for($m = 0;$m < $row["level"];$m++)
        {
            $img .= "<img src='http://cdn2.iconfinder.com/data/icons/diagona/icon/16/031.png' />";
        }
        $infoWindow .= "var infoWindow".$i." = new BMap.InfoWindow(\"<div style='line-height:1.8em;font-size:12px;'><b>地址:</b>".$row['address']."</br><b>电话:</b>010-59921010</br><b>口碑：</b>".$img."<a style='text-decoration:none;color:#2679BA;float:right' href='#'>详情>></a></div>\", opts".$i.");";
        $addEventListener .= 'marker'.$i.'.addEventListener("mouseover", function(){this.openInfoWindow(infoWindow'.$i.');});';
        $i++;
    }
    $arr_point = substr($arr_point , 0 , -1).']';
    ?>

    </ul>
</div>
</body>
</html>
<script type="text/javascript">
var map = new BMap.Map("container");
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 14);
var myIcon = new BMap.Icon("http://dev.baidu.com/wiki/static/map/API/examples/images/Mario.png", new BMap.Size(32, 70), {    //小车图片
    imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
  });
</script>

<?php
    echo '<script> var point = '.$arr_point.';  ';    // 坐标点
    echo $maker;                                      // 创建标注
    echo $addverlay;                                  // 将标注添加到地图中
    echo 'map.setViewport(point); ';                  // 调整地图的最佳视野为显示标注数组point
    echo $ops ;
    echo $infoWindow ;
    echo $addEventListener.' </script> '
?>

<script>
function openMyWin(id,p){
    map.openInfoWindow(id,p);    
}
</script>