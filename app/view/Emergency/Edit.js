Ext.define("BYSJ.view.Emergency.Edit", {
    extend: "Ext.window.Window",
    requires: [
    "BYSJ.store.EmergencyInfo"

    ],
    hideMode: 'offsets',
   // closeAction: 'hide',
    closable: true,
    resizable: true,
    title:'警务分配地图',
    layout: "border",
    width: 1225,
    height: 650,
    modal: true,
   // singleton: true,
    bodyPadding: "0 0 10 0",


   initComponent: function () {
        var me = this;
        var store=Ext.create('BYSJ.store.Emergency', {
            id: 'emergencyInfo'
        });
        var records = store.getRange(0, 1);   
        for (var i = 0; i < records.length; i++) {  
             var record = records[i];  
             alert(record.get('id'));   
        }  ;
        me.form=Ext.create(Ext.form.Panel,{
        	id:'empanel',
        	width:300,
        	minWidth:300,
        	maxWidth:380,
        	border: false, bodyPadding: 20,   //原来信息中包含height 可能引起其他问题
            bodyStyle: "background:#DFE9F6",
            trackResetOnLoad: true,
        	region: 'west',
        	fieldDefaults: {
                labelWidth: 80, labelSeparator: "：", anchor: "0"
            },
        	items:[
        		{ xtype: "hidden", name: "emergency_id" },
                { xtype: "textfield", fieldLabel: "报警人", name: "user_realname", readOnly:true},
				{ xtype: "textfield", fieldLabel: "联系方式", name: "user_tel", readOnly:true },
				{ xtype: "textfield", fieldLabel: "报警类别", name: "emergency_type", allowBlank: true,readOnly:true },
				{ xtype: "textfield", fieldLabel: "报警文本", name: "emergency_text", allowBlank: true },
				{ xtype: "textfield", fieldLabel: "状态", name: "status", allowBlank: false ,readOnly:true},
				{ xtype: "textfield", fieldLabel: "报警时间", name: "emergency_time", allowBlank: false,readOnly:true },
				{ xtype: "textfield", fieldLabel: "处理人ID", name: "handler_id", allowBlank: true },
        		{ xtype: "textfield", fieldLabel: "处理信息", name: "handler_text", allowBlank: true },
        		{ xtype: "textfield", fieldLabel: "处理时间", name: "handler_time", allowBlank: true,readOnly:true  },
        	],
        	dockedItems: [{
                xtype: 'toolbar', dock: 'bottom', ui: 'footer', layout: { pack: "center" }, 
                items: [
		    	    { text: "保存", width: 80, disabled: true, formBind: true, handler: me.onSave, scope: me },
		    	    { text: "重置", width: 80, handler: me.onReset, scope: me }
			    ]
            }]
        });
        me.mapinfo=Ext.widget('panel',{
        	id:'mappanel',
        	region: 'center',
        	layout : 'fit',
			width:900,
			height:560,
			title:'附近警员',
			store:'EmergencyInfo',
			html: '<iframe id="orgSet" name="orgSet" src="map.php?emid='+global+'" frameborder="0" width="100%" height="100%"></iframe>',
        });
        me.items = [me.form,me.mapinfo];
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
                    me.close();
                },
                failure: function(){
                	Ext.Msg.alert('提示','操作失败');
                },
                scope: me
            });
        }
    }
})