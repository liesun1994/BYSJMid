Ext.define('BYSJ.controller.Changepassword', {
    extend: 'Ext.app.Controller',
    models: [
    ],

    views: [
        'User.Changepassword'
    ],

    refs: [
        { ref: "WorkPanel", selector: "#workPanel" },
       // { ref: "ChangepasswordView", selector: "#changepasswordView" }
    ],

    init: function () {
        var me = this,
            panel = me.getWorkPanel();
        me.view = Ext.widget("changepasswordview");
        panel.add(me.view);
        me.control({
        });
    }

});
