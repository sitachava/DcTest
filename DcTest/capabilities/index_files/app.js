$(function(){

    // scroll variables
    var $win = $(window);
    var $animatables = $('.section *');
    var $outros = $('.outro *');
    var $car_intros = $('.careers *');
    var $blur = $('.blur');

    // desktop variables
    var $header = $('header');
    var $arrow = $('.arrow');
    var $period = $('div.period');
    
    // mobile nav variables
    var $brgr_menu = $('#brgr-menu');
    var $brgr_brdr = $('#brgr-brdr');
    var $nav = $('#nav');

    // mobile nav interactions
    $brgr_menu.on('click',function(){
      var $this = $(this);
      if($this.hasClass('open')){
        $this.removeClass('open');
        $nav.removeClass('open');
        $brgr_brdr.removeClass('open');
      }else{
        $this.addClass('open');
        $nav.addClass('open');
        $brgr_brdr.addClass('open');
      }
    });

    // careers variables
    var $ind_jobs = $('.ind-jobs').find('a');
    var $job_ind_container = $('.job-ind').find('div');
    var $cls = $('#cls');

    // about page variables
    var $about_endgame_links = $('.block').find('a');
    var $about_endgame_links_wrapper = $('#light-wrap');
    var $about_endgame_links_wrap = $('#lightbox');
    var $about_endgame_links_container = $('#light-content');

    // locations map variables
    var $locations = $('#locations').find('li');
    var $locations_map = $('#locations-map');
    var $locations_map_a = $locations_map.find('a');
    var $locations_map_div = $locations_map.find('#map');
    var $locations_map_h4 = $locations_map.find('h4');
    var $locations_map_icon = $locations_map.find('span');

    // sub nav pos matches header pos
    var $sub_nav = $('#sub-nav');
    if($sub_nav.length){
        //alert('yep');
        var $header_height = $header.height();
        var $sub_nav_wrap = $('#sub-nav-wrap');
        var $sub_nav_height = ($sub_nav.offset().top) - $header_height;
      }

      var $sub_nav_links = $('#sub-nav a');
      $sub_nav_links.on('click',function(){
        $sub_nav_links.removeClass('active');
        $(this).addClass('active');
      });

    // scroll to variable
    var $topppp = $('#topppp');

    // animate arrow and remove class, then re-animate it & keep going
    setInterval(function(){
      $arrow.addClass('bounce');
      setTimeout(function(){
        $arrow.removeClass('bounce');
      }, 1000);
    }, 3000);

    // logo after scrolling becomes this
    $period.on('click',function(){
      var $this = $(this);
      var $this_url = $this.data('url');
      var $cur_url = location.pathname;
      $this.addClass('clicked');
      if($cur_url=='/endgame/' || $cur_url=='/' || $cur_url=='' || $cur_url=='/index.html'){
        setTimeout(function(){
          $('html,body').animate({scrollTop: 0});
          $this.removeClass('clicked');
        }, 500);
      }else{
        setTimeout(function(){
          location.href = $this_url; 
        }, 500);
      }
      return false;
    });

    // scroll stuff across the site
    $win.scroll(function(event){

        // once header scrolled from top add class


        // scroll functions -- if element not visible
        $animatables.each(function(i, el){
          var el = $(el);
          if (el.visible(true)) {
            el.addClass('come-in');
          }
        });
        $outros.each(function(i, el){
          var el = $(el);
          if (el.visible(true)) {
            el.addClass('come-in');
          }
        });

        // blur the intro images while scrolling
        if ($blur) {

            //calculate the opacity
            var distance = 200;
            var opacity = (distance - $header.offset().top) / distance;
            if (opacity < 0) {
              opacity = 0;
            }
            opacity = 5 * Math.round((opacity * 100) / 5); // round to the nearest 5
            opacity = (100 - opacity) / 100; //invert it and make it 0-1

            //update the opacity
            $blur.css('-webkit-opacity', opacity).css('-moz-opacity', opacity).css('opacity', opacity);
          }

        });

    // careers page modal window
    $ind_jobs.on('click',function(){

      var $this = $(this);
      var $this_content = $this.data('content');
      if($this.hasClass('open')){
        return false;
      }else{
        $this.addClass('open')
        $job_ind_container.parent().addClass('open');
        $job_ind_container.html($this_content);
        $('html, body').animate({
          scrollTop: $cls.offset().top - 150
        }, 500);
      }
      return false;
    });

    // close careers
    $cls.on('click',function(){
      $job_ind_container.parent().removeClass('open');
      $job_ind_container.html('');
      $ind_jobs.removeClass('open');
    });

    // locations map stuff
    $locations.on('click',function(){
      var $this = $(this);
      var $this_img = $this.data('img');
      var $this_details = $this.data('details');
      var $this_gmap_url = $this.data('gmap-url');
      var $this_lat = $this.data('lat');
      var $this_long = $this.data('long');
      $('html, body').animate({
       scrollTop: $locations_map.offset().top - 250
     }, 500);
      if($this.hasClass('active')){
        return;
      }else{
        $locations.removeClass('active');
        $this.addClass('active');
        $locations_map_a.attr('href',$this_gmap_url);
        $locations_map_div.css('background-image','url(' + $this_img + ')');
        $locations_map_h4.html($this_details);
      }
    });


    //show the lightbox for about links
    $about_endgame_links.on('click',function(){
      var $this = $(this).parent();
      var $this_content = $this.data('content');
      $about_endgame_links_wrapper.addClass('open');
      $about_endgame_links_wrap.addClass('open');
      $about_endgame_links_container.html($this_content);
      return false;
    });

    //close the lightbox
    var closeLightbox = function () {
      $about_endgame_links_wrapper.removeClass('open');
      $about_endgame_links_wrap.removeClass('open');
      $about_endgame_links_container.html('');
    }

    //click can close the lightbox
    $about_endgame_links_wrapper.on('click',function(){
      closeLightbox();
    });

    //esc key can close the lightbox
    $(document).keydown(function(e) {
      if (e.keyCode == 27) { 
        closeLightbox();
      }
    });

    //automatically highlight the subnav once the user scrolls to that section
    //get all of the sub-nav anchors
    //when the waypoint is hit, remove the active class from all anchors
    //find the anchor corresponding to the current section and add the active class
    var $subNavItems = $sub_nav.find('a');
    $('.waypoint').waypoint(function(direction) {
      var itemID = $(this).attr('id');
      $subNavItems.removeClass('active');
      $subNavItems.each(function( index ) {
        var $this = $(this);
        if ($this.attr('href').indexOf(itemID) >= 0) {
          $this.addClass('active');
        }
      });
    }, {offset:'100px'});

    //smooth scroll internal anchors
    $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();
      var target = this.hash;
      $('html, body').stop().animate({
        'scrollTop': $(target).offset().top -120
      }, 750, 'swing', function() {
        window.location.hash = target;
        $subNavItems.removeClass('active');
        $('[href*="'+target+'"]').addClass('active');
      });
    });

    //hide team pagination controls when there is only a single page
    var $teamULs = $('.cycle-slideshow ul');
    if ($teamULs.length < 2) {
      $('#team-pagination').hide();
    }
  });

// homepage flipping cards
$('.box').on('click mouseenter mouseleave', function(event){
  if($(this).hasClass('active')){
    $(this).removeClass('active');
  } else {
    $('.box.active').removeClass('active');
    $(this).toggleClass('active');
  }
});  


// homepage anchor nav
$('.js-anchor-nav li').on('click', function(){
  indexAnchors();
  var id = $(this).find('a').attr('href');
  $('html, body').animate({
    scrollTop: $(id).offset().top
  }, 1000);
}); 

function indexAnchors(){
  var index = $('.js-anchor-nav li.active').index();
  $('.js-anchor-nav li').each(function(){
   var thisIndex = Math.abs(parseInt($(this).index() - index));
   $(this).attr({'data-index': thisIndex}); 
 }); 
}

indexAnchors();
$('section').waypoint(function(direction){
  $('.js-anchor-nav .active').removeClass('active');
  var id = $(this).attr('id');
  var el = $('[href*="'+id+'"]').parent();
  if(direction=='down'){
    el.addClass('active');
  } else{
    el.prev().addClass('active');
  }
  indexAnchors();
}, {offset:'80%'});


/*
  * Normalized hide address bar for iOS & Android
  * (c) Scott Jehl, scottjehl.com
  * MIT License
  */
  (function( win ){
    var doc = win.document;
    
    // If there's a hash, or addEventListener is undefined, stop here
    if( !location.hash && win.addEventListener ){

        //scroll to 1
        window.scrollTo( 0, 1 );
        var scrollTop = 1,
        getScrollTop = function(){
          return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
        },
        
            //reset to 0 on bodyready, if needed
            bodycheck = setInterval(function(){
              if( doc.body ){
                clearInterval( bodycheck );
                scrollTop = getScrollTop();
                win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
              }   
            }, 15 );

            win.addEventListener( "load", function(){
              setTimeout(function(){
	    //at load, if user hasn't scrolled more than 20 or so...
      if( getScrollTop() < 20 ){
                    //reset to hide addr bar at onload
                    win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                  }
                }, 0);
            } );
          }
        })( this );

        $('.tab__content').hide();
        $('.tab__content').hide();
        $('.tab').on('click', function(){
          var tab = $(this);
          var tabContent = $(this).children('.tab__content');
          tab.toggleClass('active');
          tabContent.slideToggle(499);
        }); 



        var subnavprev = $('#sub-nav-wrap').prev();
        var subnavheight = $('#sub-nav-wrap').height();
        $(subnavprev).waypoint(function(){
          $('#sub-nav-wrap').toggleClass('sticky');
          $('.js-top').toggleClass('is-visible')
        }, {
          offset: function() {
            return -$(this).height() + subnavheight;
          }
        });

        /* fixed computer screens on homepage */
        function sizePanels(){
          var origHeight = $('.fixed-wrapper section').css('height');
          $('.fixed-wrapper section').css({'height':origHeight});
        }
        $(document).ready(sizePanels);
        $(window).on('resize', sizePanels);
        $('.fixed-wrapper').waypoint(function(){
          $(this).toggleClass('fixed');
        });
        $('.act').waypoint(function(){
          $('.fixed-wrapper').toggleClass('fixed');
        },{'offset':0});

        var imgHeight = 350;
        var picOffset = 155;
        var picBottom = picOffset + imgHeight; 
        var $header = $('header');

        $(window).on('scroll', function(){ 
          var $this = $(this);
          if($this.scrollTop() > 1){
            $header.addClass('shrt');
          }else{
            $header.removeClass('shrt');
          }
          if (window.location.pathname == '/Users/fkhalid/websites/dataConcept/www.endgame.com/index.html'){
            var windowScrollTop = $(this).scrollTop(); 
            $('.fixed-wrapper section').each(function(){
              var thisTop = $(this).offset().top;
              var thisBottom = thisTop + $(this).height();
              if(windowScrollTop > thisTop && windowScrollTop < thisBottom){ 

               $(this).addClass('active').siblings().removeClass('active'); 
               console.log($(this));
             }
           });
            var pActive = $('.fixed-wrapper section.active'); 
            if( pActive.length ){
              console.log('pActive');
              var pTop = pActive.length ? pActive.offset().top : undefined;
              var pNextTop = pActive.next().offset().top;

              var prev = pActive.prev();   

              if(windowScrollTop + picBottom > pNextTop){  
               var diff = imgHeight - (windowScrollTop - pNextTop + picBottom); 
               console.log(diff);  
               pActive.find('.hide-reveal').css({'height':Math.abs(diff)+'px'});
             } 
             if(windowScrollTop + picBottom < pNextTop){ 
              console.log('2');  
              pActive.find('.hide-reveal').css({'height':imgHeight});
            }   
            if(windowScrollTop + picOffset > pNextTop){  
              console.log('3');
              pActive.find('.hide-reveal').css({'height':'0'});   
            }  
          }
        }
      });

/* dom-specific animations on scroll */
// capabilities#data-science
// $('#data-science').waypoint(function(){
//   $('#data-science img').addClass('spin-in');
// },{offset:'50%'});
$('#application-testing').waypoint(function(){
  $('#application-testing img').addClass('spin-in');
},{offset:'50%'});

// capabilities#security-visibility
$('#security-visibility').waypoint(function(){
  $('#security-visibility img').addClass('raise-in');
},{offset:'50%'});
$('#endpoint-command').waypoint(function(){
  $('#endpoint-command img').addClass('raise-in');
},{offset:'50%'});


// jobvite iframe

$(document).on('click', '.js-job-iframe',function( event ){
  event.preventDefault();
  var url = $(this).attr('href');
  var $iframe = $('<iframe />');
  $iframe.attr('src', url);
  $(this).after($iframe);
  $(this).remove();
  return false;
});

// jobvite categories
var jobCategories = [];
Array.prototype.pushUnique = function (item){
  if(this.indexOf(item) == -1) {
    //if(jQuery.inArray(item, this) == -1) {
      this.push(item);
      return true;
    }
    return false;
  }

  $('[data-category]').each(function( i ){
    var cat = $(this).attr('data-category');
    jobCategories.pushUnique( cat );
  });

  for ( var i = 0, len = jobCategories.length; i < len; i++ ){
    var c = jobCategories[i];
    var header = $('<h2 class="job__category">'+ c +'</h2>');
    var list = $('<ul class="cf ind-jobs"></ul>');
  //get all items of this data-category
  $('[data-category="'+c+'"]').appendTo(list);
  $('.jobs').append(header); 
  header.after(list);
};

// contact form
$cf = $('.js-contact-form');
$cf.show().css({
  position: 'fixed',
  visibility: 'hidden',
  display:'block',
  height: 'auto'
});

var cfh = $cf.height();

function openContactForm( event ){
  event.preventDefault();
  $cf.addClass('is-visible');
  $cf.css({
    visibility: 'visible',
    height: cfh + 'px',
    'margin-bottom': '-'+ cfh + 'px'
  })
  $('header').css({
    top: cfh + 'px'
  })
}

$('.js-open-contact-form').on('click', openContactForm);
$(window).on('load', function( event ){
  if ( window.location.hash == '#contact-us'){
   openContactForm( event ); 
 }
 if ( window.location.hash == '#sign-up'){
   openContactForm( event ); 
 }
})

function closeContactForm(){
  $cf.removeClass('is-visible');
  $cf.css({
    visibility: 'hidden',
    height: 0,
    'margin-bottom': '0px'
  })
  $('header').css({
    top: 0 + 'px'
  })
}

$(window).on('scroll', closeContactForm );
$('.brgr-menu').on('click', closeContactForm);



$('#stratServ').on('click mouseenter',function(){
  $(this).css({
    background: '#000'
  });
  $('#stratApp').css({
    background: '#c02'
  });
  $('#stratServData').show();
  $('#stratAppData').hide();
});

$('#stratApp').on('click mouseenter',function(){
  $(this).css({
    background: '#000'
  });
  $('#stratServ').css({
    background: '#c02'
  });
  $('#stratServData').hide();
  $('#stratAppData').show();
});

$('#legBen').on('click mouseenter',function(){
  $(this).css({
    background: '#000'
  });
  $('#legAdv').css({
    background: '#c02'
  });
  $('#legBenData').show();
  $('#legAdvData').hide();
});

$('#legAdv').on('click mouseenter',function(){
  $(this).css({
    background: '#000'
  });
  $('#legBen').css({
    background: '#c02'
  });
  $('#legBenData').hide();
  $('#legAdvData').show();
});

$('#objC').on('click mouseenter',function(){
  $(this).css({
    background: '#C02'
  });
  $('#java').css({
    background: 'none'
  });
  $('#net').css({
    background: 'none'
  });
  $('#javaData').hide();
  $('#netData').hide();
  $('#objCData').show();
});

$('#java').on('click mouseenter',function(){
  $(this).css({
    background: '#C02'
  });
  $('#objC').css({
    background: 'none'
  });
  $('#net').css({
    background: 'none'
  });
  $('#javaData').show();
  $('#netData').hide();
  $('#objCData').hide();
});

$('#net').on('click mouseenter',function(){
  $(this).css({
    background: '#C02'
  });
  $('#java').css({
    background: 'none'
  });
  $('#objC').css({
    background: 'none'
  });
  $('#javaData').hide();
  $('#netData').show();
  $('#objCData').hide();
});

$('#automated').on('click mouseenter',function(){
  $(this).css({
    background: '#000'
  });
  $('#perf').css({
    background: '#c02'
  });
  $('#tabPerf').hide();
  $('#tabAuto').show();
});
$('#perf').on('click mouseenter',function(){
  $(this).css({
    background: '#000'
  });
  $('#automated').css({
    background: '#c02'
  });
  $('#tabPerf').show();
  $('#tabAuto').hide();
});

$('#waterfall').on('click mouseenter',function(){
  $(this).css({
    background: '#C02',
    color:'#fff'
  });
  $('#v-model').css({
    background: 'none',
    color: '#c02'
  });
  $('#agile').css({
    background: 'none',
    color: '#c02'
  });
  $('#v-modelData').hide();
  $('#waterfallData').show();
  $('#agileData').hide();
});

$('#v-model').on('click mouseenter',function(){
  $(this).css({
    background: '#C02',
    color:'#fff'
  });
  $('#waterfall').css({
    background: 'none',
    color: '#c02'
  });
  $('#agile').css({
    background: 'none',
    color: '#c02'
  });
  $('#v-modelData').show();
  $('#waterfallData').hide();
  $('#agileData').hide();
});

$('#agile').on('click mouseenter',function(){
  $(this).css({
    background: '#C02',
    color:'#fff'
  });
  $('#v-model').css({
    background: 'none',
    color: '#c02'
  });
  $('#waterfall').css({
    background: 'none',
    color: '#c02'
  });
  $('#v-modelData').hide();
  $('#waterfallData').hide();
  $('#agileData').show();
});
