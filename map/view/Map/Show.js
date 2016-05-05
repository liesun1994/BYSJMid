//Ext.require('App.PaverData');

Ext.define('MAP.view.Map.Show', {
	extend : 'Ext.panel.Panel',
	alias: 'widget.mapshow',
	id:'mapshow',
	layout : 'fit',
	width:900,
	height:560,
	title:'附近警员',
	html: '<iframe id="orgSet" name="orgSet" src="map.php" frameborder="0" width="100%" height="100%"></iframe>',
	
	initComponent : function() {
		var me=this;
		me.callParent(arguments);
	}
})
