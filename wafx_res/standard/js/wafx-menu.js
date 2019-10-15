
class WaFxMenuGlobal {

	static closeAnimFade(el)
    {
    	return;
          let idAnim1 = WaFxNodeData.getData(el,"anim_fadeout");
          if (idAnim1) cancelAnimationFrame(idAnim1);
          WaFxNodeData.getData(el,"anim_fadeout",false);

          let idAnim2 = WaFxNodeData.getData(el,"anim_fadein");
          if (idAnim2) cancelAnimationFrame(idAnim2);
          WaFxNodeData.getData(el,"anim_fadein",false);
    };  

    static fadeIn(el, display){
     // el.style.opacity = 0;
      (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .01) > 1)) {

          WaFxMenuGlobal.closeAnimFade(el);

          el.style.opacity = val;
          let idAnim = requestAnimationFrame(fade);
          WaFxNodeData.setData(el,"anim_fadein",idAnim);
        }
      })();
    };
    static fadeOut(el){
      el.style.opacity = 1;
      (function fade() {
        if ((el.style.opacity -= .1) < 0) {
        //  el.style.display = "none";
        } else {
          WaFxMenuGlobal.closeAnimFade(el);

          let idAnim = requestAnimationFrame(fade);
          WaFxNodeData.setData(el,"anim_fadeout",idAnim);
        }
      })();
    };

	static refreshVisibilitySticky()
	{
		[].forEach.call(document.querySelectorAll('.wafx-menu-wrapper'), function(el) {

	  		let b_sticky_div = WaFxNodeData.getData(el,"sticky_div");
	  		if (b_sticky_div)
	  		{
		  		let el_menu = WaFxNodeData.getData(el,"wrapper");
		  		let nodeMenu = el_menu.querySelector('.wafx-menu');
				//alert(nodeMenu.getAttribute("data-sticky-large"))

				let nodeMenuClone = el.querySelector('.wafx-menu');
				if (nodeMenu.getAttribute("data-sticky")!="true")
				{
					WaFxNodeGeometry.setVisible(nodeMenuClone,false);
				}
				//WaFxNodeGeometry.setVisible(nodeMenuClone,nodeMenu.getAttribute("data-sticky"));
				


	  			{
			  		let rBound = WaFxNodeGeometry.boundingRect(el_menu);
			  		if (rBound.top<-10)
			  		{
			  			
				  	//	if (el.style.opacity==1)
				  		{
				  			
				  			WaFxMenuGlobal.fadeIn(el)
				  		}
				  		
				  			
			  		
			  			WaFxNodeGeometry.setVisible(el,true);

			  			el.style.zIndex=100000;

			  			let body = document.querySelector(".blockPage"); 

			  			if (nodeMenu.getAttribute("data-sticky-large"))
			  			{
			  				body = document.body;
			  			}
			  			let boundRect = WaFxNodeGeometry.boundingRect(nodeMenu);

			  			el.style.height = boundRect.height+"px";


			  			el.style.left = WaFxNodeGeometry.boundingRect(body).left+ "px";
			  			el.style.width = WaFxNodeGeometry.boundingRect(body).width+"px";
			  		}
			  		else
			  		{
			  			WaFxNodeGeometry.setVisible(el,false);
			  			el.style.opacity = 0;
			  		}

	  			}



	  		}
		});
	}

  static initWrapper(el,cl_unid,b_sticky)
  {
  	  	
		WaFxNodeData.setData(el,"sticky_div",b_sticky);
		let nodeDivBg = document.createElement("DIV"); 

		let html_bg = '';

		html_bg +="<div class=\""+cl_unid+" wafxBgMenu \">";
		html_bg +="<div class='wafxMenuBgStaticPanel'>";
		html_bg +="<div class='wafxCloseBgMenu'>";

		html_bg +="<svg  version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24' >";
		html_bg +="<path d='M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z'></path>";
		html_bg +="</svg>";

		html_bg +="</div>";
		html_bg +="<div class='wafxMenuPageBack'><div class='wafxMenuPageBackText wafxMenuItemLeftPad wafxMenuItemRightPad'></div></div>";
		html_bg +="</div>";
		html_bg +="<div class='wafxMenuPage' ></div>";
		html_bg +="</div>";
		nodeDivBg.innerHTML = html_bg;
  		document.body.appendChild(nodeDivBg);

  		let nodeBg = document.querySelector('.'+cl_unid+'.wafxBgMenu');

  		let wafxMenuBackground = new WaFxMenuBackground(nodeBg);
  		let nodeMenu = el.querySelector('.wafx-menu');
  		let nodeHamburger = el.querySelector('.wafx-menu-bt-hamburger');

  		let menu = new WaFxMenu(nodeMenu,b_sticky);
  		if (nodeHamburger)
  		{
  			let ham = new WaFxMenuHamburger(nodeHamburger,wafxMenuBackground,menu);
  		}
  }
}






class WaFxMenu {
  constructor(node,b_sticky) 
  {
    this.node = node;
    this.b_sticky = b_sticky;
    this.bindMenu();
  }

  bindMenu()
  {
  	let nodeFrameMainMenu = this.node.querySelector(".wafx-menu-frame-main");
  	this.frame = new WaFxMenuFrame(nodeFrameMainMenu,null);
  	this.frame.mIsFloatingFrame = false;
  	this.frame.setOrientation(WaFxMenuFrame.HORIZONTAL);

  	let _this = this;


	  _this.children = [];
  	  [].forEach.call(nodeFrameMainMenu.querySelectorAll(':scope > li > .wafx-menu-item'), function(el) {

  		var item = new WaFxMenuSimpleDomItem(el,_this,_this);
  		_this.children.push(item);
		});

  }
}

class WaFxMenuSimpleDomItem {
	constructor(node,itemParent,menu) 
  {
  	this.menu = menu;
    this.node = node;
    this.itemParent = itemParent;
	let _this = this;

	let parNodeFrm = this.node.parentNode.querySelector('.wafx-menu-frame')
	
    _this.children = [];
    if (parNodeFrm!=null)
    {
    	  	  [].forEach.call(parNodeFrm.querySelectorAll(':scope >li > .wafx-menu-item'), function(el) {

  				var item = new WaFxMenuSimpleDomItem(el,_this,menu);
  				_this.children.push(item);

  				///

		  		if (item.children.length>0)
		  		{
		  			//alert(menu.node.getAttribute("data-sticky"))
		  			if (menu.b_sticky==false)
		  			{
		  					var nodeSpan = document.createElement("SPAN");  
			  				nodeSpan.innerHTML = "&nbsp;&#62;";
			  				item.node.appendChild(nodeSpan);
		  			}



		  		}
  				///



			});


    }

  }
}
////////////:
class WaFxMenuItem {

  constructor(node) 
  {
    this.node = node;
    this.bindMenu();
  }

  setData(key,obj)
  {
  	WaFxNodeData.setData(this.node,key,obj);
  }
  parentFrame()
  {
  	return WaFxNodeData.getData(this.node,"parentMenuFrame");
  }

  wakeParentFrame()
  {
  	var frm  =this.parentFrame();
  	if (frm!=null)
  	{
  		//alert("wakeParentFrame " + frm);
  		frm.wakeVisibility();
  	}
  }


	getMenuFrame() 
	{
		let screen = WaFxWindow.currentScreen();
		var el = this.node;
		let key_data_frm = 'menu-frame';
		var frm = WaFxNodeData.getData(el,key_data_frm);

		if (frm==null)
		{
			var frm_node = el.parentNode.querySelector('.wafx-menu-frame');
			if (frm_node==null)
			{
				return null;
			}
			frm = new WaFxMenuFrame(frm_node,this);

			let body = document.querySelector(".blockPagecontainer"); //blockPagecontainer  blockPage
			body = document.body

			
//blockPagecontainer
			body.appendChild(frm_node);
			WaFxNodeData.setData(el,key_data_frm,frm) 
		}
		return frm;
	}

  showFrame()
  {
	if (this.parentFrame()!=null)
  	{
  		if (this.parentFrame().raisedItem!=null)
	  	{
	  		this.parentFrame().raisedItem.getMenuFrame().hide();
	  	}
  		
  	}

	


	let frm = this.getMenuFrame();

	if (frm!=null)
	{
		frm.wakeVisibility()
		let st_frm = frm.node.style;

		st_frm.display = 'block';
		st_frm.position="absolute";
		st_frm.zIndex=100000;

		let x = 0;
		let y = 0;

		let screen = WaFxWindow.currentScreen();



		//frm.node.style.transform="scale("+screen.factor()+")"
		//frm.node.style.transform="scale("+screen.factor()+")"
		var clientSize = WaFxWindow.clientSize();

		let parFrame = this.parentFrame();

		var posItem = WaFxNodeGeometry.globalPosition(this.node);
		var posParentFrame = WaFxNodeGeometry.globalPosition(parFrame.node);

		

		
		if (parFrame.orientation()==WaFxMenuFrame.HORIZONTAL)
		{
			let factor = screen.factor()
			x = posItem.left;
			y = (posItem.top) + (parFrame.node.offsetHeight*factor);

		}
		else
		{
			x = posParentFrame.left+parFrame.node.offsetWidth;//  + window.pageXOffset;
			y = posItem.top;
		}


		st_frm.left = x+"px";
		st_frm.top = y+"px";

		var bounding = WaFxNodeGeometry.boundingRect(frm.node);

		let diff_x = (bounding.right-(clientSize.width-20));
		if (diff_x>0)
		{
			st_frm.left = (x-diff_x)+"px";
		}
		let diff_y = (bounding.bottom-(clientSize.height-20));
		if (diff_y>0)
		{
			st_frm.top = (y-diff_y)+"px";
		}


		this.wakeParentFrame();

		if (this.parentFrame()!=null)
	  	{
	  		this.parentFrame().raisedItem = this;
	  	}
	}
  }

  bindMenu()
  {
  	let _this = this;
		this.node.addEventListener('mouseover', function() 
		{
			_this.showFrame();
		});
			/////////
		this.node.addEventListener('mouseout', function() 
		{
			//
			let frm = _this.getMenuFrame();
			if (frm!=null)
			{
				frm.hideDelayed();
			}
			if (_this.parentFrame()!=null)
			{
				_this.parentFrame().hideDelayed();
			}
		})
  }
}
////////////////////////////

class WaFxMenuFrame {


	

  constructor(node,menu_item) 
  {

      this.node = node;
     this.menu_item = menu_item;
  	this.mOrientation = WaFxMenuFrame.VERTICAL;
  	this.mIsFloatingFrame = true;


    this.hideTimer = null;
    this.raisedItem = null;
    this.bindMenu();
  }
  isFloatingFrame()
  {
  	return this.mIsFloatingFrame;
  }
  setOrientation(o)
  {
  	this.mOrientation = o;
  }

  orientation()
  {
  	return this.mOrientation;
  }
  parentFrame()
  {
  	if (this.menu_item!=null)
  	return this.menu_item.parentFrame();
  	return null;
  }


  bindMenu()
  {

  	  let _this = this;

  	  let arrNodes = this.node.querySelectorAll(":scope > LI > .wafx-menu-item");

		  [].forEach.call(arrNodes, function(el) {

	  		var item = new WaFxMenuItem(el);
	  		item.setData("parentMenuFrame",_this);


		});
		

	/////
		this.node.addEventListener('mouseover', function() 
		{
			//
			_this.wakeVisibility() ;
		});
	/////
		this.node.addEventListener('mouseout', function() 
		{
			//
			_this.hideDelayed();
		});
  }

  hide() 
  {
  	  let st_frm = this.node.style;
      st_frm.display = 'none';
  }

  hideDelayed() 
  {
  	if (this.isFloatingFrame()==false)
  	{
  		return;
  	}
  	let _this = this;

	this.clearHideTimer();

  	this.hideTimer = setTimeout(function(){ _this.hide() }, 500);

  	if (this.parentFrame()!=null)
  	{

  		
  		this.parentFrame().hideDelayed();
  	}
  }

  clearHideTimer() 
  {
  	if (this.hideTimer!=null)
  	{
  		clearTimeout(this.hideTimer);
  		this.hideTimer = null;
  	}
  }

  wakeVisibility() 
  {
  	this.clearHideTimer();

  	if (this.parentFrame()!=null)
  	{
  		this.parentFrame().wakeVisibility();
  	}
  }
}


WaFxMenuFrame.VERTICAL = 0;
WaFxMenuFrame.HORIZONTAL = 1;
//////////////////////////


class WaFxMenuHamburger {
  constructor(node,menuBackground,menu) 
  {
  	this.node = node;
  	this.menuBackground = menuBackground;
  	this.menu = menu;
  	this.bind()
  }
  bind() 
  {

		let _this = this;
  		this.node.addEventListener('click', function() 
		{
			//
			_this.menuBackground.showBg(_this.menu)
		
		});

  }
}
////////////////////////////

class WaFxMenuBackground {
  constructor(node) 
  {
  	this.node = node;
	this.bind() ;
	this.currentPageMenu = null;
  }
  bind() 
  {
	let _this = this;
	  	document.body.appendChild(this.node);



	let nodeBgMenu =  this.node;//document.querySelector('.wafxBgMenu');
	nodeBgMenu.addEventListener('click', function(ev) 
	{
		_this.close()
		//ev.preventDefault() 
	});




  	//let nodeCloseBt = this.node.querySelector('.wafxCloseBgMenu');
  	//let nodeCloseBt = this.node.querySelector('.wafxBgMenu');



	let nodePage =  this.node.querySelector('.wafxMenuPage');
	nodePage.addEventListener('click', function(ev) 
	{
		//alert('clic 1')
		ev.stopPropagation() 
	});

	let nodePageBack =  this.node.querySelector('.wafxMenuPageBack');
	nodePageBack.addEventListener('click', function(ev) 
	{
		//alert('clic 1')
		ev.stopPropagation() 
	});
	
	//
	 let nodeBackBt = this.node.querySelector('.wafxMenuPageBack');
	 if (nodeBackBt!=null)
	 {
	 	nodeBackBt.addEventListener('click', function() 
		{
			let contParent =_this.parentDomItemContainer();
			if (contParent!=null)
			{
				_this.showPage(contParent);
				return false;
			}
		});
	 }

	//
	window.addEventListener("resize", function()
	{
		if (WaFxNodeGeometry.isVisible(_this.node))
		{
			_this.close();
			//_this.updateSizeMenuPage();
		}
	});
  }

  parentDomItemContainer() 
  {
  		let firstChild = this.currentPageMenu.children[0];
		let itemParent = firstChild.itemParent;

		if (itemParent!=null)
		{
			let itemParent2 = itemParent.itemParent;
			if (itemParent2!=null)
			{
				return itemParent2;
			}
		}
		return null;
  }

  close() 
  {
  	let nodePage = this.node.querySelector('.wafxMenuPage');
  	nodePage.innerHTML = "";
  		WaFxNodeGeometry.setVisible(this.node,false);

  		enableScroll()
  }

  showBg(menu) 
  {


  		let st_frm = this.node.style;
		var clientSize = WaFxWindow.windowSize();
		st_frm.display = 'block';
		st_frm.position="absolute";
		st_frm.left = "0px";
		st_frm.top = "0px";
		st_frm.width = (clientSize.width)+"px";
		st_frm.height = (clientSize.height)+"px";


  		
		//st_frm.transform="scale("+screen.factor()+")"



		this.showPage(menu);

		disableScroll()

 }

  showPage(pageMenu) 
  {

  	//	let scrollPos = WaFxWindow.scrollPosition();
  		this.currentPageMenu = pageMenu;
  		let _this = this;
		let nodePage = this.node.querySelector('.wafxMenuPage');




		let html = "<div class='wafxMenuPageGroupItem animated fadeInLeft' data-wow-duration='0.3s'>";


		let indexLinkPage = 0;
		 [].forEach.call(pageMenu.children, function(el) 
		 {
		 	let textItem = "";
		 	if (el.node.firstChild!=null)
		 	{
		 		textItem = el.node.firstChild.textContent;//recupere le texte avant le span eventuel (arrow)
		 	}
		 	



			let textDiv = "<div class='wafxMenuItemLeftPad wafxMenuLinkText wafxMenuItemVerticalPad'>"+textItem+"</div>";
			if (el.children.length>0)
			{

				let arrowDiv = "<div class='wafxMenuLinkArrow wafxMenuItemRightPad wafxMenuItemVerticalPad'>&nbsp;&#62;</div>";

				let classLinkPage = 'wafxMenuInternalLinkPage'+indexLinkPage;

				html += "<div class='wafxMenuLinkContainer wafxMenuPageItem  "+classLinkPage+"'>"+textDiv+arrowDiv+"</div>";
			}
			else
			{
				let classLinkSimple = 'wafxLinkInternal'+indexLinkPage;
				let href = el.node.getAttribute("href");
				if (href==null)href="javascript:void(0)"
				let target = el.node.getAttribute("target");
				let onclick = el.node.getAttribute("onclick");
				if (target==null)target="";
				if (onclick==null)onclick="";

				html += "<a href=\""+href+"\" target=\""+target+"\" onclick=\""+onclick+"\"  class='wafxMenuPageItem wafxMenuItemRightPad wafxLink "+classLinkSimple+"'>"+textDiv+"</a>";
			}

		
			indexLinkPage++;	
		});

		 html += "</div>";
		nodePage.innerHTML = html;


		 indexLinkPage = 0;
		 [].forEach.call(pageMenu.children, function(el) 
		 {
			let classLinkPage = 'wafxMenuInternalLinkPage'+indexLinkPage;
			let nodeEl = nodePage.querySelector('.'+classLinkPage);
			if (nodeEl!=null)
			{
				nodeEl.addEventListener('click', function() 
				{
					_this.showPage(el);
				
				});
			}

			let classLinkSimple = 'wafxLinkInternal'+indexLinkPage;
			let nodeLink = nodePage.querySelector('.'+classLinkSimple);
			if (nodeLink!=null)
			{
				nodeLink.addEventListener('click', function() 
				{
					_this.close();
				
				});
			}
			
			
			



			indexLinkPage++;	
		});

		 let nodeBackBt = this.node.querySelector('.wafxMenuPageBackText');
		 if (nodeBackBt!=null)
		 {
		 	let htmlBack = '';
			let contParent =_this.parentDomItemContainer();
			if (contParent!=null)
			{
				let firstChild = this.currentPageMenu.children[0];
				let itemParent = firstChild.itemParent;

				htmlBack = "&#11013; "+itemParent.node.firstChild.textContent;;
				
			}
			nodeBackBt.innerHTML = htmlBack;

			WaFxNodeGeometry.setVisible(nodeBackBt,contParent!=null)
		 }

/*

		*/

		this.updateSizeMenuPage();
  }

  updateSizeMenuPage() 
  {

  		let winSize = WaFxWindow.clientSize();
  		let nodeStaticPanel = this.node.querySelector('.wafxMenuBgStaticPanel');
  		let boundStatic = WaFxNodeGeometry.boundingRect(nodeStaticPanel);
  		let nodeGroupItem = this.node.querySelector('.wafxMenuPageGroupItem');
  		let stGrp = nodeGroupItem.style;
		let stPanelStatic = nodeStaticPanel.style;
		let screen = WaFxWindow.currentScreen();

  		let widthPanel = winSize.width -50;
  		widthPanel = Math.min(widthPanel,350);
		widthPanel = widthPanel = Math.max(widthPanel,150);


		stGrp.height = (winSize.height - boundStatic.height-10)+"px";
		stGrp.width = widthPanel+"px";
		stGrp.left = 0+"px";
		stGrp.top = (boundStatic.height + 0) + "px";


		stPanelStatic.width = stGrp.width;



  }
}
////////////////////////////

document.addEventListener("DOMContentLoaded", function() 
{

	window.addEventListener('resize', function(e) 
	{
		WaFxMenuGlobal.refreshVisibilitySticky();
	 });

	window.addEventListener('scroll', function(e) 
	{
		WaFxMenuGlobal.refreshVisibilitySticky();
	 });

  [].forEach.call(document.querySelectorAll('.wafx-menu-wrapper'), function(el) {
  		let cl_unid = el.dataset.menuUnid;

  		WaFxMenuGlobal.initWrapper(el,cl_unid,false);
  		
	});

  [].forEach.call(document.querySelectorAll('.wafx-menu-wrapper'), function(el) {
  		let nodeMenu = el.querySelector('.wafx-menu');
  		let nodeHamburger = el.querySelector('.wafx-menu-bt-hamburger');
		let cl_unid = el.dataset.menuUnid;
	  	if (nodeMenu.getAttribute("data-sticky") || nodeHamburger.getAttribute("data-sticky"))
	  	{
	  		let unidSticky = cl_unid;
	  		let nodeDivWrapper = document.createElement("DIV"); 


			let body = document.body;

			body.appendChild(nodeDivWrapper);


	  		nodeDivWrapper.setAttribute("data-menu-unid",unidSticky);
			nodeDivWrapper.classList.add(unidSticky, "wafx-menu-wrapper");


	  		let nodeMenuClone = null;
	  		//if (nodeMenu.getAttribute("data-sticky") )
	  		{
	  			nodeMenuClone = nodeMenu.cloneNode(true);
	  		}

	  		let nodeHamburgerClone = null;
	  		if (nodeHamburger.getAttribute("data-sticky") )
	  		{
	  			nodeHamburgerClone = nodeHamburger.cloneNode(true);
	  		}
	  		if (nodeMenuClone!=null)
	  		{
	  			nodeDivWrapper.appendChild(nodeMenuClone);
	  			nodeMenuClone.style.backgroundColor=nodeMenu.getAttribute("data-sticky-bg");
	  		}
	  		

	  		if (nodeHamburgerClone!=null)
	  		{
	  			nodeDivWrapper.appendChild(nodeHamburgerClone);
	  			nodeHamburgerClone.style.backgroundColor=nodeHamburger.getAttribute("data-sticky-bg");
	  		}

	  		nodeDivWrapper.style.position = "fixed";
	  		nodeDivWrapper.style.top = "0px";
			nodeDivWrapper.style.left = "0px";
			nodeDivWrapper.style.overflow = "visible";
			

			nodeDivWrapper.style.height = "10px";

	
			WaFxNodeData.setData(nodeDivWrapper,"wrapper",el);
			WaFxMenuGlobal.initWrapper(nodeDivWrapper,unidSticky,true);
	  	}
  
  		
	});

  WaFxMenuGlobal.refreshVisibilitySticky();

});
