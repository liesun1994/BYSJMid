Ext.define("BYSJ.view.User.Edit", {
    extend: "Ext.window.Window",
    hideMode: 'offsets',
    closeAction: 'hide',
    closable: true,
    resizable: true,
    layout: "fit",
    width: 400,
    height: 195,
    modal: true,
    singleton: true,
    bodyPadding: "0 0 10 0",


   initComponent: function () {
        var me = this;
        me.form = Ext.create(Ext.form.Panel, {
            border: false, bodyPadding: 5, 
            bodyStyle: "background:#DFE9F6",
            trackResetOnLoad: true,
            fieldDefaults: {
                labelWidth: 80, labelSeparator: "：", anchor: "0"
            },
            items: [
                { xtype: "hidden", name: "user_id" },
                { xtype: "textfield", fieldLabel: "登录名", name: "user_name", allowBlank: false},
				{ xtype: "textfield", fieldLabel: "姓名", name: "user_realname", allowBlank: false },
				{ xtype: "textfield", fieldLabel: "联系方式", name: "user_tel", allowBlank: false },
				{ xtype: "textfield", fieldLabel: "用户说明", name: "user_tips", allowBlank: false }
            ],
            dockedItems: [{
                xtype: 'toolbar', dock: 'bottom', ui: 'footer', layout: { pack: "center" }, 
                items: [
		    	    { text: "保存", width: 80, disabled: true, formBind: true, handler: me.onSave, scope: me },
		    	    { text: "重置", width: 80, handler: me.onReset, scope: me }
			    ]
            }]
        });
      
        me.items = [me.form];
        me.callParent(arguments);
    },

    onReset: function () {
        var me = this;
        me.form.getForm().reset();
    },

    onSave: function () {
        var me = this,
			f = me.form.getForm();
        if (f.isValid()) {
            f.submit({
                //waitMsg: "正在保存，请等待……",
                //waitTitle: "正在保存",
                success: function (form, action) {
                    var me = this;
                     Ext.getCmp("workPanel").down("gridpanel").getStore().load();
                    me.close()
                },
                failure: function(){
                	Ext.Mag.alert('提示','操作失败');
                },
                scope: me
            });
        }
    }
})