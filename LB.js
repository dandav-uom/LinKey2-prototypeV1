var $themeGlobal=$("body").attr("data-theme"),$cust_themeGlobal=$("body").attr("data-custom-theme"),$cust_theme_closeGlobal=$("body").attr("data-custom-theme-close");$(".lb-js").each(function(){var t=$(".lb-js-modal").clone();$(".lb-js-modal").children().hide();var o=$(this).attr("data-theme"),i=$(this).attr("data-custom-theme"),s=$(this).attr("data-custom-theme-close"),e=$(this).attr("data-type"),a=$(this).attr("data-host"),n=$(this).attr("data-path");$(this).on("click",function(){if(event.preventDefault(),$("body").append('<div class="js-lightbox-wrapper"><div class="js-lightbox-close"><div class="js-lightbox-close-wrapper"><div class="js-lightbox-close-left-diagonal"></div><div class="js-lightbox-close-right-diagonal"></div></div></div><div class="js-lightbox-content-container"></div></div>'),$(".js-lightbox-wrapper").css({position:"fixed",top:"0",right:"0",bottom:"0",left:"0","z-index":"1000",display:"flex","flex-direction":"column","align-items":"center","justify-content":"center"}).hide(0).delay(100).fadeIn(100),$(".js-lightbox-content-container").css({"z-index":"1005"}).hide(0).delay(100).fadeIn(100),$(".js-lightbox-close").css({position:"absolute",top:"20px",right:"20px","z-index":"1010",height:"16px",width:"16px",cursor:"pointer"}),$(".js-lightbox-close-wrapper").css({transform:"translateY(6px) translateX(-1px)"}),$(".js-lightbox-close-left-diagonal").css({content:'""',display:"block",height:"2px",width:"16px",position:"relative","transform-origin":"center",transform:"rotate(-45deg) translateY(1.35px)"}),$(".js-lightbox-close-right-diagonal").css({content:'""',display:"block",height:"2px",width:"16px",position:"relative","transform-origin":"center",transform:"rotate(45deg) translateY(-1.35px)"}),this.hasAttribute("data-theme")?"light"===o?($(".js-lightbox-wrapper").css({background:"#FFFFFF"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:"#000000"})):"trans"===o?($(".js-lightbox-wrapper").css({background:"rgba(10,10,10,0.8)"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:"#FFFFFF"})):"cool"===o?($(".js-lightbox-wrapper").css({background:"#000014"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:"#FFFFFF"})):"warm"===o?($(".js-lightbox-wrapper").css({background:"#140A00"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:"#FFFFFF"})):"custom"===o?($(".js-lightbox-wrapper").css({background:" "+i+" ","background-size":"cover","background-position":"center center"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:" "+s+" "})):($(".js-lightbox-wrapper").css({background:"#111111"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:"#FFFFFF"})):"light"===$themeGlobal?($(".js-lightbox-wrapper").css({background:"#FFFFFF"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:"#000000"})):"trans"===$themeGlobal?($(".js-lightbox-wrapper").css({background:"rgba(10,10,10,0.8)"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:"#FFFFFF"})):"cool"===$themeGlobal?($(".js-lightbox-wrapper").css({background:"#000014"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:"#FFFFFF"})):"warm"===$themeGlobal?($(".js-lightbox-wrapper").css({background:"#140A00"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:"#FFFFFF"})):"custom"===$themeGlobal?($(".js-lightbox-wrapper").css({background:" "+$cust_themeGlobal+" ","background-size":"cover","background-position":"center center"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:" "+$cust_theme_closeGlobal+" "})):($(".js-lightbox-wrapper").css({background:"#111111"}),$(".js-lightbox-close-left-diagonal, .js-lightbox-close-right-diagonal").css({background:"#FFFFFF"})),"embed"===e&&"youtube"===a&&($(".js-lightbox-content-container").append('<div class="js-lightbox-iframe-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" src="'+n+'?autoplay=1"></iframe></div>'),$(window).width()<820?$(".js-lightbox-content-container").css({width:"95%"}):$(window).width()>1280?$(".js-lightbox-content-container").css({width:"62.5%"}):$(".js-lightbox-content-container").css({width:"95%","max-width":"800px"})),"embed"===e&&"vimeo"===a&&($(".js-lightbox-content-container").append('<div class="js-lightbox-iframe-wrapper" style="position:relative;padding-bottom:56.25%;padding-top:25px;height:0;" ><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" src="'+n+'autoplay=1"></iframe></div>'),$(window).width()<820?$(".js-lightbox-content-container").css({width:"95%"}):$(window).width()>1280?$(".js-lightbox-content-container").css({width:"62.5%"}):$(".js-lightbox-content-container").css({width:"95%","max-width":"800px"})),"image"===e&&($(".js-lightbox-content-container").append('<img style="max-height:80vh;max-width:95vw;object-fit:contain;" src="'+n+'">'),$(window).width()<820?$(".js-lightbox-content-container").css({}):$(window).width()>1280?$(".js-lightbox-content-container").css({}):$(".js-lightbox-content-container").css({})),"auto"===n)if(this.hasAttribute("src")){var c=$(this).attr("src");$(".js-lightbox-content-container").append('<img style="max-height:80vh;max-width:95vw;object-fit:contain;" src="'+c+'">'),$(window).width()<820?$(".js-lightbox-content-container").css({}):$(window).width()>1280?$(".js-lightbox-content-container").css({}):$(".js-lightbox-content-container").css({})}else{var l=$(this).css("background-image").replace(/^.*\/\/[^\/]+/,"").replace('"',"").replace(")","");$(".js-lightbox-content-container").append('<img style="max-height:80vh;max-width:95vw;object-fit:contain;" src="'+l+'">'),$(window).width()<820?$(".js-lightbox-content-container").css({}):$(window).width()>1280?$(".js-lightbox-content-container").css({}):$(".js-lightbox-content-container").css({})}"video"===e&&($(".js-lightbox-content-container").append('<video style="width:100%;height:auto;" controls autoplay><source src="'+n+'" type="video/mp4"> </video>'),$(window).width()<820?$(".js-lightbox-content-container").css({width:"95%"}):$(window).width()>1280?$(".js-lightbox-content-container").css({width:"62.5%"}):$(".js-lightbox-content-container").css({width:"95%","max-width":"800px"})),"modal"===e&&($(t).appendTo(".js-lightbox-content-container"),$(".lb-js-modal").children().show(),$(window).width()<820?$(".js-lightbox-content-container").css({width:"95%"}):$(window).width()>1280?$(".js-lightbox-content-container").css({width:"62.5%"}):$(".js-lightbox-content-container").css({width:"95%","max-width":"800px"})),$(".js-lightbox-close, .js-lightbox-wrapper").on("click",function(){$(".js-lightbox-wrapper").fadeOut(100),setTimeout(function(){$(".js-lightbox-wrapper").remove()},100)}),$(".js-lightbox-content-container").children().click(function(t){t.stopPropagation()})})});