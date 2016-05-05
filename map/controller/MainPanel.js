Ext.define('MAP.controller.MainPanel', {
    extend: 'Ext.app.Controller',
    init: function () {
        this.control({
            '#menuPanel': {
                afterlayout: {
                    single: true,
                    fn: function (panel) {
                      this.application.getController('Menu').init();
                    }
                }
            },
           '#workPanel': {
	            afterlayout: {
	                    single: true,
	                    fn: function (panel) {
	                        this.application.getController('BMap').init();
//	                    	Ext.Msg.alert('asd','hh');
	                    }
	                }
	            }
        });
    }
});
