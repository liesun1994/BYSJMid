Ext.define('BYSJ.view.Menu.Manager',{
	extend:'Ext.tree.Panel',
	alias:'widget.managermenuview',
	title:'警务管理',
	id:'managerview',
	store:"Manager",
	rootVisible: false,
	initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});