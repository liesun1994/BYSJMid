Ext.define('BYSJ.view.Log.List', {
	title: "日志管理",
    extend: 'Ext.grid.Panel',
    alias: 'widget.loglistview',
    layout: "fit",
    store: "Log",
	selType: "checkboxmodel",
    selModel: { checkOnly: false, mode: "MULTI" },
	/*setInterval(function(){
		    me.store.load();
		},1000),
*/
    initComponent: function () {
        var me = this;
        me.tbar = {
            xtype: "pagingtoolbar",
           displayInfo: true, store: me.store,
	        items: [
	            { iconCls: "delete", scope: me, text: '删除日志信息', id: "buttonLogDelete", disabled: true },
	        ]
        }
        me.columns=[
               { text: '日志ID', dataIndex: 'log_id' },
                { text: '日志信息', dataIndex: 'log_text',width:750},
                { text: '时间', dataIndex: 'log_time',width:140}
        ]
        me.bbar = ["日志信息查看"]
        
      	me.callParent(arguments);
    }
});