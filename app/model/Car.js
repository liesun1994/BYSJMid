Ext.define('BYSJ.model.Car',{
	extend:'Ext.data.Model',
	fields: [
    	{ name: "car_id", type: "int" },
    	"car_num",
    	"owner_name",
        "owner_tel", 
    ],
    idProperty: ["car_id"]
});