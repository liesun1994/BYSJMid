Ext.define('BYSJ.view.User.Changepassword', {
    extend: 'Ext.container.Container',
    alias: 'widget.changepasswordview',

    initComponent: function () {
        var me = this;
        me.form = Ext.create(Ext.form.Panel, {
        	title:'修改密码',
            border: 1, bodyPadding: 20, height: 180,width:300,
            bodyStyle: "background:#DFE9F6",
            trackResetOnLoad: true,
            defaultType: "textfield",
            fieldDefaults: {
                labelWidth: 100, labelSeparator: "：", anchor: "0"
            },
            items: [
				{ inputType: "password", fieldLabel: "原密码", name: "oldpassword", allowBlank: false },
				{ inputType: "password", fieldLabel: "新密码", name: "newpassword", allowBlank: false },
				{ inputType: "password", fieldLabel: "重复新密码", name: "renewpassword", allowBlank: false },
            ],
            dockedItems: [{
                xtype: 'toolbar', dock: 'bottom', ui: 'footer', layout: { pack: "center" }, 
                items: [
		    	    { text: "修改", width: 80, disabled: true, formBind: true, handler: me.onSave, scope: me },
		    	    { text: "重置", width: 80, handler: me.onReset, scope: me }
                ]
            }]
        });

        me.items = [me.form];

        me.callParent(arguments);
    },

    onReset: function () {
    	//alert(BYSJ.UserInfo.user_name);
    	//alert('123');
      	//alert(''+session.getAttribute(("user_name"));
        var me = this;
        me.form.getForm().reset();
    },

   onSave: function () {
         var me = this,
            f = me.form.getForm();
        if (f.isValid()) {
        	var user_name=BYSJ.UserInfo.user_name;
            var oldpassword = f.findField('oldpassword').getValue();
            var newpassword = f.findField('newpassword').getValue();
            var renewpassword = f.findField('renewpassword').getValue();
            if (newpassword == renewpassword) {
                Ext.Ajax.request({
                    params: { user_name: user_name,oldpwd:oldpassword,newpwd:newpassword },
                    url: 'php/User/updateUserpwd.php',
                    scripts: true,
                    scope: me,
                    success: function (response, opt) {
                        var obj = Ext.JSON.decode(response.responseText);
                        if (obj) {
                            if (obj.success) {
                                Ext.Msg.alert("提示信息", "修改密码成功");
                                return;
                            } else {
                                Ext.Msg.alert("错误", obj.msg);
                            }
                        }
                    },
                    failure: function (response, options) {
                        Ext.Msg.alert("错误", "重置密码失败！<br>错误信息：" + response.responseText);
                    }
                });
            } else {
                Ext.Msg.alert("错误", "两次输入新密码不一致！" );
            }
            
        }
    }

});