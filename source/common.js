	 /**
	  * 查看资料
	  */
	 function showProfile(emplId,state){
		 if (state==1){
			 dd.device.notification.alert({
				    message: "工单待派工",
				    title: "提示",//可传空
				    buttonName: "确定",
				    onSuccess : function() {
				    },
				    onFail : function(err) {}
				});

		 }else{
		 
		 dd.device.notification.actionSheet({
			    title: "提示", //标题
			    cancelButton: '取消', //取消按钮文本
			    otherButtons: ["查看ta的资料","和ta聊天","给ta打电话","钉ta一下"],
			    onSuccess : function(result) {

			    	if (result.buttonIndex==0){
			            dd.biz.util.open({
				 		    name:'profile',
				 		    params:{'id':emplId,'corpId':_config.corpId},
				 		    onSuccess : function() {
				 		    },
				 		    onFail : function(err) {
				 		    }
				 		});
			         }else if (result.buttonIndex==1){
			            dd.biz.util.open({
			            	name:'chat',
			 			    params:{'users':[emplId],'corpId':_config.corpId},
				 		    onSuccess : function() {
				 		    },
				 		    onFail : function(err) {
				 		    }
				 		});
			         }
			         else if (result.buttonIndex==2){
			        		dd.biz.telephone.call({
			        		    users: [emplId], //用户列表，工号
			        		    corpId: _config.corpId, //企业id
			        		    onSuccess : function() {
			        		    },
			        		    onFail : function() {
			        		    	dd.device.notification.alert({
		        	          		    message: "不能给自己打电话呦",
		        	          		    title: "提示",//可传空
		        	          		    buttonName: "确定",
		        	          		    onSuccess : function() {
		        	          		    },
		        	          		    onFail : function(err) {}
		        	          		});
			        		    }
			        		})
			         }
			         else if (result.buttonIndex==3){
			        	 dd.biz.ding.post({
			     		    users : [emplId],
			     		    corpId: _config.corpId, 
			     		    type: 2,
			     		    alertType: 2,
			     		    alertDate: {"format":"yyyy-MM-dd HH:mm","value":""},
			     		    text: '',
			     		    onSuccess : function() {
			     		    },
			     		    onFail : function() {
			     		    }
			     		})
			         }
			    	
			    },
			    onFail : function(err) {}
				})
		 	}
	 	}
	 
	 
	 
	 
	 
		//返回按钮(android)
		function back(){
			document.addEventListener('backbutton', function(e) {
			    e.preventDefault();
			    dd.device.notification.alert({
			        message: '点击返回键返回上一级菜单或点击左上角关闭',
			        title: '提示'
			    });
			}, false);
		}
		
		
		
		
		//分类(已完成/未完成)
		function classify(){
			dd.ready(function() {
			$("#unComplete").click(function(){
				showUnComplete();
			}),
			$("#complete").click(function(){
				showComplete();
				});
			})
		}
		
		
		
		/**
		 * 点击查看大图
		*/
		function showBigImg(url){
			dd.biz.util.previewImage({
			    urls: [url],
			    current: url,
			    onSuccess : function(result) {},
			    onFail : function() {}
			})
		}
		
		
		
		
		
		
		/**
		 * 未完成工单列表---(工单管理,工单派工)
		 */
		function showUnComplete(){
			showPreloader();
			 $.ajaxSettings.async = true; 
			 $.ajax({
		      url:"/dingTalk/getWorkOrderList.jhtml" ,  
		      type:"post",
		      success:function(data){
		   	   	  $("#unCompleteTable").html('');
				if (data=="[]"){
					$("#unCompleteTable").html('<tr align="center" valign="middle" style="background:#f6f6f6;"><td colspan="2" style="color:#999">暂无数据</td></tr>');
					}else{
					   var arr=eval(data);
						 for(var i=0; i<arr.length; i++){
							 var state=arr[i].TASK_STATE;
							 if(state==1){
								 NAME="";
								 AVATAR="/images/icon.png";
								}else{
									 NAME=arr[i].USER_NAME;
									 EMPL_ID=arr[i].USER_EMPL_ID;
									 AVATAR=arr[i].USER_AVATAR;
								}
							 
						  		 $("#unCompleteTable").append('<tr style="background:#fff">'
								   							+'<td style="border-bottom:#f3f3f3 solid 1px;width:60px ;text-align:center;text-align:center;" ><img  class="icon"  src="'+AVATAR+'"><br/><span class="name" >'+NAME+'</span></td>'
						   									+'<td style="border-bottom:#f3f3f3 solid 1px;width:500px">'
						   									
						   									+'<span onclick="showOrderDesc('+arr[i].ID+','+arr[i].TASK_STATE+');"><div id="state"  style=";font-size:12px;color:#979797"><span>N0.</span>'
								   							+arr[i].SG186_ID
								  							+'<div class="umComplete" style="float:right;color:#6fa5ca;width:100px">&nbsp;&nbsp;'
								   							+'<span><img class="state" src="/images/index/state'+state+'.png"></span></div>'
								   							+'<div  class="test" style="font-size:14px;color:#373737">'
								   							+arr[i].FAULT_TITLE+   
								   							
								   							'</div><div class="showTime" style="vertical-align:bottom;width:98px;font-size:12px;float:left;color:#979797"><i class="iconfont" style="font-size:14px;float:left;">&#xe606;</i>'
								   							+gettimestr(arr[i].HANDLE_TIME.time)+
								   							'</div><div class="location" ><i class="iconfont"style="font-size:13px;float:left;margin-left:.5em">&#xe605;</i><span >'+arr[i].PERSON_ORG+'</span></div></td></tr>'
						   									);
	 														//添加未完成的图标
															if(arr[i].HANDLE_RESULT==0 && arr[i].TASK_STATE==4){
																$(".umComplete").eq(i).prepend('<i style="float:left;color:#ce7070;margin-top:5px;" class="iconfont">&#xe611;</i>'); 

														 		}
								   							
						   		$("#workOrderDesc").html('');
								}
						 	}
				hidePreloader();
		     		 	}});
			 		}
		
		
		
		/**
		 * 已完成工单列表(工单管理,工单派工)
		*/
		function showComplete(){
			showPreloader();
			 $.ajaxSettings.async = true; 
			 $.ajax({
			  url:"/dingTalk/getWorkOrderListComplete.jhtml" ,  
		      type:"post",
		      success:function(data){
		   	   	  $("#unCompleteTable").html('');
				if (data=="[]"){
					$("#unCompleteTable").html('<tr align="center" valign="middle" style="background:#f6f6f6;"><td colspan="2" style="color:#999">暂无数据</td></tr>');
					}else{
					   var arr=eval(data);
						 for(var i=0; i<arr.length; i++){
							 var state=arr[i].TASK_STATE;
							 if(state==1){
								 NAME="";
								 AVATAR="/images/icon.png";
								}else{
									 NAME=arr[i].USER_NAME;
									 AVATAR=arr[i].USER_AVATAR;
									 EMPL_ID=arr[i].USER_EMPL_ID;
								}
							 
						  		 $("#unCompleteTable").append('<tr style="background:#fff">'
								   							+'<td style="border-bottom:#f3f3f3 solid 1px;width:60px ;text-align:center;text-align:center;" onclick="showProfile(\''+EMPL_ID+'\','+state+');"><img  class="icon"  src="'+AVATAR+'"><br/><span class="name" >'+NAME+'</span></td>'
						   									+'<td style="border-bottom:#f3f3f3 solid 1px;width:500px">'
						   									
						   									+'<span onclick="showOrderDesc('+arr[i].ID+','+arr[i].TASK_STATE+');"><div id="state"  style=";font-size:12px;color:#979797"><span>N0.</span>'
								   							+arr[i].SG186_ID
								  							+'<div class="umComplete" style="float:right;color:#6fa5ca;width:100px">&nbsp;&nbsp;'
								   							+'<span><img class="state" src="/images/index/state'+state+'.png"></span></div>'
								   							+'<div  class="test" style="font-size:14px;color:#373737">'
								   							+arr[i].FAULT_TITLE+   
								   							
								   							'</div><div class="showTime" style="vertical-align:bottom;width:98px;font-size:12px;float:left;color:#979797"><i  class="iconfont" style="font-size:14px;float:left;">&#xe606;</i>'
								   							+gettimestr(arr[i].HANDLE_TIME.time)+
								   							'</div><div class="location" ><i class="iconfont" style="font-size:13px;float:left;margin-left:.5em">&#xe605;</i><span >'+arr[i].PERSON_ORG+'</span></div></td></tr>'
						   									);
	 							//添加未完成的图标
															if(arr[i].HANDLE_RESULT==0 && arr[i].TASK_STATE==4){
																$(".umComplete").eq(i).prepend('<i style="float:left;color:#ce7070;margin-top:5px;" class="iconfont">&#xe611;</i>'); 

														 		}
								   							
						   		$("#workOrderDesc").html('');
									}
				 				}
							hidePreloader();
				 			}});
						}

		
		
		
		
		/**
		 * 处理结果列表
		 */
		function showHandleResult(taskId){
			 $.ajaxSettings.async = false; 
			 $.ajax({
		         url:"/dingTalk/showHandleResult.jhtml?taskId="+taskId,  
		       type:"post",
		       success:function(data){
		    	   var arr=eval(data);
		    	   for (var i = 0; i < arr.length; i++) {
		    		 
		    		var   result=  arr[i].ID;
		    		 
		    	   var dealresult;
		    	   if (arr[i].HANDLE_RESULT==0){
		    		   dealresult="未完成";
		    	   }else{
		    		   dealresult="已完成";
		    	   }
		    	   $("#resultTable").append(
				    			   '<tr style="margin-top:0.5em;display:block;line-height:0.8em;width:100%;display:block;border-bottom:1px solid #E0DADA;vertical-align:middle;color:#666;font-size:14px	"><td colspan="2" style="color:#666" >处理结果 ('+(i+1)+')</td></tr>'
									+'<tr style="display:block;line-height:1.8em;width:100%;display:block;border-bottom:1px solid #E0DADA;background:#fff;vertical-align:middle;color:#666;	"><td  style="width:70px;color:#666" >完成情况:</td><td style="color:#999">'+dealresult+'</td></tr>'									
									+'<tr style="display:block;line-height:1.8em;width:100%;display:block;border-bottom:1px solid #E0DADA;background:#fff;vertical-align:middle;color:#666;	"><td  style="width:70px;color:#666;vertical-align:top;" >现场情况:</td><td style="color:#999;width:250px;">'+arr[i].SCENE_DESC+'</td></tr>'
								 	+'<tr style="display:block;line-height:1.8em;width:100%;display:block;border-bottom:1px solid #E0DADA;background:#fff;vertical-align:middle;color:#666;	"><td  style="width:70px;color:#666" >资产编号:</td><td style="color:#999">'+arr[i].ASSETS_NO+'</td></tr>'
							 		+'<tr style="display:block;line-height:1.8em;width:100%;display:block;border-bottom:1px solid #E0DADA;background:#fff;vertical-align:middle;color:#666;	"><td  style="width:70px;color:#666" >IP地址:</td><td style="color:#999">'+arr[i].IP_ADDRESS+'</td></tr>'
									+'<tr style="display:block;line-height:1.8em;width:100%;display:block;border-bottom:1px solid #E0DADA;background:#fff;vertical-align:middle;color:#666;	"><td  style="width:70px;color:#666" >耗费工时:</td><td style="color:#999">'+arr[i].TASK_TIME+'</td></tr>'
									+'<tr style="display:block;line-height:1.8em;width:100%;display:block;border-bottom:1px solid #E0DADA;background:#fff;vertical-align:middle;color:#666;	"><td  style="width:70px;color:#666" >备注说明:</td><td style="color:#999">'+arr[i].REMARK+'</td></tr>'
									+'<tr style="display:block;line-height:1.8em;width:100%;display:block;border-bottom:1px solid #E0DADA;background:#fff;vertical-align:middle;color:#666;	"><td  style="width:70px;color:#666" >提交人员:</td><td style="color:#999">'+arr[i].HANDLE_PERSON+'</td></tr>'
									+'<tr style="display:block;line-height:1.8em;width:100%;display:block;border-bottom:1px solid #E0DADA;background:#fff;vertical-align:middle;color:#666;	"><td  style="width:70px;color:#666" >提交时间:</td><td style="color:#999;width:250px;">'+getTimestr(arr[i].HANDLE_TIME.time)+'</td></tr>'
									+'<tr style="background:#fff;border-bottom:1px solid #E0DADA;;border-top:0;"><td  style="width:70px;color:#666" colspan="2" ><div id="imgTable'+result+'"></div></td></tr>');
		    	   $("#resultTable tr").css("border-bottom","0");
		    	   //设置详细信息表格宽度；
	               $("#resultTable tr").each(function(){
	               $(this).children("td").eq(0).addClass("td1").end()
                                         .eq(1).addClass("td2"); 
                   });
					    	   showImg(result);
					    	   }
			    }
			});
						
		}
		
		
		
		
		
		/**
		 * 显示处理结果图片
		 */
		function showImg(result){
			var imgId = "#imgTable"+result;
			
			 $.ajaxSettings.async = false; 
			 $.ajax({
		       url:"/dingTalk/getHandleResultImg.jhtml?result="+result,  
		       type:"post",
		       success:function(data){
		    	   var arr=eval(data);
					 for(var i=0; i<arr.length; i++){
						 $(imgId).append('<img class="btn_center"  src="'+arr[i].PIC_PATH+'"  width="100px" height="100px" onclick="showBigImg(\''+arr[i].PIC_PATH+'\')"/>');
						 	}
			        	}
				 	});
				}
		
		
		
		function transformState(taskState){
			 if(taskState==0){
				 ST="未派发";
				}
				else if(taskState==1){
					ST="未派工";
				}
				else if(taskState==2){
					ST="未签收";
				}
				else if(taskState==3){
					ST="未处理";
				}
				else if(taskState==4){
					ST="未归档";
				}
				else if(taskState==9){
					ST="已归档";
				}
				else if(taskState==99){
					ST="异常终止";
				}
		}
		
		
		
		function showOrderFlow(taskId){
			window.open("/orderFlow.jsp?taskId="+taskId);
		}
		
		

		/***********************************
			*验证快递单号
			**********************************/
	 function expressSearch(LogisticCode){
			var regExp = /^\d+$/;
			var $express=$("#express");
			var expressNum=$express.text();
			if(!regExp.test(expressNum)){
				
				dd.device.notification.alert({
				    message: "请正确输入快递单号！",
				    title: "提示",
				    buttonName: "确定",
				    onSuccess : function() {
				    },
				    onFail : function(err) {}
				});
				
			}else{	
				window.open("/expressResult.jsp?LogisticCode="+LogisticCode);	
			};
	}

	 
	 
/*重要性滚动条*/	
$(function(){
	$("#slide_dist").slider({                                        //滑动条控制数据输入；
        value:0,
        min:0,
        max:100,
        step:10,
        slide: function (event, ui) {
            $("#importance").val(ui.value)
        }
    })		
})
	 		
	 
	 
	 /**
	  * 查看地图
	  */
	 function searchMap(location){
	 	 $.ajax({
	 	       url:"/dingTalk/searchMap.jhtml?location="+location,  
	 	       type:"post",
	 	       success:function(data){
	 	    	   if (data=="[]"){
	 	    		  dd.device.notification.alert({
	 					    message: "查找不到该位置",
	 					    title: "提示",
	 					    buttonName: "确定",
	 					    onSuccess : function() {
	 					    },
	 					    onFail : function(err) {}
	 					});
	 	    	   }else{
	 	    		   
	 	    	  
	 	    	   var arr=eval(data);
	 	    	   
	 	    	   var businessHall=location;
	 	    	   
	 	    	   var xlocation=arr[0].X_LOCATION;
	 	    	   var ylocation=arr[0].Y_LOCATION;
	 	    	   var tel=arr[0].TEL;
	 	    	   var addr=arr[0].ADDR;
	 	    	   
	 	    	   window.open("/mapforBaiDu.jsp?xlocation="+xlocation+"&ylocation="+ylocation+"&tel="+'\''+tel+'\''+"&addr="+'\''+addr+'\''+"&businessHall="+'\''+businessHall+'\'');
	 	       }
	 	      }
	 	 });
	 }




/**
 * 判断是否为敏感信息
 */
var SEN;
function isSensitiveMessage(sensitive){
	if(sensitive==0){
		SEN="否";
	}
	else if(sensitive==1){
		SEN="是";
	}
}


/**
 * 判断是否已完成
 */
var dealresult;
function isFinished(result){
	if(result==0){
		dealresult="未完成";
	}else if(result==1){
		dealresult="已完成";
	}
}


/**
 * 工单报表-详细列表
 */
function showCountForm(url){

	$("#classifyTable").html("");
	$("#countTable").html("");
	$("#gongdanReport").html('');
	$("#bootstrapcss").remove();
	showPreloader();
	 currentPageNavigation();
	 $.ajax({
	       url:"/dingTalk/"+url,
	       type:"post",
	       error:function(){
	    	   
	    	   dd.device.notification.alert({
	    		    message: "查询失败",
	    		    title: "提示",
	    		    buttonName: "确定",
	    		    onSuccess : function() {
	    		    	 showCountForm(url);
	    		    	 hidePreloader();
	    		    },
	    		    onFail : function(err) {}
	    		});
	       },
	       success:function(data){
	       	   $("#groupByTime").html('');
	    	   
	    	   $("#countList").html('');
	    	   
				   var arr=eval(data);
					 for(var i=0; i<arr.length; i++){
						 var state=arr[i].TASK_STATE;
						 if(state==1){
							 NAME="";
							 AVATAR="/images/icon.png";
							}else{
								 NAME=arr[i].USER_NAME;
								 EMPL_ID=arr[i].USER_EMPL_ID;
								 AVATAR=arr[i].USER_AVATAR;
							}
	    	   
		  		 $("#countList").append('<tr style="background:#fff">'
							+'<td style="border-bottom:#f3f3f3 solid 1px;width:60px ;text-align:center;text-align:center;" onclick="showProfile(\''+EMPL_ID+'\','+state+');"><img  class="icon"  src="'+AVATAR+'"><br/><span class="name" >'+NAME+'</span></td>'
							+'<td style="border-bottom:#f3f3f3 solid 1px;width:500px">'
							
							+'<span onclick="showOrderDesc('+arr[i].ID+','+arr[i].TASK_STATE+');"><div id="state"  style=";font-size:12px;color:#979797"><span>N0.</span>'
							+arr[i].SG186_ID
							+'<div style="float:right;color:#6fa5ca;">&nbsp;&nbsp;'
							+'<span><img class="state" src="/images/index/state'+state+'.png"></span></div>'
							+'<div  class="test" style="font-size:14px;color:#373737">'
							+arr[i].FAULT_TITLE+   
							
							'</div><div class="showTime" style="vertical-align:bottom;width:93px;font-size:12px;float:left;color:#979797"><i class="iconfont" style="font-size:14px;float:left;">&#xe606;</i>'
							+gettimestr(arr[i].HANDLE_TIME.time)+
							'</div><div class="location" ><i class="iconfont"style="font-size:13px;float:left;margin-left:.5em">&#xe605;</i><span >'+arr[i].PERSON_ORG+'</span></div></td></tr>'
							);
		  		
	       }
					 hidePreloader();	 
	       }
				
	 })
}

//根据type来分类工单报表；
//初始化；
function groupByIni(typeArray,functionArray){
	 
	 var $table=$("#classifyTable");
	 $table.html('<tr></tr>') 
	 for(var i=0;i<typeArray.length;i++){
	 		 $table.find("tr").append( '<td onclick="'+functionArray[i]+'"><span>'+typeArray[i]+'</span></td>');
	 		 
	 		 
	 }

	 var $td=$table.find("td")
	     length=$td.length
	     width=(100/length)+'%';

	 $td.eq(0).addClass('select').end()
	 		  .css("width",width)
	/* 	      .click(function(){
	 		 									 index=$(this).index();
	 		 									 $(this).addClass("select")
														.siblings().removeClass("select");

												 		
						       })*/;
	

}
//groupBy点击
function groupByClick(i){
		$("#classifyTable td").eq(i).addClass("select")
														.siblings().removeClass("select");
}

//选择日期，月份来显示数据；
function dataSelect(string){
	dd.ready(function() {
			 $("#countTable").html(
								'<tr align="center" valign="middle" style="background:#f6f6f6;">'
										+'<td colspan="2" style="color:#999"><div >'+string+'</div></td>'
								+'</tr>');	
	})
					
}

function getNumOfMonths(){
			dd.biz.util.datepicker({
							    format: 'yyyy-MM-dd',
							    value: '', 
							    onSuccess :
							    function(result) {
							    	if (result.buttonIndex==(-1)){

	    							}else{
		    							 var date=result.value;
		    							 
		    							 var url="showCountFormByMonth.jhtml?date="+date;
								    	 showCountList(url,2,date);
								    	 
								    	 dataSelect(date.substr(0,7));
								    	 groupByClick(1);
								    	 $("#countTable div").addClass("byMonth");



	    							}
							        
							    	


							    	 
							    	 
							    },
							    onFail : function() {}
							});

}
function getNumOfTotals(){
							showCountList("showCountFormTotal.jhtml",3); 	
							var string="总计";
							dataSelect(string);
							groupByClick(2)
}


/**
 * 展示工单详细信息
 */
function showOrderDesc(taskId,taskState){
	 showPreloader();	
	 disableRefresh();
	 currentPageNavigation();
	 $("#countList").html('');
	 
	 transformState(taskState);
	 
		 $.ajaxSettings.async = false; 
		 $.ajax({
	       url:"/dingTalk/getHandleOrderListDesc.jhtml?taskId="+taskId,  
	       type:"post",
	       success:function(data){
	
			   var arr=eval(data);
				 for(var i=0; i<arr.length; i++){
					 var sensitive=arr[i].SENS_INFO;
					 var SEN;
					 var dealresult;
					 var resultId=arr[i].TTRID;
						if(sensitive==0){
							SEN="否";
						}
						else if(sensitive==1){
							SEN="是";
						}
						if(arr[i].HANDLE_RESULT==0){
							dealresult="未完成";
						}else if(arr[i].HANDLE_RESULT==1){
							dealresult="已完成";
						}
						 $("#countList").html("");
						 $("#countListdesc").html('<tr class="space"><td  style="width:70px;color:#666" >营销编号:</td><td style="color:#999">'
				   					+arr[i].SG186_ID+
				   					'</td><td class="right"><i class="iconfont">&#xe603;</i></tr></td><tr><td style="width:70px;color:#666">工单类型:</td><td style="color:#999">'
				   					+arr[i].TASK_TYPE+
				   					'</td><tr class="noTop" onclick="showOrderFlow('+taskId+');"><td style="width:70px;color:#666">工单状态:</td><td style="color:#999">'
				   					+ST+
				   					'</td><td class="right"><i class="iconfont" >&#x58887</i></td></tr><tr class="noTop"><td style="width:70px;color:#666">所属单位:</td><td style="color:#999">'
				   					+arr[i].ORG_NO+
				   					'</td><tr onclick="searchMap(\''+arr[i].PERSON_ORG+'\');" class="space noTop"><td style="width:70px;color:#666">人员单位:</td><td style="color:#999">'
				   					+arr[i].PERSON_ORG+
				   					'</td><td class="right"><i class="iconfont">&#xe60b;</i></td></tr><tr><td style="width:70px;color:#666">联系人员:</td><td style="color:#999">'
				   					+arr[i].CONTACT_PERSON+
				   					'</td><tr class="space noTop"><td style="width:70px;color:#666">联系电话:</td><td style="color:#999"><span style="color:#6fa5ca;TEXT-DECORATION: underline">'
				   					+arr[i].CONTACT_TEL+
				   					'</span></td><td class="right"><i class="iconfont">&#xe604;</i></td></tr><tr  class=""><td style="width:70px;color:#666">系统类型:</td><td style="color:#999">'
				   					+arr[i].SYS_TYPE+
				   					'<tr class="space noTop"><td style="width:70px;color:#666">所属系统:</td><td style="color:#999">'
				   					+arr[i].BELONG_SYS+
				   					'</td><td class="right"><i class="iconfont">&#xe600;</i></td></tr><tr class=""><td valign=top style="width:70px;color:#666;">问题标题:</td><td style="color:#999">'
				   					+arr[i].FAULT_TITLE+
				   					'</td><td class="right"><i class="iconfont">&#xe601;</i></td></tr>'
				   					+'<tr class="space noTop"><td valign=top style="width:70px;color:#666;">问题详述:</td><td colspan="2"><textarea readonly="readonly">'+arr[i].FAULT_DESC+'</textarea></td></tr>'
				   					+'<tr class="space noTop"><td style="width:70px;color:#666">敏感信息:</td><td style="color:#999">'
				   					+SEN+'</td></tr>'
							   		//快递单号查询；
									 +'<tr  class="noTop"><td style="width:70px;color:#666">'
									+'快递单号:</td><td id="express" style="color:#999">'+arr[i].TRACK_NUM+'</td><td class="right" onclick="expressSearch(\''+arr[i].TRACK_NUM+'\');"><i class="iconfont" >&#xe609;</i></td></tr>'
							   		+'<tr class="noTop space"><td style="width:70px;color:#666" valign=top>现场预判:</td><td  colspan="2" style="color:#999"><textarea readonly="readonly">'+arr[i].SCENE_PROG+'</textarea></td></tr>'

							   		+'<tr><td style="width:70px;color:#666">派发人员:</td><td style="color:#999">'+arr[i].HANDLE_PERSON+'</td></tr>'
							   		+'<tr class="noTop"><td style="width:70px;color:#666">派发时间:</td><td style="color:#999">'
							   		+getTimestr(arr[i].HANDLE_TIME.time)+
							   		'</td></tr><tr class="noTop"><td style="width:70px;color:#666">过期时间:</td><td style="color:#999">'
							   		+gettimestr(arr[i].OVERDUE_TIME.time)+
							   		'</td></tr>');

						 			
						 			showHandleResult(taskId,resultId);
						 		  
								 }
							}
						});
				 
						hidePreloader();	
			}



/**
 * 按周查询已归档工单
 * @param tastArr
 */
function chooseWeek(tastArr){
	dd.device.notification.actionSheet({
	    title: "选择周",
	    cancelButton: '取消',
	    otherButtons: tastArr,
	    onSuccess : 
	    	function(result) {

	    		if (result.buttonIndex==(-1)){

	    		}else{



	    		var week=result.buttonIndex+1;
	    		var weekString="第"+(result.buttonIndex+1)+"周";
	    		var url="showCountFormByWeek.jhtml?week="+week;
	    		
	    			 showCountList(url,1,week);
	                 dataSelect(weekString);
	                 $("#classifyTable td").eq(0).addClass("select")
														.siblings().removeClass("select");
	    		
	        
	        }
	        
	       
	    },
	    onFail : function(err) {}
	})
}