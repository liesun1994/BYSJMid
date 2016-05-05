Ext.define("MAP.store.Emergency", {
    extend: 'Ext.data.Store',
    model: 'MAP.model.Emergency',
    batchActions: false,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: true,
    pageSize: 10,       //设置从数据库每次分页数据大小 20条
    proxy: {
        type: "ajax",
        url: 'php/Emergency/getEmUnhandleList.php',
        /*extraParams: {
            username: CSEWebManager.Userinfo.Username
        },*/
        reader: {
            type: 'json',
            root: "data",
            messageProperty: "Msg"
        }
    }
})