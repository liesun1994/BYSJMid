Ext.define('BYSJ.controller.MainPanel', {
    extend: 'Ext.app.Controller',
    init: function () {
        this.control({
            '#menuPanel': {
                afterlayout: {
                    single: true,
                    fn: function (panel) {
                      this.application.getController('Menu').init();
                    }
                   /*fn:function(panel){
                  		 Ext.Msg.alert('asd','hh');
                   }*/
                }
            },
           '#workPanel': {
	            afterlayout: {
	                    single: true,
	                    fn: function (panel) {
	                        this.application.getController('Emergency').init();
	                    }
	                }
	            }
        });
    }
});
