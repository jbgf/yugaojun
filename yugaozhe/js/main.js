/**
 * Created by Administrator on 2016/1/15.
 */

requirejs.config({

    baseUrl: '/js/lib',

    paths: {
        'jquery'  : 'jquery-1.12.4.min',
        'bootstrap':'bootstrap',
        'first':'../../dist/first',
 
    }, 
    map: {
        '*': {
        'css': 'css'
             }
         },
    shim: {
        bootstrap:{
            deps:[
                'css!../../style/bootstrap.css'
            ]
        },
        first:{
            deps:[
                'jquery',
                'bootstrap',
                'css!../../explore/font-awesome.css',
                'css!../../dist/first.css'
            ]
        }
         
        
    
    }





});


requirejs(['first'],function(first){
        
        
});






