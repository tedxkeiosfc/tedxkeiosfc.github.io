jQuery(function(e){var t=e("html, body");t.scrollTo=function(t,n,r){var i=this;e.easing.easeOutQuint=function(e,t,n,r,i){return r*((t=t/i-1)*t*t*t*t+1)+n};return i.animate({scrollTop:t},{duration:n=n||1e3,easing:r||"easeOutQuint"}).on("scroll mousedown DOMMouseScroll mousewheel keyup",function(e){(e.which>0||e.type==="mousedown"||e.type==="mousewheel")&&i.stop().off("scroll mousedown DOMMouseScroll mousewheel keyup")}).promise()};e(document).on("click",".more",function(n,r){n.preventDefault();var i=r?e(".more",r):e(this),s=i.find("a"),o=i.next(),u=i.next().next(),a=i.closest(".speaker").attr("id"),f=e("<iframe />").attr({"class":"youtube get",src:"http://www.youtube.com/embed/"+spk[a]+"?autoplay=1&start=15"}),l=function(){s.addClass("active");o.addClass("show");o.append(f)},c=function(){s.removeClass("active");o.removeClass("show");o.find("iframe").remove()};o.hasClass("show")?c():l();e("a[href=#top]").on("click.back",function(n){n.preventDefault();e(this).off("click.back");t.scrollTo(0).then(function(){c()})})}).on("click","#speaker-list a[href^=#]",function(n){n.preventDefault();var r=e(e(this).attr("href")).offset().top;t.scrollTo(r-110);location.hash=e(this).attr("href")}).on("click","a[href=#top]",function(e){e.preventDefault();t.scrollTo(0)}).pjax("#navigator-menu a","#content").on("pjax:send",function(){e("#header-inner").addClass("loading");e("#content-wrapper").addClass("loading")}).on("pjax:complete",function(){e("#header-inner").removeClass("loading");e("#content-wrapper").removeClass("loading")}).on("click","#navigator-menu a",function(t){e("li","#navigator-menu").removeClass("active");e(t.target).parent().addClass("active")});var n=e("#header"),r=n.css("padding-top").replace("px","")-0,i=n.css("padding-bottom").replace("px","")-0;e(window).on("scroll",function(){var t=(r+i-e(window).scrollTop())/2;e(window).scrollTop()>0?n.css({paddingTop:t,paddingBottom:t}):n.removeAttr("style");e(window).scrollTop()>100&&n.css({paddingTop:0,paddingBottom:0})})});