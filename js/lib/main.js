/**
 * Created by Administrator on 2016/1/15.
 */

requirejs.config({

    baseUrl: './js/lib',

    paths: {
        'jquery'  : 'jquery-1.12.4.min',
        'bootstrap':'bootstrap',
        'logOut':'../../login/logOut',
        'getData':'../../getData/getData',
        'head'    : '../../head/head',
        'sideBar' : '../../sideBar/sideBar',
        'poster'  : '../../poster/poster',
        'common'  : '../../common/common',
        'details' : '../../details/details',
        'ad'      : '../../ad/ad',
        'comment' : '../../comment/comment',
        'explore':'../../explore/explore',
        'tile':'../../explore/tile',
        'like':'../../like/like',
        'pagination':'../../pagination/pagination',
        'backButton':'../../backButton/backButton'

        
        
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
        backButton:{
            deps:[
                'css!../../backButton/backButton.css',
                'explore',
                'details',
                'poster'
            ]
        },
        common:{
            deps:[
                'jquery',
                'bootstrap',
                'css!../../common/common.css'
                

            ]
        },
        like:{
            deps:[
                'jquery',
                'getData',
                'poster',
             //   'css!../../like/like.css',//
                

            ]
        },

        comment:{
            deps:[
                'jquery',
                'css!../../comment/comment.css',
                'ad'
            ]
        },
        getData:{
            deps:[
                'jquery'
            ]
        },
        logOut:{
            deps:[
                'jquery'

            ]
        },
        head: {
            deps: [
                'jquery',
                'bootstrap',
                'comment',
                'css!../../head/head.css'
            ]
        },
        poster:{
            deps:[
                'bootstrap',
                'head',
                
                'common',
                'logOut',
                'css!../../poster/poster.css',
            ]
        },
        pagination:{
            deps:[
                'poster',
                "getData",
                'css!../../pagination/pagination.css'
            ]
        },
        sideBar: {
            deps: [
                'bootstrap',
                'getData',
                'head',
                'common',
                'logOut',
                'poster',
                'css!../../sideBar/sideBar.css',
                'explore'
                
            ]
        },
        tile:{
            deps:[
                'jquery',
                'bootstrap',
                'css!../../explore/tile.css',
                'css!../../explore/font-awesome.css'
            ]
        },
        explore:{
            deps:[
                'jquery',

                'bootstrap',
                'css!../../explore/explore.css',
                'tile',
                'getData',
                'common'
                
            ]
        },
        ad:{
            deps:[
                'jquery',
                'bootstrap',
                'css!../../ad/ad.css'
            ]     
        },
        details:{
            deps:[
                'bootstrap',
                'css!../../details/details.css',
                'jquery',
                "head",
                "poster",
                'ad',
                'comment',
                'common'
            ]
        }
   
    }





});


requirejs(['head','sideBar','like',"details","pagination","backButton"],function(head,sideBar,like,details,pagination,backButton){
        
        
});






