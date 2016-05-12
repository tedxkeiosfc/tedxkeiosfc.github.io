jQuery(function ($) {

var $viewport = $('html, body');
$viewport.scrollTo = function (pos_y, duration, ease) {
  var self = this;
  $.easing.easeOutQuint = function(e, f, a, h, g) { return h * ((f = f / g - 1) * f * f * f * f + 1) + a; };
  return self.animate({
    scrollTop: pos_y
  }, {
    duration: duration = duration || 1000,
    easing: ease || 'easeOutQuint'
  }).on('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
    if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
      self.stop().off('scroll mousedown DOMMouseScroll mousewheel keyup');
    }
  }).promise();
};

$(document)
  // speaker more
  .on('click', '.more', function (e, s) {
    e.preventDefault();
    var $this = (s) ? $('.more', s) : $(this);

    var $m = $this.find('a');
    var $n = $this.next();  // iframe wrapper (div)
    var $t = $this.next().next();  // to top

    var id = $this.closest('.speaker').attr('id');

    var $y = $('<iframe />').attr({
      'class': 'youtube get',
      'src': 'http://www.youtube.com/embed/' + spk[id] + '?autoplay=1&start=15'
    });

    var show = function () {
      $m.addClass('active');
      $n.addClass('show');

      $n.append($y);
    };
    var hide = function () {
      $m.removeClass('active');
      $n.removeClass('show');

      $n.find('iframe').remove();
    };
    if (!$n.hasClass('show')) {
      show();
    } else {
      hide();
    }
    $('a[href=#top]').on('click.back', function(e) {
      e.preventDefault();
      $(this).off('click.back');
      $viewport.scrollTo(0).then(function() {
          hide();
      });
    });
  })

  // Speaker list
  .on('click', '#speaker-list a[href^=#]', function (e) {
    e.preventDefault();
    var p = $($(this).attr('href')).offset().top;
    $viewport.scrollTo(p - 110);
    location.hash = $(this).attr('href');
  })
  // to top
  .on('click', 'a[href=#top]', function (e) {
    e.preventDefault();
    $viewport.scrollTo(0);
  })

  // PJAX
  .pjax('#navigator-menu a', '#content')
  .on('pjax:send', function () {
    // console.log("pjax send!");
    $('#header-inner').addClass('loading');
    $('#content-wrapper').addClass('loading');

  })
  .on('pjax:complete', function () {
    // console.log("pjax completed!");
    $('#header-inner').removeClass('loading');
    $('#content-wrapper').removeClass('loading');
  })

  // ナビゲーション
  .on('click', '#navigator-menu a', function (e) {
    $('li', '#navigator-menu').removeClass("active");
    $(e.target).parent().addClass('active');
  });

var $header = $("#header");
var pt = $header.css("padding-top").replace("px", "") - 0;
var pb = $header.css("padding-bottom").replace("px", "") - 0;

if ($(window).width() > 1020) {
  $(window).on('scroll', function () {
    var paddingTopBottom = (pt + pb - $(window).scrollTop()) / 2;
    if ($(window).scrollTop() > 0) {
      $header.css({
        paddingTop: paddingTopBottom,
        paddingBottom: paddingTopBottom
      });
    } else {
      $header.removeAttr('style');
    }

    if ($(window).scrollTop() > 100) {
      $header.css({
        paddingTop: 0,
        paddingBottom: 0
      });
    }
  });
}



});
