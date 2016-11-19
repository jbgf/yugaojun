/**
 * Created by Administrator on 2016/1/15.
 */

requirejs.config({

    baseUrl: '../../js/lib',

    paths: {
        'jquery'  : 'jquery-1.12.4.min',
        'bootstrap':'bootstrap',
        'getData':'../../getData/getData',
        'common'  : '../../common/common',
        'likePage': '../../html/likePage/likePage'
    }, 
    map: {
        '*': {'css': 'css'}
         },
    shim: {
        bootstrap:{
            deps:[
                'css!../../style/bootstrap.css'
            ]
        },
        common:{
            deps:[
                'jquery',
                'bootstrap',
                'css!../../common/common.css'
            ]
        },
        getData:{
            deps:[
                'jquery'
            ]
        },
        likePage:{
            deps:[
                
                'css!../../html/likePage/likePage.css'
            ]
        }
    }
});
requirejs(["likePage"],function(likePage){
        
        
});






