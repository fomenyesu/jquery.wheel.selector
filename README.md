#JQSelector# (jQuery select)
  
  JQSelector -- a jQuery select plugin that popup an modal as an Ios like selector depending on jquery and iscroll. Create an excellence experience in Mobile and Hybird App.
  
    
  Here Is the [livedemo](http://codepen.io/fomenyesu/pen/jbPLzd);

Usage

    $("#selectid").click(function(){
        console.log("click");
        $(this).jmselect({
            optionstring: "option-1,option-2,option-3,option-4,option-5,option-6,option-7,option-8",
            valuestring:"value-1,value-2,value-3,value-4,value-5,value-6,value-7,value-8",
            secoption: "secondoption-1,secondoption-2,secondoption-3,secondoption-4,secondoption-5,secondoption-6,secondoption-7,secondoption-8",
            secvalue:"secondvalue-1,secondvalue-2,secondvalue-3,secondvalue-4,secondvalue-5,secondvalue-6,secondvalue-7,secondvalue-8",
            titlestring:"JQSelector",
            grade:2,
            wrapid:"container"
        });
      })
      
      optionstring: //firstoption
      valuestring: //firstvalue
      secoption: //secondoption 
      secvalue: //secondvalue
      titlestring: //selector's title
      grade:2, //how many options to be slected, default 1 
      wrapid://container dom id
      
