(function ($) {

  "use strict";

  // Document ready functions
  $(document).ready(function () {

    // Menu Dropdown Toggle
    if ($('.menu-trigger').length) {
      $(".menu-trigger").on('click', function () {
        $(this).toggleClass('active');
        $('.header-area .nav').slideToggle(200);
      });
    }

    // Add to Cart event delegation
    // This will work even after Isotope filters the items.
    $(document).on('click', '.add-to-cart-btn', function (e) {
      e.preventDefault();
      var $btn = $(this);
      var item = {
        id: $btn.data('id'),
        name: $btn.data('name'),
        price: parseFloat($btn.data('price'))
      };
      // Assuming addToCart function is globally available from cart.js
      if (typeof addToCart === 'function') {
        addToCart(item);
      }
    });

    // Menu elevator animation
    $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          var width = $(window).width();
          if (width < 991) {
            $('.menu-trigger').removeClass('active');
            $('.header-area .nav').slideUp(200);
          }
          $('html,body').animate({
            scrollTop: (target.offset().top) - 80
          }, 700);
          return false;
        }
      }
    });

    // Initial Cart Count Update
    if (typeof updateCartCount === 'function') {
      updateCartCount();
    }
  });

  // Window load functions
  $(window).on('load', function () {
    // Preloader
    $('#js-preloader').addClass('loaded');

    // Isotope Filtering
    if ($('.trending-box').length) {
      var $grid = $('.trending-box').isotope({
        itemSelector: '.trending-items',
        layoutMode: 'fitRows'
      });

      // Filter items on button click
      $('.trending-filter').on('click', 'a', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });

      // Change is-active class on buttons
      $('.trending-filter').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'a', function () {
          $buttonGroup.find('.is_active').removeClass('is_active');
          $(this).addClass('is_active');
        });
      });
    }
  });

  // Header Style on Scroll
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });
    
})(window.jQuery);