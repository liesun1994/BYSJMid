Ext.Loader.setConfig(
	{enabled:true}
);
Ext.application({
    name: "MAP",
    appFolder: 'map',
    controllers: ["MainPanel"],
    autoCreateViewport: true,
    launch: function () {
        // 页面加载完成之后执行
    }
});