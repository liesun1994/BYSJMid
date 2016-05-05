Ext.define('BYSJ.view.User.Changeinfo', {
    extend: 'Ext.container.Container',
    alias: 'widget.changeinfoview',

    initComponent: function () {
        var me = this;
        me.form = Ext.create(Ext.form.Panel, {
        	title:'修改个人信息',
            border: 1, bodyPadding: 20, height: 180,width:300,
            bodyStyle: "background:#DFE9F6",
            trackResetOnLoad: true,
            defaultType: "textfield",
            fieldDefaults: {
                labelWidth: 100, labelSeparator: "：", anchor: "0"
            },
            items: [
				{  fieldLabel: "姓名", name: "user_name", allowBlank: false },
				{  fieldLabel: "电话", name: "user_tel", allowBlank: false },
				{  fieldLabel: "用户说明", name: "user_tips", allowBlank: false },
            ],
            dockedItems: [{
                xtype: 'toolbar', dock: 'bottom', ui: 'footer', layout: { pack: "center" }, 
                items: [
		    	    { text: "修改", width: 80, disabled: true, formBind: true, handler: me.onSave, scope: me },
                ]
            }]
        });

        me.items = [me.form];

        me.callParent(arguments);
    },
   onSave: function () {
      /*   var me = this,
            f = me.form.getForm();
        if (f.isValid()) {
            var username = CSEWebManager.Userinfo.Username;
            var oldpassword = f.findField('oldpassword').getValue();
            var newpassword = f.findField('newpassword').getValue();
            var renewpassword = f.findField('renewpassword').getValue();
            if (newpassword == renewpassword) {
                Ext.Ajax.request({
                    params: { username: username,oldpassword:oldpassword,newpassword:newpassword },
                    url: '/Users/ChangePassword',
                    scripts: true,
                    scope: me,
                    success: function (response, opt) {
                        var obj = Ext.JSON.decode(response.responseText);
                        if (obj) {
                            if (obj.success) {
                                Ext.Msg.alert("提示信息", "重置密码成功");
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
            
        }*/
    }

});