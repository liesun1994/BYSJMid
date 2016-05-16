Ext.define("BYSJ.store.Test", {
    extend: 'Ext.data.Store',
    model: 'BYSJ.model.Emergency',
    batchActions: false,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: true,
    //pageSize: 20,       //设置从数据库每次分页数据大小 20条
    proxy: {
        type: "ajax",
        url: 'php/Emergency/getEmergencyInfo.php',
        reader: {
            type: 'json',
            root: "data",
            messageProperty: "Msg"
        }
    }
})