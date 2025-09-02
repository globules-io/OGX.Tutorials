require('Views.MyView', 'View');
OGX.Views.MyView = function(__config){
    construct(this, 'Views.MyView');
	'use strict'; 
    let carousel;

    //@Override
	this.construct = function(){
        carousel = this.children('Carousel')[0];
        if(this.data && this.data.hasOwnProperty('index')){
            carousel.index(this.data.index);
        };
        app.router.onpopstate = (__url, __data) => {
            carousel.index(__data.index);
            return true;
        };
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
            carousel.on(OGX.Carousel.CHANGE, (__e, __index) => {
                app.router.add('mystage/home/'+__index);
            });
        }else{
           carousel.off(OGX.Carousel.CHANGE);
        }
    };

    //@Override
    this.destroy = function(){};
};