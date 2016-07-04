
   /**
     * 显示详细信息
     */
    function showDesc(taskId,temp,planState,copyPerson){
      disableRefresh();
      refreshItself();
      //如果有抄送删除按钮；
      if(copyPerson){
          if(copyPerson==userName){
           $("#temp").remove()
      }
      }
      
      $("#PlanTable").html("");
      $("#businessRoutine").html("");
      $("#classifyTable").html("");
    	if (temp==3&&planState==0){
    		$("#temp").html('<tr><td ><div align="center" style="position:fixed;bottom:0em;padding-top:20px;padding-bottom:10px;width:100%;background:#fff"><input id="button" type="button" style="margin-left:0em;border:0;width:35%;height:35px;border-radius:5px;background:#6fa5ca;color:#fff;	" onclick="deal('+taskId+','+temp+');" value="处理"/>'+
    				       '<input id="button" type="button" style="margin-left:2em;border:0;width:35%;height:35px;border-radius:5px;background:#f25c41;color:#fff;	" onclick="filePlan('+taskId+');" value="归档"/></div></tr>');
    	}
    	
    	
    	if (temp==1&&planState==0){
    		$("#temp").html('<tr><td ><div align="center" style="position:fixed;bottom:0em;padding-top:20px;padding-bottom:10px;width:100%;background:#fff"><input id="button" type="button" style="margin-left:0em;border:0;width:252px;height:35px;border-radius:5px;background:#6fa5ca;color:#fff;	" onclick="deal('+taskId+','+temp+');" value="处理"/>'+
    				       '</div></tr>');
    	}
    	
    	
    	if (temp==2&&planState==0){
    		$("#temp").html('<tr><td ><div align="center" style="position:fixed;bottom:0em;padding-top:20px;padding-bottom:10px;width:100%;background:#fff"><input id="button" type="button" style="margin-left:0em;border:0;width:252px;height:35px;border-radius:5px;background:#f25c41;color:#fff;	" onclick="filePlan('+taskId+');" value="归档"/>'+
    				       '</div></tr>');
    	}
    	
   	 $.ajaxSettings.async = false; 
	   $.ajax({
       url:"/business/showPlanDesc.jhtml?taskId="+taskId,
       type:"post",
       error:function(){
    	   dingAlert("err");
       },
       success:function(data){
			 var element = $("span[class='new-comment-content']");
     var temp =  element.text().replace(/\n/g,'<br/>');
     element.html(temp);
    	   var arr=eval(data);
    	   $("#workPlanTable").html('<tr style="line-height: 2.5em;"><td >安排时间：</td><td>'+getTimestr(arr[0].TASK_PLAN_TIME.time)+'</td><td valign="top"><i class="iconfont">&#xe60e;</i></td></tr>'
                         +'<tr style="line-height: 2.5em;"><td valign="top">项目名称：</td><td ><span  class="new-comment-content">'+arr[0].PROJECT_NAME+'</span></td><td></td></tr>'
                         +'<tr style="line-height: 2.5em;"><td >客户名称：</td><td >'+arr[0].CUSTOMER_NAME+'</td><td></td></tr>'
    			   		         +'<tr style="line-height: 2.5em;"><td >客户部门：</td><td >'+arr[0].CUSTOMER_ORG_NO+'</td><td></td></tr>'
                         +'<tr style="line-height: 2.5em;"><td >联系人员：</td><td >'+arr[0].CONTACT_PERSON+'</td><td></td></tr>'
                         +'<tr style="line-height: 2.5em;"><td >联系电话：</td><td >'+arr[0].CONTACT_TEL+'</td><td valign="top"><i class="iconfont" >&#xe604;</i></td></tr>'
                         +'<tr style="line-height: 2.5em;"><td >计划目的：</td><td >'+arr[0].PLAN_AIM+'</td><td></td></tr>'
                         +'<tr style="line-height: 2.5em;"><td >任务安排：</td><td >'+arr[0].TASK_INFO+'</td><td></td></tr>'
                         +'<tr style="line-height: 2.5em;"><td >重要性：</td><td >'+arr[0].PLAN_IMPORTANCE+'%</td><td></td></tr>'
                         +'<tr style="line-height: 2.5em;"><td >任务状态：</td><td id="missionState">'+arr[0].PLAN_STATE+'</td><td></td></tr>'
                         +'<tr style="line-height: 2.5em;"><td class="orgPerson">涉及人员：</td><td id="orgPerson" class="center"></td><td valign="top" class="orgPerson"><i class="iconfont">&#xe614;</i></td></tr>');
         //设置详细信息表格宽度；
         $("#workPlanTable tr").each(function(){
                $(this).children("td").eq(0).addClass("td1").end()
                                      .eq(1).addClass("td2");
         })
         //根据arr[0].PLAN_STATE值，更新任务状态#missionState；
         if(arr[0].PLAN_STATE==0){$("#missionState").text("未完成")}
         else if(arr[0].PLAN_STATE==1){$("#missionState").text("已完成")} ;
       }

	 });


	 
	 //备注列表
	 $.ajaxSettings.async = false; 
	 $.ajax({
       url:"/business/showPlanRemark.jhtml?taskId="+taskId,
       type:"post",
       error:function(){
    	   dingAlert("err");
       },
       success:function(data){
    	   var arr=eval(data);
    	   
    	   for (var i=0;i<arr.length;i++){
    	   $("#workRemarkTable").append('<tr style="line-height: 2.5em;"><td valign="top">备注'+(i+1)+':</td><td><span  class="new-comment-content">'+arr[i].REMARK+'</span></td><td class="td3"></td></tr>'
                                      +'<tr style="line-height: 2.5em;"><td>填写人员：</td><td>'+arr[i].HANDLE_PERSON+'</td><td class="td3"></td></tr>'
                                      );
         	
    	   
    	   
    	   }
    	   
       }
	 });
	 
	 //人员信息列表
	 $.ajaxSettings.async = false; 
	 $.ajax({
       url:"/business/showPlanOrg.jhtml?taskId="+taskId,
       type:"post",
       error:function(){
    	   dingAlert("err");
       },
       success:function(data){
    	   var arr=eval(data);
    	   
    	   for (var i=0;i<arr.length;i++){
    	   $("#workPlanTable #orgPerson").append(arr[i].ORG_PERSON+';');
    	   
         }
         //设置详细信息表格宽度；
         $("#workRemarkTable tr").each(function(){
                $(this).children("td").eq(0).addClass("td1").end()
                                      .eq(1).addClass("td2");
         }) 

      }
	 });
	 if (temp==2){
		 var workType=2;
		 var reqUrl="showAllHandleOrder";
		 showAllHandleOrder(taskId,reqUrl,workType);
	 }else if (temp==1){
		 var reqUrl="showHandleOrder";
		 var workType=2;
		 showAllHandleOrder(taskId,reqUrl,workType);
	 }else if (temp==3){
		 var reqUrl="showHandleOrder";
		 var workType=1;
		 showAllHandleOrder(taskId,reqUrl,workType,temp);
	 }
	 
    }
    
    
    
    
    /**
     * 对任务进行归档
     */
    function filePlan(id){
    	 $.ajax({
  	       url:"/business/filePlan.jhtml?id="+id,
  	       type:"post",
  	       error:function(){
  	    	 dingAlert("归档失败，请重试");
  	       },
  	       success:function(data){
  	    	 dingAlert("归档成功");
  	    	 refreshCurrentPage();
  	       }
    	 });
    }
    
    
    
    
    
    function refreshItself(){
    	dd.biz.navigation.setRight({
    	    show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
    	    control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
    	    text: '返回',//控制显示文本，空字符串表示显示默认文本
    	    onSuccess : function(result) {
    	    	window.open(window.location.href=window.location.href);
    	    },
    	    onFail : function(err) {}
    	});

    }
    
    
	   var resultArray= new Array();
    
    /**
     * 处理结果
     */
    function showAllHandleOrder(taskId,reqUrl,workType,temp){
    	alert(1);
    	 $.ajaxSettings.async = false; 
		 $.ajax({
	       url:"/business/"+reqUrl+".jhtml?taskId="+taskId+"&userId="+userId+"&workType="+workType,
	       type:"post",
	       error:function(){
	       },
	       success:function(data){
				    
	    		   var arr=eval(data);
	    		   var no=0;
	    		   for (var i=0;i<arr.length;i++){
	    			   var contactType=arr[i].CONTACT_TYPE;
	    			   if (contactType==2){
		    		   		contactType="现场沟通";
		    		   	}else if (contactType==1){
		    		   		contactType="电话交流";
		    		   	}
	    			   
	    			   if (arr[i].SUBMIT_TIME!=null){
	    				   no=no+1;
	    			   $("#resultTable").append('<tr style="background:#f6f6f6;border-top:0;font-size:12px;padding-bottom:2px"><td style="padding-bottom:0;">处理结果('+no+')</td><td></td><td></td></tr>'
                   +'<tr><td>交流方式：</td><td>'+contactType+'</td><td></td></tr>'
	    		   +'<tr><td>完成度：</td><td>'+arr[i].GCCR+'%</td><td></td></tr>'
                   +'<tr><td>提交人员：</td><td>'+arr[i].USER_NAME+'</td><td valign="top"><span onclick="showProfile(\''+arr[i].HANDLE_PERSON+'\','+2+');"><i  class="iconfont">&#xe616;</i></span></td></tr>'
                   +'<tr><td>提交时间：</td><td>'+getTimestr(arr[i].SUBMIT_TIME.time)+'</td><td></td></tr>'
                   +'<tr><td >签到时间：</td><td>'+getTimestr(arr[i].BEGIN_TIME.time)+'</td><td></td></tr>'
                   +'<tr><td  valign="top">签到地点：</td><td>'+arr[i].BEGIN_LOCATION+'</td><td></td></tr>'
                   +'<tr><td>签退时间：</td><td>'+getTimestr(arr[i].END_TIME.time)+'</td><td></td></tr>'
                   +'<tr><td  valign="top">签退地点：</td><td>'+arr[i].END_LOCATION+'</td><td></td></tr>'
                   +'<tr><td style="vertical-align:top;">交流结果:</td><td id="handleInfo'+arr[i].ID+'"></td><td></td></tr>');

	    		//设置详细信息表格宽度；
                $("#resultTable tr").each(function(){
                  $(this).children("td").eq(0).addClass("td1").end()
                                        .eq(1).addClass("td2"); 
                                      });

	    			   var gcci=arr[i].GCCI;

	    			   resultArray=gcci.split(";");
	    			
	    			   showContactResult(resultArray,arr[i].ID);
	    			   
	    			   }
	    			
	    			   
	    			   
	    			   
	    	   }
	       }
		 });
    }
    
    
    
    function showContactResult(resultArray,resultId){
    	var result = "#handleInfo"+resultId;
    	   
 	   for (var i=0;i<resultArray.length ;i++ ){
 		   		$(result).append('('+(i+1)+')&nbsp;'+resultArray[i]+';<br/>');
	   		}
	   		
    }
    
    /**
     * 处理页面跳转
     * @param taskId
     */
    function deal(taskId,temp){
    	window.open("/business/dealDetails.jsp?taskId="+taskId+"&temp="+temp);
    }
    
    
    
	/**
	 * 选择日期
	 */
	function chooseDate(){
		dd.biz.util.datepicker({
		    format: 'yyyy-MM-dd',
		    value: '', //默认显示日期
		    onSuccess : function(result) {
		    	chooseTime(result.value);
		    },
		    onFail : function() {}
		})

	}
	
	
	/**
	 * 选择时间
	 */
	function chooseTime(date){
		dd.biz.util.timepicker({
		    format: 'HH:mm',
		    value: '',
		    onSuccess : function(result) {
		        dateTime=date+" "+result.value;
		        $("#dateTimeSpan").html('<span>'+dateTime+'</span>');
		    },
		    onFail : function() {}
		});

	}
	
	


	
  /**
   * 选择涉及部门、人员
   */
  function choose(){
    dd.biz.contact.choose({
    	  startWithDepartmentId: 0,
    	  multiple: true,
    	  users: [],
    	  corpId: _config.corpId,
    	  max: 10,
    	  onSuccess: function(data) {
    		  
    		  var arr=eval(data);

    		  //清空数组
    		  personOrgArray.splice(0,personOrgArray.length);
    		  personOrgIdArray.splice(0,personOrgIdArray.length);
    		  $("#deptChoose").html('');
    		  for (var i=0;i<arr.length;i++){
    		   $("#deptChoose").append('<span>'+arr[i].name+'</span>');
    		  //填充数组
    		  personOrgArray.push(arr[i].name);
    		  personOrgIdArray.push(arr[i].emplId);
    		  }
    	  },
    	  onFail : function(err) {

    	  }
    	});
    }


function clearCC(){
	copyPersonOrgArray.splice(0,copyPersonOrgArray.length);
	$("#copyperson").html('');
}
	
	
  
  /*发布任务publishPlan.jsp**************************************************************************************************/
	function showForm(){
		$("#planTable").html('<tr id="chooseCompany"><td ><form>客户名称:</td><td class="center"><input type="text" name="customerName"></td><td class="right change"><i class="iconfont">&#xe607;</i></td></tr>'+
							 '<tr id="chooseDepartment" class="noTop"><td>客户部门:</td><td class="center"><input type="text" name="customerDept"></td><td class="right change"><i class="iconfont">&#xe607;</i></td></tr>'+
							 '<tr class="noTop"><td>联系人员:</td><td><input type="text" name="contactPerson"></td></tr>'+
							 '<tr class="noTop"><td>联系电话:</td><td><input type="text" name="contactTel"></td></tr>'+
							 '<tr class="noTop"><td>任务安排:</td><td><input type="text" name="taskInfo"></td></tr>'+
							 
							 '<tr class="noTop" onclick="chooseDate();"><td class="left">安排时间:</td><td id="dateTimeSpan" class="center"></td><td class="right"><i class="iconfont">&#xe60e;</i></td></tr>'+
							 
							 '<tr class="noTop"><td  valign=top>项目名称:</td><td style="height:auto" ><textarea style="word-break:break-all;word-wrap:break-word;border:0;height:auto;min-height:50px;width:60vw" contenteditable="true" class="projectName" name="projectName"></textarea></td></tr>'+
							 '<tr class="noTop"><td>计划目的:</td><td><input type="text" name="planAim"></td></tr>'+
							 
							 '<tr class="noTop" onclick="choose();"><td class="left">涉及人员:</td><td id="deptChoose" class="center"></td><td class="right"><i class="iconfont">&#xe60d;</i></td></tr>'+

							 '<tr class="noTop">'
                    +'<td style="width:70px;color:#666">重要性:</td>'
                    +'<td id="trigger" class="center" name="planImportance" style="color:#999;"></td>'
                    +'<td class="right" >'
                            +'<div class="demo-cont" id="demo_cont_select" style="display: none">'
                                  +'<select  name="Cities" id="demo_select" data-role="none">'
                                  +'</select>'
                            +'</div>'
                    +'</td>'
                +'</tr>'
				+'<tr  class="noTop"  ><td style="width:70px;color:#666">抄送:</td><td onclick="cc();" id="copyperson"></td><td class="right"><i class="iconfont" onclick="clearCC()">&#xe61d;</i></td></tr>'
                +'<tr class="noTop" style="height:auto"><td  valign=top>备注:</td><td style="height:auto"   ><textarea style="word-break:break-all;word-wrap:break-word;border:0;height:auto;min-height:40px;width:60vw" contenteditable="true"  class="remark" name="remark'+no+'"></textarea></td></tr>');
                  
		$("#addTap").html('<tr ><td colspan="2"><div align="center" style="font-size:20px;color:#31a4e3" onclick="addRemark();">+</div></td></tr>');
             chooseDepartment();
            
	 var element = $("span[class='new-comment-content']");
     var temp =  element.text().replace(/\n/g,'<br/>');
     element.html(temp);

            //"重要性“ 点击触发select的点击事件----弹窗；；
            $("#trigger").click(function(){

            ini("请选择重要性");
            $('#demo_select').trigger("click");


        });   
  
/*
	$("#slide").slider({                                        //滑动条控制数据输入；
        value:0,
        min:0,
        max:100,
        step:10,
        slide: function (event, ui) {
            $("#importance").val(ui.value)
        }
    });		
*/ 	

	}
	
	
	
  //选择公司部门
    function chooseDepartment(){
            var company=["网能","亿力","铁塔","其他"];
            var companyIndex=0; $("[name='customerName']").val(company[0]);   //选择的公司，placeholder为“网能”
            var department=[
                ["物资部","运维部"],
                ["物资部","运维部","采集部"],
                ["建设部","综合部"]

            ];

         $(".change").click(function(event){
              
              $(this).prev().find(":input").val("").focus();
              event.stopPropagation();
         })

            
        //选择公司；
        $("tr#chooseCompany").click(function(){
           
            $("[name='customerName']").blur();
            dd.device.notification.actionSheet({
                title: "选择公司", //标题
                cancelButton: '取消', //取消按钮文本
                otherButtons: company,
                onSuccess : function(result) {
                  var index=result.buttonIndex;
                  
                  $("[name='customerName']").val(company[index]).blur();
                      //如果改变了公司要清空部门输入框；
                      if(companyIndex!==index){
                          $("#chooseDepartment input").val("");
                          companyIndex=index;
                      };
                 }

            })
        });
            //选择部门；
        $("tr#chooseDepartment").click(function(){
           

                    
                        $("[name='customerDept']").blur();
                        dd.device.notification.actionSheet({
                            title: "选择部门", //标题
                            cancelButton: '取消', //取消按钮文本
                            otherButtons: department[companyIndex],
                            onSuccess : function(result) {
                                 var index=result.buttonIndex;
                                 $("[name='customerDept']").val(department[companyIndex][index]).blur();
                            }
                        })
                    
                        
                       
                    
    })
    }

  /*初始化mobiscroll控件*/
  function ini(info){
            $('#demo_select').mobiscroll().select({
                headerText:info,
                theme:"android-holo-light",
                mode:"scroller",
                display:"modal",
                lang:"zh",
                buttons: [                  //默认按钮“set”，“cancel”
                    'set'


                ],
                onSelect:function(valueText, inst){
                    var importance = valueText;
                    $('#trigger').text(importance);
                    $('#trigger').val(importance);
                },
                multiline:"2",
                height:"50",
                fixedWidth:120

            });
            //设置select值1-100；
            for(var i=1;i<11;i++){
                $('#demo_select').append('<option value='+i*10+'>'+i*10+'</option>')

            }

        }  
	
	
	
	
	/**
	 * 添加备注
	 */
	function addRemark(){
		no=no+1;
		$("#planTable").append('<tr class="noTop" style="font-size:1.1em;line-height:2.5em"><td valign="top">备注'+no+':</td><td><textarea style="word-break:break-all;word-wrap:break-word;border:0;height:auto;min-height:40px;width:60vw" contenteditable="true"  class="remark" type="text" name="remark'+no+'"></textarea></td><td class="right" onclick="deleteRemark('+no+',this);"><i class="iconfont">&#xe60c;</i></td></tr>');	
		$("#planTable tr:last input").focus();												
	}
	
	/**
	 * 删除备注
	 */
	function deleteRemark(no,ele){
		var index=no-1;

		$(ele).parents("tr").remove();
		remarkArray.splice(index,1);
		
	}
	
	
	
	/**
	 * 多头像展示
	 * @param avatarArr
	 * @param result
	 */
	 function showAvatar(avatarArr,result){
	    	splitStr=avatarArr.split(";");
		
	    	//根据头像个数殊排列；
			if(splitStr.length==3){
					$(".avatarTable:last").append('<img src="'+splitStr[0]+'"><br/>'
						+'<img  src="'+splitStr[1]+'">'
						+'<img  src="'+splitStr[2]+'">')
			}
			else{
				for (var j=0;j<splitStr.length;j++){
				if(j>3)
					break;
	    		$(".avatarTable:last").append('<img src="'+splitStr[j]+'">')
	    						
				}
			}

        /*根据父div的高度div.avatarTable向下移动一定距离*/
        if(splitStr.length==2){
          $('.avatarTable').each(function(){

          var scrollTop=($(this).parents(".row").height()-5-$(this).height())/2;
          $(this).css('margin-top',scrollTop)
        })
        }

	    	$(".avatarTable").css({
	    					//			border:"1px solid black",
	    								'text-align':"center",
		    							width:"100%",
		    							height:"auto",
		    							padding:"2px"
		    							
	    						})
	    						.children("img").addClass("img-circle")
	    										
	    										
	    										.attr({
	    							      				height:"26px"
	    											
	    										})
	    										.wrap("<div style='display:inline;margin:1px;'></div>");
	    	//如果只有一个头像就设置为正常大小
	    	if(splitStr.length==1){
				$(".avatarTable>div:last").children("img").attr({
													width:"40px",
													height:"40px"
	    											

	    										});
			}
	    	
	    }
    