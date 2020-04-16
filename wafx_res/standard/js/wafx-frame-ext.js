class WaFxMFrameExt {

	static changeScreen() 
  	{
  		WaFxMFrameExt.m_last_height = -1;

  		let elems = Array.from(document.querySelectorAll("[class^='comp_']"));
  		let elems2 = Array.from(document.querySelectorAll(".wafxBanner"));
		if (elems2!=null)
		{
			elems = elems.concat(elems2);
		};


		[].forEach.call(elems, function(el) {

			WaFxNodeData.setData(el,"wafx_initial_y",null);
			el.style.top="";
		});

  	}
  	static init() 
  	{
		WaFxMFrameExt.m_last_height = -1;
  		WaFxMFrameExt.m_pool_time = 500;
  		document.addEventListener("DOMContentLoaded", function() 
		{
			WaFxMFrameExt.var_timer = setTimeout("WaFxMFrameExt.checkSizeFrame()", WaFxMFrameExt.m_pool_time);
		});
		
	}

	static checkSizeFrame() 
  	{

  		let wrapper = document.querySelector('.wafxWrapper_ecwid');

  		if (wrapper==null)
  		{
  			//alert("no ecwid")
  			return;
  		}
  		let rBound = WaFxNodeGeometry.boundingRect(wrapper);
  		let pos = WaFxNodeGeometry.globalPosition(wrapper);

  		let currentHeight = rBound.height / WaFxWindow.currentScreen().factor();
  		//	alert('check '+rBound.top+"  "+rBound.height)
  		if (WaFxMFrameExt.m_last_height  != currentHeight)
  		{
  			WaFxMFrameExt.m_last_height = currentHeight;


  			let elems = Array.from(document.querySelectorAll("[class^='comp_']"));
  			let elems2 = Array.from(document.querySelectorAll(".wafxBanner"));

//  			alert(elems2.length);
  			if (elems2!=null)
  			{
  				elems = elems.concat(elems2);

			  [].forEach.call(elems, function(el) {


			  		let wrapper_dummy  = el.querySelector('.wafxWrapper_ecwid');

			  		if (wrapper_dummy==null)
			  		{
			  			let pos_el = WaFxNodeGeometry.globalPosition(el);

						let initial_y = WaFxNodeData.getData(el,"wafx_initial_y");
						if (initial_y==null)
						{
							initial_y = pos_el.top;
							WaFxNodeData.setData(el,"wafx_initial_y",initial_y);
						}

						if (initial_y>pos.top)
						{
							let offset = (initial_y-pos.top);
							el.style.top=(pos.top + offset +WaFxMFrameExt.m_last_height)+"px";
						}
			  		}


			  		
				});
  			}
  		}

  		WaFxMFrameExt.var_timer = setTimeout("WaFxMFrameExt.checkSizeFrame()", WaFxMFrameExt.m_pool_time);
  	}
}