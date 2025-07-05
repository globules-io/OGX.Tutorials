require('Views.MyView', 'View');
OGX.Views.MyView = function(__config){
    construct(this, 'Views.MyView');
	'use strict'; 
    var list, win;
    var selected_user = null;

    //@Override
    this.construct = function(__data){
        list = app.cfind('DynamicList', 'mylist');
    };
    
    //@Override
	this.onFocus = function(){};
	
    //@Override
	this.onBlur = function(){};    
	
    //@Override
	this.ux = function(__bool){
        if(__bool){
            list.el.on(OGX.DynamicList.SELECT, renderUser);
            this.el.on(this.touch.down, '.add', createUser);
        }else{
            list.el.off(OGX.DynamicList.SELECT, renderUser);
            this.el.off(this.touch.down, '.add', createUser);
        }
    }; 
    
    //@Override
    this.destroy = function(){};

    function renderUser(__e, __user){
        if(app.windowExists('userWindow')){
            app.removeWindow('userWindow');
        }
        selected_user = __user._id;
        win = app.addWindow({
            id:'userWindow',
            title:__user.first_name+' '+__user.last_name,
            width:'100%',
            height:'100%',
            anim:'right',
            show:true,
            icons:[{icon:'/themes/io-globules-ogx/dark/img/remove.svg', callback:deleteUser}],
            'node:OML':[
                {
                    'default:Views.MyUser':{
                        id:'user_'+__user._id,
                        template:'MyUser',
                        css:'MyUser',
                        data:__user
                    }
                }
            ]
        });
    }

    function createUser(){
        var usr = {_id:99, first_name:'New', last_name:'User', email:'', phone:''};
        list.insert(usr);
    }

    function deleteUser(){
        app.addOverlay();
        app.addPopup({
            id:'myPopup',
            title:'Remove User?',
            width:300,
            height:200,
            html:'<span class="message">Are you sure you want to delete this user?</span>',
            buttons:[{label:'YES', callback:onDeleteUser}, {label:'CANCEL', callback:onCancelDelete}]
        });
    }

    function onDeleteUser(){
        list.findDelete('_id', selected_user, 1);
        app.removeWindow('userWindow');
        onCancelDelete();
    }

    function onCancelDelete(){
        app.removeOverlay();
        app.removePopup('myPopup');
    }

};