({
    /*node r.js -o build.js*/
    baseUrl: 'js/lib',
    out:'dist/min.js',
    name:"main",
   /*合并的同时压缩baseurl的每个文件，输出到dir*/
   /* dir: 'dest',*/
   /*modules: [         
        {
            name: 'main'
        }
    ],*/
    /*node r.js -o cssIn=config.css out=dist/min.css optimizeCss=standard*/
    
    optimizeCss: 'standard', /*标准压缩 去换行、空格、注释*/
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