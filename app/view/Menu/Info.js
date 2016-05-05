Ext.define('BYSJ.view.Menu.Info',{
	extend:'Ext.tree.Panel',
	alias:'widget.infomenuview',
	title:'个人菜单',
	id:'infomenuview',
	store:"Info",
	rootVisible: false,
	initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});