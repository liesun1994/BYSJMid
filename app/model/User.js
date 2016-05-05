Ext.define('BYSJ.model.User', {
    extend: 'Ext.data.Model',
    fields: [
    	{ name: "user_id", type: "int" },
    	"user_name",
    	"user_realname",
        "user_tel", 
        //{name:"org_id",type:"int"}
        "user_tips",
        "location",
        "longitude",
        "latitude",
        //"access_token"
    ],
    idProperty: ["user_id"]

});
