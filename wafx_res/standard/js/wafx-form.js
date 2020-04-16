
  document.wa_form_flags = {};


class WafxForm
{
	static alert(txt)
    {	
    	alert(txt)
    }
	static send(id_form)
    {	
    
    	if (WaContext.preview)
    	{
    		WafxForm.alert("PREVIEW MODE\nYou have to publish to send forms !");
    		return;
    	}

    	let b_valid = true;
    	let settings = WafxForm.m_map_settings[id_form];
    	let fields = settings.fields;
    	let formData = new FormData();
    	formData.append("wafx_lang",WaPageContext.lang);
    	let arr = document.querySelectorAll('.wafx-form-input');
    	for (let el of arr)
	     { 
	     	let name = el.getAttribute("name");
	     	if (fields.includes(name))
	     	{
	     		let valField ="";
	     		if (el.type=="radio")
	     		{
	     			if (el.checked) valField = el.value;
	     		}
	     		else
	     		if (el.type=="checkbox")
	     		{
	     			valField = false;
	     			if (el.checked) valField = true;
	     		}
	     		else
	     		{
					valField = el.value;
	     		}

	   			if (el.checkValidity()==false)
	   			{
	   				el.reportValidity()
	   				b_valid = false;;
	   				break;
	   			}
				formData.append(name,valField);
	     	}
	     };
	    if (b_valid==false)
	    {
	    	return;
	    }
	  
	    var flag = document.wa_form_flags[id_form];
	    if (flag==true)
	    {
	    	return;
	    }

		document.wa_form_flags[id_form] = true;


    	for (let el of arr)
	     { 
	     	let name = el.getAttribute("name");
	     	if (fields.includes(name))
	     	{
	     		let valField ="";
	     		if (el.type=="radio")
	     		{
	     			el.checked = false;
	     		}
	     		else
	     		if (el.type=="checkbox")
	     		{
	     			el.checked = false;
	     		}
	     		else
	     		if (el.type=="select")
	     		{
	     			el.selectedIndex = -1;
	     		}
	     		else
	     		{
					el.value='';
	     		}
	     	}
	     };
		
		fetch(settings.url, {
			method: "POST",
			body: formData
		})
		.then(function(response) {
		    return response.text();
		 })
		  .then(function(text) {
		  	
		    let json = JSON.parse(text);
		    if (json.success)
		    {
		    	let success_message = settings.success_message;
		    	if (success_message.length==0)success_message="Sent successfully !";
		    	WafxForm.alert(success_message)
		    }
		    else
		    {
		    	WafxForm.alert(json.message)
		    }

		    document.wa_form_flags[id_form] = false;
		    //alert('Request successful='+text, text);

		  })
		  .catch(function(error) {
		    WafxForm.alert('Request failed', error);
		    document.wa_form_flags[id_form] = false;
		  });
    }

	
	static init(map_settings)
    {
    	WafxForm.m_map_settings = map_settings;
	      //document.addEventListener("DOMContentLoaded", function() {});
    }

   	static initAllForms()
    {
	      [].forEach.call(document.querySelectorAll('.wafx-form-submit'), function(el) 
	      { });
    }
}
    