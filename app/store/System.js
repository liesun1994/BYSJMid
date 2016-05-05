Ext.define("BYSJ.store.System", {
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
            { text: "用户管理",id:'301', leaf: true,controler:'User' },
            { text: "警员管理", id:'302',leaf:true,controler:'Police'},
            { text: "日志查看",id:'303', leaf: true ,controler:'Log'}
        ]
    }
})
