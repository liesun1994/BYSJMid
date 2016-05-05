Ext.define("BYSJ.store.Police", {
    extend: 'Ext.data.Store',
    model: 'BYSJ.model.User',
    batchActions: false,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: true,
    pageSize: 20,       //设置从数据库每次分页数据大小 20条
    proxy: {
        type: "ajax",
        url: 'php/User/getPoliceList.php',
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




