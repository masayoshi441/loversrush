// JavaScript Document
// ********************************

// menu ********************************
// $(function () {
//   $("#toggle").click(function () {
//     $("#gNaviSp").slideToggle();
//     return false;
//   });
//   $(window).resize(function () {
//     var win = $(document).width();
//     var p = 769;
//     if (win > p) {
//       $("#gNaviSp").show();
//     } else {
//       $("#gNaviSp").hide();
//     }
//   });
// });

// page top ********************************
$(document).ready(function () {
  var pagetop = $(".pagetop");
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $("body, html").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

// page top ********************************
$(document).ready(function () {
  var fixbtn = $(".fixBtn");
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      fixbtn.fadeIn();
    } else {
      fixbtn.fadeOut();
    }
  });
  fixbtn.click(function () {
    $("body, html").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

// target_blank PDF ********************************
jQuery(document).ready(function ($) {
  $("a[href*='.pdf']").attr("target", "_blank");
});

// ----------ヘッダー固定----------
// jQuery(function($) {

// var nav    = $('#fixedBox'),
//     offset = nav.offset();

// $(window).scroll(function () {
//   if($(window).scrollTop() > offset.top) {
//     nav.addClass('fixed');
//   } else {
//     nav.removeClass('fixed');
//   }
// });

// });

// ---------- HMメニュー --
$(function () {
  $('a[href="#"]').click(function () {
    // 処理
    return false;
  });
  $(".nav-button").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(".nav-wrap").addClass("close").removeClass("open");
      $("#contactBtn").removeClass("close");
    } else {
      $(this).addClass("active");
      $(".nav-wrap").addClass("open").removeClass("close");
      $("#contactBtn").addClass("close");
    }
  });
  $("nav a").on("click", function () {
    $(".nav-wrap").addClass("close").removeClass("open");
    $(".nav-button").removeClass("active");
  });
});
