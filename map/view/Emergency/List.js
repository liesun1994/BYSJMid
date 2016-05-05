Ext.define('MAP.view.Emergency.List', {
	title: "报警信息",
    extend: 'Ext.grid.Panel',
    alias: 'widget.emergencylistview',
    layout: "fit",
    store: "Emergency",
    id:"emergencylistView",
	selType: "checkboxmodel",
    selModel: { checkOnly: false, mode: "MULTI" },
	

    initComponent: function () {
        var me = this;
        me.tbar = {
            xtype: "pagingtoolbar",
           displayInfo: true, store: me.store,
           items: [
	           	{ iconCls: "map", scope: me, text: '地图', id: "btnmapInfo" },
	            { iconCls: "alloc", scope: me, text: '分配', id: "btnuserAlloc"},
	        ]
        }
        me.columns=[
            //	{header:'用户名',dataIndex:'username',hidden:true},
               { text: '编号', dataIndex: 'emergency_id',hidden:true },
                { text: '报警人', dataIndex: 'user_realname',width:55},
                { text: '联系方式', dataIndex: 'user_tel', width: 110 },
                { text: '状态', dataIndex: 'status', width: 55 },
                { text: '报警时间', dataIndex: 'emergency_time', width: 150 }
        ]
        me.bbar = ["点击即可进行分配信息警员"]
      	me.callParent(arguments);
    },
});