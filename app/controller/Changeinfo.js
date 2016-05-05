Ext.define('BYSJ.controller.Changeinfo', {
    extend: 'Ext.app.Controller',
    models: [
    ],

    views: [
        'User.Changeinfo'
    ],

    refs: [
        { ref: "WorkPanel", selector: "#workPanel" },
    ],

    init: function () {
        var me = this,
            panel = me.getWorkPanel();
        me.view = Ext.widget("changeinfoview");
        panel.add(me.view);
        me.control({
        });
    }

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

});
