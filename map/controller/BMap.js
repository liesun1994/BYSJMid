Ext.define('MAP.controller.BMap', {
    extend: 'Ext.app.Controller',
   models: [
    ],
    stores: [
    ],
    views: [
        'Map.Show'
    ],
    refs: [
         { ref: "WorkPanel", selector: "#workPanel" },
    ],

    init: function () {
        var me = this,
        panel = me.getWorkPanel();
        me.mapshow = Ext.widget("mapshow");
        panel.add(me.mapshow);
        me.control({
        });
    }
  })
    