Ext.define('BYSJ.controller.Menu', {
    extend: 'Ext.app.Controller',
    models: [
        "Menu"
    ],

    stores: [
        "Info","Manager","System"
    ],

    views: [
        'Menu.Info',"Menu.Manager","Menu.System"
    ],

    refs: [
         { ref: "MenuPanel", selector: "#menuPanel" },
         { ref: "WorkPanel", selector: "#workPanel" },
//       { ref: "InfoMenuView", selector: "#infoMenuView" }
    ],

    init: function () {
        var me = this,
        panel = me.getMenuPanel();
        me.infomenuview = Ext.widget("infomenuview");
        panel.add(me.infomenuview);
        me.managermenuview = Ext.widget("managermenuview");
        panel.add(me.managermenuview);
        me.systemmenuview = Ext.widget("systemmenuview");
        panel.add(me.systemmenuview);
        me.infomenuview.on("itemclick", me.onTreeSelect, me);
        me.managermenuview.on("itemclick", me.onTreeSelect, me);
        me.systemmenuview.on("itemclick", me.onTreeSelect, me);
        me.control({
        });
    },

    onTreeSelect: function (model, record) {
        var me = this,
        controler = record.get('controler');
    //    Ext.Msg.alert('as',controler);
        panel = me.getWorkPanel();
        panel.removeAll();
        me.control({
            '#workPanel': {
                afterlayout: {
                    single: true,
                    fn: function (panel) {
                        this.application.getController(controler).init();
                    }
                }
            }
        });
        panel.doLayout();
  
    }
});
