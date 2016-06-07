		
		//登录验证；
		
			
			function logIn(data){
				
				if(data.userName && data.passWord){
		            return $.ajax({
		                    url:"login.php",        
		                    data:data,
		                    type:"post",
		                    dataType:"json",
		                    
		            })
				};
			}	
						
			
		
		