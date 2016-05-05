Ext.define('BYSJ.model.Result',{
	extend:'Ext.data.Model',
	fields: [
    	{ name: "result_id", type: "int" },
    	"handler_name",
    	"handler_tel",
        "result_text", 
       	"result_time"
    ],
    idProperty: ["result_id"]
});