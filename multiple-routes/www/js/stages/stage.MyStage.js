require('Stages.MyStage', 'Stage');
OGX.Stages.MyStage = function(__obj){
    construct(this, 'Stages.MyStage');
	'use strict';
    let win, list;

    //@Override
	this.construct = function(){
        win = this.children('Window')[0];
        list = win.children('DynamicList')[0];
    };
	
    //@Override
	this.onFocus = function(){};
	
    //@Override
	this.onBlur = function(){};   

    //@Override
	this.onResize = function(){};
	
    //@Override
	this.ux = function(__bool){
        if(__bool){
            this.on(this.touch.down, '.icon_menu', function(__e){
                win.show();
            });
            list.on(OGX.DynamicList.SELECT, function(__e, __obj){
                win.hide();
                app.goto(__obj.route);
            });
        }else{
            this.off(this.touch.down, '.icon_menu');
            list.off(OGX.DynamicList.SELECT);
        }
    };

    //@Override
    this.destroy = function(){};
};