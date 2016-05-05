Ext.define("BYSJ.view.User.Test", {
	extend:'Ext.window.Window',
	title:'hheh',
	width:100,
	height:100,
	hideMode: 'offsets',  //可以设置除了窗口以外的其他东西不可以被修改
	closable:true,
    layout: "fit",
    modal: true, //modal : Boolean为真 当显示时，制作窗口模板并且掩饰他背后的一切，为假时显示它除了限制访问其他UI元素。
    singleton: true  //true则设置为单例模式，在外面可以使用
});