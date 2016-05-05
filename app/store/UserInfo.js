Ext.define("BYSJ.store.UserInfo", {
    extend: 'Ext.data.Store',
    model: 'BYSJ.model.User',
    batchActions: false,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: true,
    pageSize: 20,       //设置从数据库每次分页数据大小 20条
    proxy: {
        type: "ajax",
        url: 'php/User/getUserById.php',
        reader: {
            type: 'json',
            root: "data",
            messageProperty: "Msg"
        }
    }
    /*autoLoad: true,
    data:{"success":true,"total":3,"msg":"\u67e5\u627e\u6210\u529f","data":[{"user_id":"1","user_name":null,"user_realname":"aaa","user_tel":"sss","location":null,"longitude":"104.07642","latitude":"38.6518","user_tips":"123"},{"user_id":"2","user_name":null,"user_realname":"\u738b\u5c3c\u739b","user_tel":"18362891234","location":null,"longitude":"104.07642","latitude":"38.6518","user_tips":"\u7075\u9b42\u6b4c\u624b"},{"user_id":"7","user_name":null,"user_realname":"\u674e\u946b","user_tel":"0518-110","location":null,"longitude":null,"latitude":null,"user_tips":"\u8fd9\u662f\u4e2a\u667a\u969c"}]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'data'
        }
    }*/
})





