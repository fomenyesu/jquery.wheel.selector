//
//create closure
//
(function($){
    //
    // plugin definition
    //
    $.fn.jmselect = function(options){
        // debug(this);
        //build main options before element iteration
        var opts = $.extend({}, $.fn.jmselect.defaults, options);
        //iterate and reformat each matched element
        return this.each(function(){
            $this = $(this);
			
            //build element specific optio
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
            //update element styles
           var divplugin = $('<div id="datePlugin"><div id="dateshadow" style="display: none;"></div><div id="datePage" class="page" style="display: none;"></div></div>');
			(o.wrapid=="")?$(this).parent().append(divplugin):$("#"+o.wrapid).append(divplugin);

       		CreateDateUI(o);
			showdiv();
			bindButton($this.attr("id"),o.grade);

        });
    }
    
    //
    // private function for debugging
    //
    function debug($obj){
        if(window.console && window.console.log){
            window.console.log('jmselect selection count: ' + $obj.size());
        }
    };



	function showdiv(){

		$("#datePlugin").show();
		$("#dateshadow").show();
		$("#datePage").show();
	}
	function hidediv(){
		$("#datePlugin").hide();
		$("#dateshadow").hide();
		$("#datePage").hide();
	}


	function bindButton(objid,grade){
		//resetIndex();
		$("#dateconfirm").unbind('click').click(function () {	
			
			if (indexI==0&&indexH==0) {
				indexI=indexH=1;
			}else if(indexI==0&&indexH!=0){
				indexI=1;
			}else if(indexH==0&&indexI!=0){
				indexH=1;
			};

			var datestr = $("#daywrapper ul li:eq("+Math.round(indexI)+") span").text();
			if (grade>1) {
				datestr = $("#monthwrapper ul li:eq("+Math.round(indexH)+") span").text() +"&nbsp;&nbsp;"+datestr;
			};
			$("#"+objid).html(datestr);
			$("#"+objid+"-hidden").val(datestr);
			$("#datePage").hide(); 
			$("#dateshadow").hide();
		});
		$("#datecancle").click(function () {
			// alert($("#datePlugin").html());
			$("#datePlugin").remove();
			$("#datePage").hide(); 
			$("#dateshadow").hide();

			//Ncallback(false);
		});
	}		

	//创建 -- 第一个滚动选择 -- 列表 
	function createTime_UL(optionstring,valuestring){
		  $("#daywrapper ul").html("");
		var optionarr = optionstring.split(",");
		var valuearr = valuestring.split(",");
		var str="<li>&nbsp;</li>";
		for(var i=0;i<optionarr.length;i++){
			str += "<li id='value"+i+"'>"+optionarr[i]+"<span style='display:none'>"+valuearr[i]+"</span></li>";
		}
		return str+"<li>&nbsp;</li>";
	}	

	//创建 -- 第二个滚动选择 -- 列表 	
	function createDate_UL(optionstring,valuestring){
		  $("#monthwrapper ul").html("");
		var optionarr = optionstring.split(",");
		var valuearr = valuestring.split(",");
		var str="<li>&nbsp;</li>";
		for(var i=0;i<optionarr.length;i++){
			str += "<li id='value"+i+"'>"+optionarr[i]+"<span style='display:none'>"+valuearr[i]+"</span></li>";
		}
		return str+"<li>&nbsp;</li>";
	}		

    var indexH=indexI=1;

	function init_iScroll_datetime(grade){
		if (grade>1) {
			DateScroll = new iScroll("monthwrapper",{snap:"li",vScrollbar:false,
			onScrollEnd:function () {
				indexH = Math.round((this.y/40)*(-1))+1;
				DateScroll.refresh();
			}
			});
		}
		
		TimeScroll = new iScroll("daywrapper",{snap:"li",vScrollbar:false,
			onScrollEnd:function () {
				indexI = Math.round((this.y/40)*(-1))+1;
				TimeScroll.refresh();
			}
		});
	}


	 function CreateDateUI(optsobj){
indexH=indexI=0;
		var str = ''+
			'<div id="dateshadow"></div>'+
			'<div id="datePage" class="page">'+
				'<section>'+
					'<div id="datetitle"><h1>'+optsobj.titlestring+'</h1></div>'+
					'<div id="datemark"><a id="markmonth"></a><a id="markday"></a></div>'+
					'<div id="datescroll">'+
						'<div id="monthwrapper">'+
							'<ul></ul>'+
						'</div>'+					
						'<div id="daywrapper">'+
							'<ul></ul>'+
						'</div>'+
					'</div>'+
				'</section>'+
				'<footer id="dateFooter">'+
					'<div id="setcancle">'+
						'<ul>'+
							'<li id="dateconfirm">确定</li>'+
							'<li id="datecancle">取消</li>'+
						'</ul>'+
					'</div>'+
				'</footer>'+
			'</div>';
		$("#datePlugin").html(str);

		$("#daywrapper ul").html(createTime_UL(optsobj.optionstring,optsobj.valuestring));

		if (optsobj.grade>1) {
			$("#monthwrapper ul").html(createDate_UL(optsobj.secoption,optsobj.secvalue));	
		}else{
			$("#daywrapper").css({
			width: '100%',
			left: '0%'
			});
		}

		init_iScroll_datetime(optsobj.grade);
	}





    //
    // define and expose our format function
    //
    $.fn.jmselect.format = function(txt){
        return '<strong>' + txt + '</strong>';
    };
    
    //
    // plugin defaults
    //
    $.fn.jmselect.defaults = {
	 optionstring: "option1,option2,option3",
	 valuestring:"val1,val2,val3",
	 titlestring:"请选择",
	 secoption: "secoption1,secoption2,secoption3",
	 secvalue:"secval1,secval2,secval3",
	 grade:1,
	 wrapid:"m-content"
    };
    
    //
    // end of clousure
    //
})(jQuery);