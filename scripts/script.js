$(document).ready(function() {
  $('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	}); //Smooth Scroll

  var topHead = $("#landing-name").offset().top; //offset of name on lnading page
  var height = $("#landing-name").outerHeight(); //height of name on landing page

  $(window).scroll(function() {
    if($(window).scrollTop() > (topHead + height)) {
      $(".go-home-li").css({opacity: 1});
    } else {
      $(".go-home-li").css({opacity: 0});
    }
  }); //Home button opacity

});
