Ext.define('MAP.controller.Menu', {
    extend: 'Ext.app.Controller',
    models: [
    	"Emergency"
    ],
    stores: [
        "Emergency"
    ],
    views: [
        'Emergency.List'
    ],
    refs: [
        { ref: "MenuPanel", selector: "#menuPanel" },
        { ref: "BtnMapInfo", selector: "#btnmapInfo" },
       	{ ref: "BtnUserAlloc", selector: "#btnuserAlloc" }
    ],

    init: function () {
        var me = this,
        panel = me.getMenuPanel();
        me.emergencylistview = Ext.widget("emergencylistview");
        panel.add(me.emergencylistview);
        me.getBtnMapInfo().on("click", me.onMapInfo, me);
        me.getBtnUserAlloc().on("click",me.onUserAlloc,me);
        me.control({
        });
    },
	onMapInfo:function(){
		//var selArr = this.view.down("menuPanel").getSelectionModel().getSelection();
		alert('122');
	},
	onUserAlloc:function(){
		alert('234');
	}
})
    