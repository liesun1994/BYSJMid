Ext.define('BYSJ.model.Menu', {
    extend: 'Ext.data.Model',
    fields: ["text", "id", {
        name: 'leaf',
        type: 'boolean'
    }, {
        name: 'controler', // 补充属性，相关说明文档ID
        type: 'string'
    }
    ]
});
