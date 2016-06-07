define(function(){
	    logOut = function(){
				
  				this.logInData;
                
                
                
            };
        logOut.prototype.getUserData = function(){
        return $.ajax({
					                	url: '../login/login.php',
					                	type: 'POST',
					                	
					                	data: {action: 'logOut'}
					                	
					                }) 
        		
        }; 
        var newData = new logOut;  
       
        return newData;
})
  			
                 
                
                

                
