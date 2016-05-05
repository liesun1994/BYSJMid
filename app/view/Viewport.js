Ext.define('BYSJ.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'border',

    initComponent: function () {
        var me = this;
        me.header = Ext.widget("toolbar",{
            height: 53, region: 'north',
            items: [
                { xtype: 'component', cls: 'logo', html: '110报警系统后台' },
                "->",
                { iconCls: "logout", tooltip: "退出", scale: "large",
                    handler: function () {
                        window.location = "index.html";
                    }
                }
            ]}
            ),
        me.footer = Ext.widget("toolbar", {
            height: 25, region: 'south',
            items: ["->", { xtype: 'component', html: '江苏科技大学计算机科学与工程学院2016' }]
        }),
        me.items = [
            me.header,me.footer,
            {
                xtype: "panel", id: "menuPanel", width: 280,minWidth:230,maxWidth:320, region: 'west', split: true, layout: "accordion"
            },
            {
                xtype: "panel", id: "workPanel", region: 'center',
                layout: 'fit',
                autoScroll: true
            }
        ];

        me.callParent(arguments);
    }

});