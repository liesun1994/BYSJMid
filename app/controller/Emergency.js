Ext.define('BYSJ.controller.Emergency', {
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
        { ref: "WorkPanel", selector: "#workPanel" },
       	{ ref: "ButtonEmShow", selector: "#buttonEmShow" },
        { ref: "ButtonEmDelete", selector: "#buttonEmDelete" },
    ],

    init: function () {
        var me = this,
        panel = me.getWorkPanel();
        view = Ext.widget("emlistview");
        panel.add(view);
        me.getButtonEmShow().on("click",me.onEmShow,me);
        me.getButtonEmDelete().on("click",me.onEmDelete,me);
       	Ext.getCmp("workPanel").down("gridpanel").on("selectionchange", me.onListSelect, me);
        me.control({
        });
    },
    
    onEmShow:function(){
    	alert('123');
    },
    
    onEmDelete:function(){
		var me = this,
        list = Ext.getCmp("workPanel").down("gridpanel"),
        rs = list.getSelectionModel().getSelection();
        if (rs.length > 0) {
            Ext.Msg.confirm("删除内容", "是否确定删除选中的内容？", function (btn) {
                if (btn == "yes") {
                    Ext.each(rs, function (item) {
                        Ext.Ajax.request({
                            url: "php/Emergency/deleteEmergency.php",
                            params: {
                                emergency_id: item.data.emergency_id
                            },
                            method: "POST",
                            async: false,
                            failure: function (resp, opts) {
                                var respText = Ext.util.JSON.decode(resp.responseText);
                                Ext.Msg.alert('错误', respText.Msg);
                                return;
                            }
                        });
                        list.getStore().remove(item);
                    });
                }
            }, list)
        }
	},
    
    onListSelect: function (model, sels) {
        var me = this;
        me.getButtonEmShow().setDisabled(sels.length == 0);
        me.getButtonEmDelete().setDisabled(sels.length == 0);
    }
});
