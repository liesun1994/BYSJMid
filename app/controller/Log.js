Ext.define('BYSJ.controller.Log', {
    extend: 'Ext.app.Controller',
    models: [
    	"Log"
    ],
    stores: [
        "Log"
    ],
    views: [
        'Log.List'
    ],
    refs: [
        { ref: "WorkPanel", selector: "#workPanel" },
        { ref: "LogView", selector: "#loglistView" },
        { ref: "ButtonLogDelete", selector: "#buttonLogDelete" }
    ],

    init: function () {
        var me = this,
        panel = me.getWorkPanel();
        view = Ext.widget("loglistview");
        panel.add(view);
        me.getButtonLogDelete().on("click", me.onDelete, me);
        Ext.getCmp("workPanel").down("gridpanel").on("selectionchange", me.onListSelect, me);
        me.control({
        });
    },
    
    onDelete: function () {
    	var me = this,
        list = Ext.getCmp("workPanel").down("gridpanel"),
        rs = list.getSelectionModel().getSelection();
        if (rs.length > 0) {
            Ext.Msg.confirm("删除内容", "是否确定删除选中的内容？", function (btn) {
                if (btn == "yes") {
                    Ext.each(rs, function (item) {
                        Ext.Ajax.request({
                            url: "php/Log/deleteLog.php",
                            params: {
                                log_id: item.data.log_id
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
        me.getButtonLogDelete().setDisabled(sels.length == 0);
    }
    
});
