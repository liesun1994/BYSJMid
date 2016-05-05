Ext.define('BYSJ.view.User.PList', {
	title: "警员管理",
    extend: 'Ext.grid.Panel',
    alias: 'widget.policelistview',
    id:'piliceView',
    layout: "fit",
    store: "Police",
	selType: "checkboxmodel",
    selModel: { checkOnly: false, mode: "MULTI" },


    initComponent: function () {
        var me = this;
        me.tbar = {
            xtype: "pagingtoolbar",
           displayInfo: true, store: me.store,
	        items: [
	           	{ iconCls: "user_add", scope: me, text: '增加用户信息', id: "buttonUserAdd" },
	            { iconCls: "user_edit", scope: me, text: '修改用户信息', id: "buttonUserEdit", disabled: true },
	            { iconCls: "user_delete", scope: me, text: '删除用户信息', id: "buttonUserDelete", disabled: true },
	        	{text:"重置密码",id:"buttonUserResetPassword",disabled:true}
	        ]
        }
        me.columns=[
            //	{header:'用户名',dataIndex:'username',hidden:true},
               { text: '编号', dataIndex: 'user_id', hidden:true },
                { text: '登录名', dataIndex: 'user_name', hidden:true},
                { text: '用户姓名', dataIndex: 'user_realname', width: 120 },
                { text: '联系方式', dataIndex: 'user_tel', width: 150 },
                { text: '定位信息', dataIndex: 'location', width: 200 },
                { text: '用户说明', dataIndex: 'user_tips', width: 150 },
                { text: '经度',dataIndex:'longitude',hidden:true},
                { text: '纬度',dataIndex:'latitude',hidden:true}
        ]
        me.bbar = ["用户密码默认为“123456”。重置密码可将用户密码重置为“123456”。"]
      	me.callParent(arguments);
    }
});