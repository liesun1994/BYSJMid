Ext.define('BYSJ.controller.UserInfo', {
    extend: 'Ext.app.Controller',
    models: [
        'User'
    ],

    stores: [
        'User'
    ],

    views: [
        'User.Edit'
    ],

    refs: [
        { ref: "WorkPanel", selector: "#workPanel" },
        { ref: "TeachInfoView", selector: "#teachInfoView" },
        { ref: "ButtonAdd", selector: "#buttonAdd" },
        { ref: "ButtonEdit", selector: "#buttonEdit" },
        { ref: "ButtonDelete", selector: "#buttonDelete" }
    ],

    init: function () {
        var me = this,
            panel = me.getWorkPanel();
        me.view = Ext.widget("teachinfoview");
        panel.add(me.view);
        me.getDocumentStore().proxy.extraParams.doctype = "teachinfo";
        me.getDocumentStore().load();
        me.getButtonAdd().on("click", me.onAdd, me);
        me.getButtonEdit().on("click", me.onEdit, me);
        me.getButtonDelete().on("click", me.onDelete, me);
        me.view.down("gridpanel").on("selectionchange", me.onListSelect, me);
        me.control({
        });
    },

    onAdd: function () {
        var me = this,
             win = CSEWebManager.view.TeachInfo.TeachInfoEdit,
            model = me.getDocumentModel();
        win.form.getForm().url = "../Document/Save";
        win.setTitle("新增");
        var type = 'teachinfo';
        var newdata = new model;
        newdata.data.doctype = type;
        newdata.data.pubname = CSEWebManager.Userinfo.Username;
        win.form.getForm().reset();
        win.form.loadRecord(newdata);
        win.show();
    },

    onEdit: function () {
        var me = this,
            list = me.view.down("gridpanel"),
            rs = list.getSelectionModel().getLastSelected();
        if (rs) {
            var win = CSEWebManager.view.TeachInfo.TeachInfoEdit;
            win.form.getForm().url = "../Document/Save";
            win.setTitle("编辑");
            win.form.load({
                url: "../Document/Detail",
                params: { documentid: rs.data.documentid },
                success: function (form, action) {
                    this.show();
                },
                failure: CSEWebManager.FormSubmitFailure,
                scope: win
            });
        }
    },


    onDelete: function () {
        var me = this,
            list = me.view.down("gridpanel"),
            rs = list.getSelectionModel().getSelection();
        if (rs.length > 0) {
            Ext.Msg.confirm("删除", "是否确定删除选中的内容？", function (btn) {
                if (btn == "yes") {
                    Ext.each(rs, function (item) {
                        Ext.Ajax.request({
                            url: "../Document/Delete",
                            params: {
                                documentid: item.data.documentid
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
        var me = this
        me.getButtonEdit().setDisabled(sels.length == 0);
        me.getButtonDelete().setDisabled(sels.length == 0);
    }



});
