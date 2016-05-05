Ext.define('BYSJ.controller.User', {
    extend: 'Ext.app.Controller',
    models: [
    	"User"
    ],
    stores: [
        "User"
    ],
    views: [
        'User.List','User.Edit'
    ],
    refs: [
        { ref: "WorkPanel", selector: "#workPanel" },
    	{ ref: "ButtonUserAdd", selector: "#buttonUserAdd" },
        { ref: "ButtonUserEdit", selector: "#buttonUserEdit" },
        { ref: "ButtonUserDelete", selector: "#buttonUserDelete" },
        { ref: "ButtonUserResetPassword", selector: "#buttonUserResetPassword" }
    ],

    init: function () {
        var me = this,
        panel = me.getWorkPanel();
        me.view = Ext.widget("userlistview");
        panel.add(me.view);
        me.getButtonUserAdd().on("click", me.onAddUser, me);
        me.getButtonUserEdit().on("click",me.onEditUser,me);
        me.getButtonUserDelete().on("click",me.onDeleteUser,me);
        me.getButtonUserResetPassword().on("click",me.onResetPassword,me);
       	Ext.getCmp("workPanel").down("gridpanel").on("selectionchange", me.onListSelect, me);
        me.control({
        });
    },
    onAddUser:function () {
    	var me = this;
        win = BYSJ.view.User.Edit;
        model = me.getUserModel();
        win.form.getForm().url = "php/User/addUser.php";
        win.setTitle("用户信息添加");
        var newdata = new model;
        win.form.getForm().reset();
        win.form.loadRecord(newdata);
        win.show();
    },
	onEditUser: function () {
       var me = this,
        list = Ext.getCmp("workPanel").down("gridpanel"),
        rs = list.getSelectionModel().getLastSelected();
        if (rs) {
            var win = BYSJ.view.User.Edit;
            win.form.getForm().url = "php/User/updateUser.php";
            win.setTitle("编辑用户信息");
            win.form.load({
                url: "php/User/getUserById.php",
                params: { user_id: rs.data.user_id },
                success: function (form, action) {
                    this.show();
                },
                failure: BYSJ.FormSubmitFailure,
                scope: win
            });
        }
    },
	onDeleteUser:function(){
		var me = this,
        list = Ext.getCmp("workPanel").down("gridpanel"),
        rs = list.getSelectionModel().getSelection();
        if (rs.length > 0) {
            Ext.Msg.confirm("删除内容", "是否确定删除选中的内容？", function (btn) {
                if (btn == "yes") {
                    Ext.each(rs, function (item) {
                        Ext.Ajax.request({
                            url: "php/User/deleteUser.php",
                            params: {
                                user_id: item.data.user_id
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
	
	onResetPassword:function(){
		var me = this,
        list = Ext.getCmp("workPanel").down("gridpanel"),
        rs = list.getSelectionModel().getSelection();
        if (rs.length > 0) {
            var idList = [];
            for (var i = rs.length - 1; i >= 0; i--) {
                idList.push(rs[i].data.user_id);
            }
            Ext.Ajax.request({
                params: { user_id: idList },
                url: 'php/User/resetUserpwd.php',
                scripts: true,
                scope: me,
                success: function (response, opt) {
                    var obj = Ext.JSON.decode(response.responseText);
                    if (obj) {
                        if (obj.success) {
                            Ext.Msg.alert("提示信息", "重置密码成功");
                            return;
                        } else {
                            Ext.Msg.alert("错误","重置密码失败（原密码为123456）");
                        }
                    }
                },
                failure: function (response, options) {
                    Ext.Msg.alert("错误", "重置密码失败！<br>错误信息：" + response.responseText);
                }
            });
        }
	},
	onListSelect: function (model, sels) {
        var me = this;
        me.getButtonUserEdit().setDisabled(sels.length == 0);
        me.getButtonUserDelete().setDisabled(sels.length == 0);
        me.getButtonUserResetPassword().setDisabled(sels.length == 0);
    }
});
