Ext.define('BYSJ.model.Emergency',{
	extend:'Ext.data.Model',
	fields: [
    	{ name: "emergency_id", type: "int" },
    	"user_realname",
    	"user_tel",
        "location", 
        "emergency_type",
        "emergency_text",
       	"longitude",
       	"latitude",
       	"status",
       	"emergency_time",
       	"handler_name",
       	"handler_tel",
       	"handler_text"
    ],
    idProperty: ["emergency_id"]
});