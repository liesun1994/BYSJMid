Ext.define('BYSJ.view.Emergency.List', {
	title: "报警信息管理",
    extend: 'Ext.grid.Panel',
    alias: 'widget.emlistview',
    layout: "fit",
    store: "Emergency",
	selType: "checkboxmodel",
    selModel: { checkOnly: false, mode: "MULTI" },
    initComponent: function () {
        var me = this;
        me.tbar = {
            xtype: "pagingtoolbar",
           displayInfo: true, store: me.store,
	        items: [
	         	{ iconCls: "show", scope: me, text: '处理报警信息', id: "buttonEmShow", disabled: true },
	            { iconCls: "delete", scope: me, text: '删除报警信息', id: "buttonEmDelete", disabled: true },
	        ]
        },
        me.columns=[
               { text: '编号', dataIndex: 'emergency_id',width:50 },
               { text: '报警人', dataIndex: 'user_realname',width:100},
               {text:'联系电话',dataIndex: 'user_tel',width:140},
               { text: '报警类别', dataIndex: 'emergency_type',width:80},
               { text: '报警信息', dataIndex: 'emergency_text',width:400},
               { text: '报警时间', dataIndex: 'emergency_time',width:140},
               { text: '状态', dataIndex: 'status',width:80}
               
        ]
        me.bbar = ["报警信息管理"]
        
      	me.callParent(arguments);
    }
});