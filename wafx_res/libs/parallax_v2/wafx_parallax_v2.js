


class WaFxParallax
{
	static init()
	{
		var requestAnimationFrame = 
		window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	 	window.requestAnimationFrame = requestAnimationFrame;

		window.addEventListener('resize',(function()
		{
			//WaFxParallax.log("initAllElements resize");
			
			setTimeout((function(){
				WaFxParallax.initAllElements();
				}),200);
				
			
			}
		));
	 	WaFxParallax.initAllElements();
	}

	static initAllElements()
	{
	 	[].forEach.call(document.querySelectorAll('.wafxParallaxV2-wrap'), function(el) {

	 		var b_new = false;
	 		 var parallax_wafx = WaFxNodeData.getData(el,"parallax_obj");
	 		 if (parallax_wafx==undefined)
	 		 {
	 		 	parallax_wafx = new WaFxParallax();
	 		 	b_new = true;
	 		 }
		

		    WaFxNodeData.setData(el,"parallax_obj",parallax_wafx);
		    parallax_wafx.initElement(b_new,{wrapper_div:el});
		    
		});
	}

	 constructor() 
	 {
		this.Targets = [];
		//this.TargetsLength = 0;
		this.wrapper = '';
		this.windowHeight = 0;
		this.wapperOffset = 0;


		this.isAnimate =  false;
		this.isResize  =  false;
		this.scrollId =  "";
		this.resizeId =  "";
	 }


	getClosest(elem, selector) {
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}
		return null;
	}

	initElement(b_new,options){
		this.settings = options;
		this.windowHeight = parseFloat((window.innerHeight || document.documentElement.clientHeight || 0));

		this.wrapper =this.settings.wrapper_div;
		this.targets = this.wrapper.querySelectorAll(".wafxParallaxV2-bg");


		
		if (b_new)
		{
			this.attachEvent();
		}

		this.apply(this.targets,this.wrapper);

		if (b_new)
		{
			this.animate();
			this.resize();
		}		
	}

	apply(targets,wrapper){
		this.wrapperInit();
		
		this.Targets = [];
		for (var i = 0; i < targets.length; i++) 
		{
			this.targetsInit(targets[i]);
		}
	}

	static log(mess)
	{
		console.log(mess);
	}
	wrapperInit(){
		//modif greg
		//this.wrapper.style.width = '100%';
		//this.wrapper.style.position = 'fixed';
	}
	targetsInit(elm_bg){

		this.m_b_fluid = false;

		var scale = parseFloat(elm_bg.getAttribute('data-image-scale'));

		var sizeImageOriginale = new WaFxSize(parseInt(elm_bg.getAttribute('data-original-width')),parseInt(elm_bg.getAttribute('data-original-height')));

		var w_item = parseInt(window.getComputedStyle(this.wrapper,null).getPropertyValue("width"));
		var h_item = parseInt(window.getComputedStyle(this.wrapper,null).getPropertyValue("height"));
		
		var x_item = parseInt(window.getComputedStyle(this.wrapper,null).getPropertyValue("left"));
		
//alert(x_item)

		var parent_fluid = this.getClosest(this.wrapper,".wafxCompFluid");
		if (parent_fluid!=null)
		{
			var w_item_parent = parseInt(window.getComputedStyle(parent_fluid,null).getPropertyValue("width"));
			w_item = w_item_parent-5;
			this.m_b_fluid = true;
		}

		//wafxCompFluid
		var sizeZoneItem = new WaFxSize(w_item,h_item);
		var size_temp =  sizeImageOriginale.clone();
	
		size_temp = size_temp.scaledByExpanding(sizeZoneItem.scaled(scale));

		var computed_offset= - Math.round((size_temp.height - sizeZoneItem.height)/2);

        var offset_x = -Math.round((sizeZoneItem.width*scale-sizeZoneItem.width)/2);


       // offset_x -= 100;

        var w_element = Math.round(Math.max(scale*sizeImageOriginale.width,scale*sizeZoneItem.width));
        var h_element = Math.max(sizeImageOriginale.height,size_temp.height);

		elm_bg.style.backgroundSize=Math.round(size_temp.width)+"px "+size_temp.height+"px";
		elm_bg.style.width=w_element+"px";
		elm_bg.style.height=h_element+"px";

		this.wrapper.style.width=sizeZoneItem.width+"px";

		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

		var obj={
			elm : elm_bg,
			b_is_hidden:false,
			offset : computed_offset,
			left : 0,
			speedY : parseFloat(elm_bg.getAttribute('data-speed-y')),
			inertyY : parseFloat(elm_bg.getAttribute('data-inerty-y')),
			refPositionInerty : scrollTop,
			inertyOffset: 0,
		};






		this.Targets.push(obj);

		this.render(obj,0);
	}


	render(target,offset_inertia)
	{
		var elm_bg = target.elm;
		var b_optim = true;
		var posBg = this.computeBgPosition(target);

		var b_optim = false;

		if (b_optim && (target.speedY==1))
		{
			/*
			elm_bg.style.willChange="transform";
			elm_bg.style.position="fixed";
			elm_bg.style.zIndex=-1;
			//elm_bg.style.top = (posBg.y2)+"px";
			elm_bg.style.backgroundRepeat="repeat";
			elm_bg.style.backgroundPosition = "0px "+(posBg.y)+"px";
			*/
			elm_bg.style.backgroundAttachment="fixed"
			elm_bg.style.backgroundPosition = posBg.x+"px "+(posBg.y+offset_inertia)+"px";
			//elm_bg.style.willChange="transform";
			
		}
		else
		{
					var elm_bg = target.elm;

		var scale = parseFloat(elm_bg.getAttribute('data-image-scale'));

			var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

			/////
			        var nodeBlockPage = document.querySelector(".blockPage");
       		 var rectPage = nodeBlockPage.getBoundingClientRect();
     		var windowWidth = Math.max(rectPage.width,document.documentElement.clientWidth);
		var x_item = parseInt(window.getComputedStyle(this.wrapper,null).getPropertyValue("left"));
			var x_dec = (x_item+(windowWidth-rectPage.width*scale)/2);

			//this.windowHeight 

			var posX = posBg.x;
			var posY = (posBg.y+offset_inertia);
			if (isFirefox)
			{
			//	posX -= x_dec;
//posY =offset_inertia
				//alert(this.scrollTop)
			}

			elm_bg.style.backgroundAttachment="fixed"
			elm_bg.style.backgroundPosition = posX+"px "+posY+"px";


		}

	}
	scroll()
	{
		var scrollTopTmp = document.documentElement.scrollTop || document.body.scrollTop;
		this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var offsetBottom = this.scrollTop + this.windowHeight;
		
		this.wrapperUpdate(this.scrollTop);
		for (var i = 0; i < this.Targets.length; i++) {
			this.targetsUpdate(this.Targets[i]);
			
		}
	}
	animate (){
		this.scroll();
		this.scrollId = requestAnimationFrame(this.animate.bind(this));
	}
	wrapperUpdate(){
	//	this.wrapper.style.transform = 'translate3d(' + 0 + ',' +  Math.round(-this.wapperOffset* 100) / 100 + 'px ,' + 0 + ')';
			this.wrapper.style.transform = 'translate3d(' + 0 + ',' +  Math.round(-0) / 100 + 'px ,' + 0 + ')';
	}

	computeBgPosition(target){

		var elm_bg = target.elm;

		var scale = parseFloat(elm_bg.getAttribute('data-image-scale'));

		var y_element = Math.round(parseFloat(window.getComputedStyle(this.wrapper.parentNode,null).getPropertyValue("top")));
		var h_item = parseInt(window.getComputedStyle(this.wrapper,null).getPropertyValue("height"));

		var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	//	alert(y_element+" "+h_item)
		var item_middle = (y_element + h_item/2);
		var scrollReference = this.scrollTop;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

//this.scrollTop = scrollTop;
	//	alert(scrollTop+" "+this.scrollTop)
		var offsetBottom = scrollTop + this.windowHeight;

		var offsetMiddle = -(this.windowHeight - h_item)/2;


		var factorSpeed = -((this.scrollTop+this.windowHeight/2)-(y_element+h_item/2));


		///


		var correctY_begin = 0;
		var correctY_end = 0;

		correctY_begin = -((this.windowHeight/2) - item_middle);
		correctY_begin = -correctY_begin;
		if (y_element>this.windowHeight)
		{
			correctY_begin =0;
		}
		else
		{
			factorSpeed = -this.scrollTop;
		}

		correctY_end = ((document.body.scrollHeight - this.windowHeight/2) - item_middle);

		
		if ((item_middle<this.windowHeight)||(item_middle<(document.body.scrollHeight - this.windowHeight/2)))
		{
			correctY_end =0;
		}
		else
		{
			factorSpeed = -(this.scrollTop -(document.body.scrollHeight-this.windowHeight))
		}

		//speed

		var offsetSpeedY = (factorSpeed) * ((target.speedY-1));


		var correctionY = offsetMiddle;

		var yRef = 0;


		if (y_element<=offsetBottom)
		{
			yRef += correctY_begin;
			yRef += correctY_end;
		}

		yRef += correctionY;


		var offset = 0;

		var offset_effective = offset;

		var targetOffsetTop = yRef - target.offset ;
	
		if (isFirefox)
		{
			targetOffsetTop = yRef + target.offset ;
		}


		var offsetY = offset_effective + Math.round(targetOffsetTop * -100) / 100;
		var offsetX = 0;

		var x_item = parseInt(window.getComputedStyle(this.wrapper,null).getPropertyValue("left"));

		
        var nodeBlockPage = document.querySelector(".blockPage");
        var rectPage = nodeBlockPage.getBoundingClientRect();
     	var windowWidth = Math.max(rectPage.width,document.documentElement.clientWidth);

		var x_dec = (x_item+(windowWidth-rectPage.width*scale)/2) ;



		if (this.m_b_fluid)
		{
			x_dec = 0;
		}
		var y_dec = offsetY-offsetSpeedY;

	//alert(targetOffsetTop+" "+this.scrollTop+" "+offsetSpeedY)

	
		if (isFirefox)
		{
			x_dec -= (x_item+(windowWidth-rectPage.width)/2);

			y_dec -= offset_effective + (Math.round(targetOffsetTop * -100) / 100) -((y_element*scale  + h_item /2))- this.scrollTop;
			//y_dec = targetOffsetTop+this.scrollTop-offsetSpeedY;

		}


		return {"x":x_dec,"y":y_dec};

	
	}
	targetsUpdate(target){


		var elm_bg = target.elm;
		//return;
		var scale = parseFloat(elm_bg.getAttribute('data-image-scale'));

		var y_element = Math.round(parseFloat(window.getComputedStyle(this.wrapper.parentNode,null).getPropertyValue("top")));
		var h_item = parseInt(window.getComputedStyle(this.wrapper,null).getPropertyValue("height"));
		var item_middle = (y_element + h_item/2);
		var scrollReference = this.scrollTop;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var offsetBottom = scrollTop + this.windowHeight;

	//	var posBg = this.computeBgPosition(target);

		var inerty_Y = target.inertyY;

		var offset_inertia = 0;
		
		if (inerty_Y != 0) //application inertie
		{
			 offset_inertia = (target.refPositionInerty-scrollTop);

			var step_y = offset_inertia*inerty_Y;

			if (Math.abs(target.refPositionInerty)<0.2)
			{
				target.refPositionInerty = scrollTop;
			}
			else
			{
				target.refPositionInerty -= step_y;
			}
			var sign = Math.abs(target.inertyOffset)/offset_inertia;
			if ((sign<0)||(y_element>offsetBottom))
			{
				target.refPositionInerty = scrollTop;
				offset_inertia = 0;
			}
		}

//offset_inertia = 0;

		this.render(target,offset_inertia);
		//elm_bg.style.backgroundPosition = posBg.x+"px "+(posBg.y + offset_inertia)+"px";

	}



	resize(){
		var self = this;
		self.windowHeight = parseFloat((window.innerHeight || document.documentElement.clientHeight || 0));
		self.resizeId = requestAnimationFrame(self.resize.bind(self));
	}

	attachEvent()
	{
		var self = this;
		window.addEventListener('resize',(function(){
			if(!self.isResize){
				cancelAnimationFrame(self.resizeId);
				cancelAnimationFrame(self.scrollId);
				self.isResize = true;
				setTimeout((function(){
					self.isResize = false;
					self.resizeId = requestAnimationFrame(self.resize.bind(self));
					self.scrollId = requestAnimationFrame(self.animate.bind(self));
				}),200);
			}
		}));
		
	}

}

