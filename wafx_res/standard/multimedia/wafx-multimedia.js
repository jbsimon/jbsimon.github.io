


class WafxRollOver
{
    static closeAnimFade(el)
    {
          let idAnim1 = WaFxNodeData.getData(el,"anim_fadeout");
          if (idAnim1) cancelAnimationFrame(idAnim1);

          let idAnim2 = WaFxNodeData.getData(el,"anim_fadein");
          if (idAnim2) cancelAnimationFrame(idAnim2);
    };  
    static fadeIn(el, display){
      el.style.opacity = 0;
      (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {

          WafxRollOver.closeAnimFade(el);

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
          WafxRollOver.closeAnimFade(el);

          let idAnim = requestAnimationFrame(fade);
          WaFxNodeData.setData(el,"anim_fadeout",idAnim);
        }
      })();
    };
    static bindPictureOver(el)
    {
              let picture = WaFxNodeData.getData(el,"picture");
              let mainPicture = WaFxNodeData.getData(picture,"main_picture");
              let overPicture = WaFxNodeData.getData(picture,"over_picture");
              if (overPicture)
              {
                  WafxRollOver.fadeOut(mainPicture);
                  WafxRollOver.fadeIn(overPicture);
              }

    }
    static bindPictureOut(el)
    {
              let picture = WaFxNodeData.getData(el,"picture");
              let mainPicture = WaFxNodeData.getData(picture,"main_picture");
              let overPicture = WaFxNodeData.getData(picture,"over_picture");
              if (overPicture)
              {
                WafxRollOver.fadeIn(mainPicture);
                WafxRollOver.fadeOut(overPicture);
              }

    }

    static bind()
    {
         Array.prototype.forEach.call(document.querySelectorAll('.wafxPictureOver'), function(el){
           
          let mainPicture = el.querySelector('.wafx-img-picture');
          if (mainPicture)
          {
            WaFxNodeData.setData(mainPicture,"picture",el);
            WaFxNodeData.setData(el,"main_picture",mainPicture);
          } 
          let overPicture = el.querySelector('.wafx-img-picture-over');
          if (overPicture)
          {
            WaFxNodeData.setData(overPicture,"picture",el);
            WaFxNodeData.setData(el,"over_picture",overPicture);
          } 
          ///

          mainPicture.addEventListener("mouseover", function()
          {
            WafxRollOver.bindPictureOver(this);
          });

          mainPicture.addEventListener("mouseout", function()
          {
              WafxRollOver.bindPictureOut(this);
          });

          overPicture.addEventListener("mouseover", function()
          {
            WafxRollOver.bindPictureOver(this);
          });

          overPicture.addEventListener("mouseout", function()
          {
              WafxRollOver.bindPictureOut(this);
          });


        });

    }
    static init()
    {
      document.addEventListener("DOMContentLoaded", function() 
      {
        WafxRollOver.bind();

         
      });
    }
}

class WafxRipple
{
    static init()
    {
      document.addEventListener("DOMContentLoaded", function() 
      {
        Array.prototype.forEach.call(document.querySelectorAll('.wafxRipple'), function(el){
            new WaFxRippleEffect(el); // element is instance of javascript element node
        });
      });

    }
}


class WafxFluidHelper
{
    static init()
    {
        window.addEventListener("resize", function()
        {
            WafxFluidHelper.resizeFluidElements();
          //  WafxFluidHelper.resizeFluidElements();
        });

        WaFxWindow.analyzeCurrentScreen();
        WafxFluidHelper.resizeFluidElements();
    }
    static resizeFluidElements()
    {
      WaFxWindow.analyzeCurrentScreen();
          let screen = WaFxWindow.currentScreen();


        let nodeBlockPage = document.querySelector(".blockPage");
        let rectPage = nodeBlockPage.getBoundingClientRect();
       // alert(rectPage.left)
        let windowWidth = Math.max(rectPage.width,document.documentElement.clientWidth);
        [].forEach.call(document.querySelectorAll('.wafxCompFluid'), function(el) 
        {

          if (el.classList.contains('wafxCompFloat'))
          {
            el.style.left =  "0px";
          }
          else
          {
            el.style.left = (-rectPage.left/screen.factor())+"px"
          }
            el.style.width=(windowWidth/screen.factor()-1)+"px"

        });

        [].forEach.call(document.querySelectorAll('.wafxCompSimpleBanner'), function(el) 
        {

        });
    }
}  


class WafxPlyrAudio
{
    static bind()
    {
          [].forEach.call(document.querySelectorAll('.wafx-audio'), function(el) {


                let id_audio = el.getAttribute('id');
                if (id_audio!=null)
                {
                  let config = {
                    'controls':['play', 'progress', 'current-time', 'mute', 'volume'],
                  //  'settings':['captions', 'quality', 'loop'],

                };
                  const player = new Plyr('#'+id_audio,config);
                }
          });
    }

    static init()
    {
      document.addEventListener("DOMContentLoaded", function() 
      {
        WafxPlyrAudio.bind();
      });
    }
}

class WafxBlueImpGallery
{
    static init()
    {
      document.addEventListener("DOMContentLoaded", function() 
      {
            [].forEach.call(document.querySelectorAll('.wafx-gallery'), function(el) {

                el.onclick = function (event) {

                event = event || window.event;
                var target = event.target || event.srcElement,
                    link = target.src ? target.parentNode : target,
                    options = {index: link, event: event},
                    links = this.getElementsByTagName('a');

                blueimp.Gallery(links, options);
                };
            });
      });
    }
}
class WafxBlueImpCarousel
{
    static prepareDatasAccordingScreen(datas)
    {
        let items = datas.items;
        let screen = WaFxWindow.currentScreen();


        for (let i=0;i<items.length;i++)
        {
          let it = items[i];

          it.href = "";
          let resp_src = it.src[screen.sourceWidth()];
          if (resp_src!=undefined)
          {
              it.href = resp_src;
          }
        }
   
        return datas;
    }

    static reload()
    {
          [].forEach.call(document.querySelectorAll('.wafx-carousel'), function(el) {
          let id_carousel = el.getAttribute('id');
          if (id_carousel!=null)
          {
                  let dataCarousel = WafxBlueImpCarousel.prepareDatasAccordingScreen(document.wafxCarouselDatas[id_carousel]);

                  var obj = WaFxNodeData.getData(el,"obj_carousel");

                  if (obj)
                  {

                    obj.list = dataCarousel.items
                    obj.num = dataCarousel.items.length;
                  }
                  else
                  {
                  	  obj = blueimp.Gallery(
                      dataCarousel.items,
                      {
                          container: '#'+id_carousel,
                          carousel: true,
                          titleElement: '.title',
                          stretchImages: dataCarousel.stretchImages,
                          startSlideshow: dataCarousel.startSlideshow,
                          slideshowInterval: dataCarousel.slideshowInterval,
                      }
                  );
                  }




                  WaFxNodeData.setData(el,"obj_carousel",obj);
                  let g_template_settings  =dataCarousel.template_settings;

                  
                  obj.setTitle = function (index) {

                        if ((this.list==undefined)||(index>=this.list.length))
                        {
                          return;
                        }
                        let KEY_TITLE = '{{title}}';
                        let KEY_DESC = '{{desc}}';

                        let obj = this.list[index];
                        let titleElement = this.titleElement
                        let customHTML = obj.custom_html;
                        let contentHtml = '';
                        if (customHTML.length>0)
                        {
                            contentHtml = customHTML;
                        }
                        else
                        {
                            contentHtml = g_template_settings.html;
                        }
                        let b_is_empty = contentHtml.length==0;

                        if (contentHtml.includes(KEY_TITLE) || contentHtml.includes(KEY_TITLE))
                        {
                            if ((obj.title.length==0)&&(obj.description.length==0))
                            {
                              b_is_empty = true;
                            }
                        }



                        contentHtml = contentHtml.replace('{{title}}', obj.title);
                        contentHtml = contentHtml.replace('{{desc}}', obj.description);
                        contentHtml = contentHtml.replace('{{col_text}}', g_template_settings.col_text);
                        contentHtml = contentHtml.replace('{{col_bg}}', g_template_settings.col_bg);


                        let link_url  =obj.link;
                        if (link_url.length==0)link_url="javascript:void(0)"

                        contentHtml = contentHtml.replace('{{lnk}}', link_url);
                        contentHtml = contentHtml.replace('{{lnk_target}}', obj.target_link);

                        titleElement.empty();

                        titleElement[0].style.top=(g_template_settings.position==2)?"auto":"0px";
           

                        WaFxNodeGeometry.setVisible(titleElement[0],b_is_empty==false);

                          if (contentHtml.length>0) 
                          {
                            titleElement[0].innerHTML = contentHtml;
      
                          }
                      }

                    obj.setTitle(0);
                    

                  
                  
          }


      });
    }

    static init()
    {
      document.addEventListener("DOMContentLoaded", function() 
      {
        //  WafxBlueImpCarousel.reload()
      });
    }
}