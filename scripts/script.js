$(document).ready(function() {
  $(".nav-right").css({opacity: 1});
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

  stickyNav();
  setActive();
});

function stickyNav() {
    var topHead = $("#landing-name").offset().top;
    var height = $("#landing-name").outerHeight(); //height of the element relative to the window
    var abHead = $("#aboutT").offset().top; //Y coordinate of the element relative to the window
    $(window).scroll(function() {
    if($(window).scrollTop() < (topHead + height)) {
      $(".left-nav").css("visibility", "hidden");
      $(".left-nav").css({opacity: 0});
    }else if($(window).scrollTop() > (topHead + height)) {
      $(".left-nav").css("visibility", "visible");
      $(".left-nav").css({opacity: 1});
      $(".nav-left").css("background-color", "#2795D3");
      $(".nav-left").css("color", "#151515");
      $(".nav-right").css("color", "#2795D3");
      if($(window).scrollTop() > (abHead)) {
        $(".nav-left").css("background-color", "#151515");
        $(".nav-left").css("color", "#2795D3");
        $(".nav-right").css("color", "#151515");
        }
      if ($(window).scrollTop() >= $("#projects").offset().top) {
        $(".nav-left").css("background-color", "#2795D3");
        $(".nav-left").css("color", "#151515");
        $(".nav-right").css("color", "#2795D3");
        }
      }
    });
} //sticky nav visibility

function setActive() {
  $(window).scroll(function() {
    if($(window).scrollTop() < $(".land-nav-proj").offset().top) {
      $(".nav-left").removeClass("sticky-nav-active");
      $(".nav-du").addClass("sticky-nav-active");
    }else if($(window).scrollTop() >= $("#sec-filler1").offset().top && $(window).scrollTop() < $("#projects").offset().top) {
      $(".nav-left").removeClass("sticky-nav-active");
      $(".entypo-user").addClass("sticky-nav-active");
    }else if($(window).scrollTop() >= $("#projects").offset().top) {
      $(".nav-left").removeClass("sticky-nav-active");
      $(".entypo-layout").addClass("sticky-nav-active");
    }
  });
} // Give nav icon active class
