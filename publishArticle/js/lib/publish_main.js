/**
 * Created by Administrator on 2016/1/29.
 */
requirejs.config({

    baseUrl:'js/app',
    //urlArgs: "bust=v2",
    paths: {
        'editor':'editor',
        'summernote-zh':'summernote-zh-CN',
        'jquery':'../../../js/lib/jquery-1.11.3'
        
    },
    map: {
        '*': {
            'css': '../../../js/lib/css'
        }
    },
   
 shim: {
//在线编辑器summernote——————————————————————————————————————————————
        editor:{
            deps:[
                'summernote-zh'
            ]
        },
        'summernote-zh':{
            deps:[
                    'jquery',
                    'css!../../../style/bootstrap.css',
                    'css!../../css/summernote.css',
                    'js/app/summernote.min.js',
                    '../js/lib/bootstrap.js',
                    'css!http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css',
            ]
        }
//——————————————————————————————————————————————————————

    }





});

// Start the main app logic.
requirejs(['editor'],function(editor){

})