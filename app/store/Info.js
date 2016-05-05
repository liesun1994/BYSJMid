Ext.define("BYSJ.store.Info", {
    extend: 'Ext.data.TreeStore',
    batchActions: false,
    remoteFilter: false,
    remoteSort: false,
    autoLoad: true,
    model: "BYSJ.model.Menu",
    root: {
    	text:'根',
        expanded: true,
        children: [
            //{ text: "修改个人信息",id:'123', leaf: true,controler:'Changeinfo' },
            { text: "修改密码", id:'234',leaf:true,controler:'Changepassword'}
        ]
    }
})
