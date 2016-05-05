Ext.define("BYSJ.store.Manager", {
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
            { text: "紧急报警管理",id:'201', leaf: true,controler:'Emergency' },
            { text: "车辆信息管理",id:'203', leaf: true ,controler:'Car'},
        ]
    }
})
