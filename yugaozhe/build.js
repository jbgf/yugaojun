({
    
    baseUrl: 'js/lib',
    dir: 'dest',
    modules: [
        {
            name: 'main_origin'
        }
    ],
   
    optimizeCss: 'standard',
    removeCombined: false,
    optimize: "uglify",
    findNestedDependencies: true,
    
    paths: {
        
        'logOut':'../../login/logOut',
        'getData':'../../getData/getData',
        'head'    : '../../head/head',
        'sideBar' : '../../sideBar/sideBar',
        'poster'  : '../../poster/poster',
        'common'  : '../../common/common',
        'details' : '../../details/details',
     
        'comment' : '../../comment/comment',
        'explore':'../../explore/explore',
        'tile':'../../explore/tile',
        'like':'../../like/like',
        'pagination':'../../pagination/pagination',
        'backButton':'../../backButton/backButton'
   
    },
    
    shim: {
       
        backButton:{
            deps:[
               
                'explore',
                'details',
                'poster'
            ]
        },
       
        like:{
            deps:[
               
                'getData',
                'poster',
            
            ]
        },

        head: {
            deps: [
               
                'comment',
               
            ]
        },
        poster:{
            deps:[
              
                'head',
                
                'common',
                'logOut',
              
            ]
        },
        pagination:{
            deps:[
                'poster',
                "getData",
             
            ]
        },
        sideBar: {
            deps: [
               
                'getData',
                'head',
                'common',
                'logOut',
                'poster',
              
                'explore'
                
            ]
        },
        explore:{
            deps:[
               
                'getData',
                'common',
                'tile',
            ]
        },
       
        details:{
            deps:[
               
                "head",
                "poster",
             
                'comment',
                'common'
            ]
        }
    
    }
    

})