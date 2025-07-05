require('Views.MyUser', 'View');
OGX.Views.MyUser = function(__config){
    construct(this, 'Views.MyUser');
	'use strict'; 
    var user = __config.data;
    var list;

    //@Override
    this.construct = function(__data){
        list = app.cfind('DynamicList', 'mylist');
        OGX.Form.bindForm({
            el:'#userdata_'+user._id,
            change_cb:onFormChange,
            validate:true,
            wait:1500,
            fields:{
                first_name:{},
                last_name:{},
                email:{},
                phone:{
                    mask:'%%%-%%%-%%%%'
                }
            }
        });
    };
    
    //@Override
	this.onFocus = function(){};
	
    //@Override
	this.onBlur = function(){};    
	
    //@Override
	this.ux = function(__bool){
        if(__bool){
          
        }else{
            
        }
    }; 
    
    //@Override
    this.destroy = function(){
        OGX.Form.unbindForm('#userdata_'+user._id);
    };

    function onFormChange(__obj){
        if(__obj.valid){
            list.findUpdate('_id', user._id, __obj.obj, false, 1);
            //remote call POST ... 
        }
    }

};