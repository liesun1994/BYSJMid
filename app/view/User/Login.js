/// <reference path="../Ext.js" />

Ext.define("Ext.ux.Login", {
    extend: "Ext.window.Window",
    singleton: true,
    title: '网站后台管理系统登录窗口',
    width: 450,
    height: 300,
    modal: true,
    closable: false,
    resizable: false,
    closeAction: 'hide',
    hideMode: 'offsets',

    initComponent: function () {
        var me = this;
        me.form = Ext.create(Ext.form.Panel, {
            border: false,
            bodyPadding: 5,
            bodyStyle: "background:#DFE9F6",
            url: "../Account/Login",
            defaultType: "textfield",
            fieldDefaults: {
                labelWidth: 80,
                labelSeparator: "：",
                anchor: "0",
                allowBlank: false
            },
            items: [
				{
				    fieldLabel: "用户名", name: "UserName"
				},
				{
				    fieldLabel: "密码", name: "Password", inputType: "password"
				},
			],
            dockedItems: [{
                xtype: 'toolbar', dock: 'bottom', ui: 'footer', layout: { pack: "center" },
                items: [
		    	    { text: "登录", width: 80, disabled: true, formBind: true, handler: me.onLogin, scope: me },
		    	    { text: "重置", width: 80, handler: me.onReset, scope: me }
			    ]
            }]
        });

        me.items = [me.form]

        me.callParent(arguments);

    },


    onReset: function () {
        var me = this;
        me.form.getForm().reset();
        if (me.form.items.items[0]) {
            me.form.items.items[0].focus(true, 10);
        }
    },

    onLogin: function () {
        var me = this,
			f = me.form.getForm();
        if (f.isValid()) {
            f.submit({
                //waitMsg: "正在登录，请等待……",
                //waitTitle: "正在登录",
                success: function (form, action) {
                	window.location.reload();
                },
                failure: BYSJ.FormSubmitFailure,
                scope: me
            });
        }
    }


});