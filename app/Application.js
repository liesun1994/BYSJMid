Ext.Loader.setConfig(
	{enabled:true}
);
global=1;
Ext.application({
    name: "BYSJ",
    appFolder: 'app',
    controllers: ["MainPanel"],
    autoCreateViewport: true,
    launch: function () {
    	//alert(global);
        // 页面加载完成之后执行
        var login=Ext.create('Ext.window.Window',{
					width:320,
					height:160,
					closable:false,
					title:'110报警后台登录',
					modal: true,
					//layout:'fit',
					items:[
						{
							xtype:'form',
            				bodyPadding: 20, 
            				height: 120,width:309,
            				url:"php/User/UserLogin.php",
           					bodyStyle: "background:#DFE9F6",
				            trackResetOnLoad: true,
				            defaultType: "textfield",
				            fieldDefaults: {
				                labelWidth: 100, labelSeparator: "：", anchor: "0"
				            },
				            items: [
								{ fieldLabel: "用户名", name: "user_name", allowBlank: false },
								{ inputType: "password", fieldLabel: "密码", name: "user_password", allowBlank: false },
				            ],
				            dockedItems: [{
				                xtype: 'toolbar', dock: 'bottom', ui: 'footer', layout: { pack: "center" }, 
				                items: [
						    	    { 	text: "登录", width: 80, disabled: true, formBind: true,handler:function(){
						    	    	var form = this.up('form').getForm();
							            if (form.isValid()) {
							                form.submit({
							                    success: function(form, action) {
							                    	var values=form.getValues();
							                    	BYSJ.UserInfo={
							                    		user_name:values['user_name']
							                    	},
							                    	Ext.Msg.alert('信息提示','登录成功');
							                    	login.close();
							                    },
							                    failure: function(form, action) {
							                        Ext.Msg.alert('信息提示','登录失败');
							                    }
							                });
							            }
						    	    }},
						    	    { text: "重置", width: 80,handler:function(){
						    	    	this.up('form').getForm().reset();
						    	    }}
				                ]
				            }]
						}
					]
				});
				login.show();
    }
    
});
