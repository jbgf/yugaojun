/**
 * Created by Administrator on 2016/1/15.
 */

requirejs.config({

    baseUrl: '/js/lib',

    paths: {
        'jquery'  : 'jquery-1.12.4.min',
        'bootstrap':'bootstrap',
        'min':'../../dist/min',
 
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
        min:{
            deps:[
                'jquery',
                'bootstrap',
                'css!../../explore/font-awesome.css',
                'css!../../dist/min.css'
            ]
        }
         
        
    
    }





});


requirejs(['min'],function(min){
        
        
});






