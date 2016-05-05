Ext.define('MAP.model.Emergency',{
	extend:'Ext.data.Model',
	fields: [
    	{ name: "emergency_id", type: "int" },
    	"user_realname",
    	"user_tel",
        "location", 
       	"longitude",
       	"latitude",
       	"status",
       	"emergency_time"
    ],
    idProperty: ["emergency_id"]
});