Ext.define('BYSJ.model.Log',{
	extend:'Ext.data.Model',
	fields: [
    	{ name: "log_id", type: "int" },
    	"log_text",
    	"log_time"
    ],
    idProperty: ["log_id"]
});