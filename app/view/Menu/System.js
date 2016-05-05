Ext.define('BYSJ.view.Menu.System',{
	extend:'Ext.tree.Panel',
	alias:'widget.systemmenuview',
	title:'网站管理',
	id:'systemview',
	store:"System",
	rootVisible: false,
	initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});