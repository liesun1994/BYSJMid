Ext.define('BYSJ.controller.Car', {
    extend: 'Ext.app.Controller',
    models: [
    	"Car"
    ],
	stores: [
        "Car"
    ],
    views: [
        'Car.List','Car.Edit'
    ],

    refs: [
        { ref: "WorkPanel", selector: "#workPanel" },
        { ref: "ButtonCarAdd", selector: "#buttonCarAdd" },
        { ref: "ButtonCarEdit", selector: "#buttonCarEdit" },
        { ref: "ButtonCarDelete", selector: "#buttonCarDelete" }
    ],

    init: function () {
        var me = this,
        panel = me.getWorkPanel();
        me.view = Ext.widget("carlistview");
        panel.add(me.view);
        me.getButtonCarAdd().on("click", me.onAddCar, me);
        me.getButtonCarEdit().on("click",me.onEditCar,me);
        me.getButtonCarDelete().on("click",me.onDeleteCar,me);
        Ext.getCmp("workPanel").down("gridpanel").on("selectionchange", me.onListSelect, me);
        me.control({
        });
    },
	onAddCar:function(){
		var me = this;
        win = BYSJ.view.Car.Edit;
        model = me.getCarModel();
        win.form.getForm().url = "php/Car/addCar.php";
        win.setTitle("添加车辆信息");
        var newdata = new model;
        win.form.getForm().reset();
        win.form.loadRecord(newdata);
        win.show();
	},
	onEditCar:function(){
		var me = this,
        list = Ext.getCmp("workPanel").down("gridpanel"),
        rs = list.getSelectionModel().getLastSelected();
        if (rs) {
            var win = BYSJ.view.Car.Edit;
            win.form.getForm().url = "php/Car/updateCar.php";
            win.setTitle("编辑车辆信息");
            win.form.load({
                url: "php/Car/getCarById.php",
                params: { car_id: rs.data.car_id },
                success: function (form, action) {
                    this.show();
                },
                failure: BYSJ.FormSubmitFailure,
                scope: win
            });
        }
	},
	onDeleteCar: function(){
		var me = this,
        list = Ext.getCmp("workPanel").down("gridpanel"),
        rs = list.getSelectionModel().getSelection();
        if (rs.length > 0) {
            Ext.Msg.confirm("删除内容", "是否确定删除选中的内容？", function (btn) {
                if (btn == "yes") {
                    Ext.each(rs, function (item) {
                        Ext.Ajax.request({
                            url: "php/Car/deleteCar.php",
                            params: {
                                car_id: item.data.car_id
                            },
                            method: "POST",
                            async: false,
                            failure: function (resp, opts) {
                                var respText = Ext.util.JSON.decode(resp.responseText);
                                Ext.Msg.alert('错误', respText.Msg);
                                return;
                            }
                        });
                        list.getStore().remove(item);
                    });
                }
            }, list)
        }
	},
	onListSelect: function (model, sels) {
        var me = this;
        me.getButtonCarEdit().setDisabled(sels.length == 0);
        me.getButtonCarDelete().setDisabled(sels.length == 0);
    }
});
