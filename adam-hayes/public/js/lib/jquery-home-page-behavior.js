

    window.globalTransit = false;

    function getPosition(el) {

      var x = 0,
          y = 0;

      while (el != null && (el.tagName || '').toLowerCase() != 'html') {
          x += el.offsetLeft || 0; 
          y += el.offsetTop || 0;
          el = el.parentNode;
      }

      return { x: parseInt(x, 10), y: parseInt(y, 10) };
    }


var freezeVp = function(e) {
    e.preventDefault();
};


function stopBodyScrolling (bool) {
    if (bool === true) {
        document.body.addEventListener("touchmove", freezeVp, false);
    } else {
        document.body.removeEventListener("touchmove", freezeVp, false);
    }
}


  //https://www.w3schools.com/jsref/prop_win_pagexoffset.asp
  //cross-browser get page x/y offset.
  // All browsers, except IE9 and earlier
  if (window.pageXOffset !== undefined) { 

    var getPageOffset = function() {
    return  {x:window.pageXOffset, y:window.pageYOffset};
    }
    var getPageOffsetX = function() {
    return  window.pageXOffset;
    }
    var getPageOffsetY = function() {
    return  window.pageYOffset;
    }


  } 
  // IE9 and earlier
  else {

    var getPageOffset = function() {
    return {x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop};
    }
    var getPageOffsetX = function() {
    return document.documentElement.scrollLeft;
    }
    var getPageOffsetY = function() {
    return document.documentElement.scrollTop;
    }

  }


    function getViewportDimensions() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    return {"width":x, "height":y};
    }


    function animateInSidebar(jEl) {

      if(window.globalTransit) {
      return;
      }

    //stop scrolling on the body
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.scroll = "no"; // ie only

    var dims = getViewportDimensions();

    $('#fixed_sidebar_content').css('height', dims['height']+'px');

    window.globalTransit = true;

    jEl.animate(
      {'left':'0%'},
      {duration:250, complete:
        function() {
        window.globalTransit = false;
        }
      });

    }
    function animateOutSidebar(jEl) {

      if(window.globalTransit) {
      return;
      }

    //start the scrolling on the body again. 
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
    document.body.scroll = "yes"; // ie only

    window.globalTransit = true;

    jEl.animate(
      {'left':'-100%'},
      {duration:250, complete:
        function() {
        window.globalTransit = false;
        }
      });

    }




    function toggleExpand(jEl) {
    var data = jEl.data('animation');


      if(data.transit == false) {

        if(data.transit) {
        return;
        }

        if(data.closed) {

        data.closed = false;
        data.transit = true;

        jEl.css('height','auto');
        var offsetHeight =  jEl.get(0).offsetHeight+'px';
        jEl.css('height','0px');


          jEl.animate(
            {'height':offsetHeight},
            {duration:250, complete:
              function() {
              data.transit = false;
              jEl.css('height','auto');
              }
            });
        
        //////////////



        } else {
        data.closed = true;
        data.transit = true;

            jEl.animate(
            {'height':'0px'},
            {duration:250, complete:
              function() {
              data.transit = false;
              }
            });
            /////////
            // jEl.css('height','0px');
            // data.transit = false;
            ///////////

        }

      }

    }

/*
    function toggleExpand(jEl) {
    var data = jEl.data('animation');


      if(data.transit == false) {

        if(data.transit) {
        return;
        }

        if(data.closed) {

        data.closed = false;
        data.transit = true;

        jEl.css('height','auto');
        var offsetHeight =  jEl.get(0).offsetHeight+'px';
        jEl.css('height','0px');


          jEl.animate(
            {'height':offsetHeight},
            {duration:250, complete:
              function() {
              data.transit = false;
              jEl.css('height','auto');
              }
            });

        } else {
        data.closed = true;
        data.transit = true;

            jEl.animate(
            {'height':'0px'},
            {duration:250, complete:
              function() {
              data.transit = false;
              }
            });

        }

      }

    }
*/


    function mainPageBehavior() {

      //alert("farts!");
      // window.style.overflow = "hidden";
      // window.style.position = "fixed";

      //alright- so prevening scrolling on the iPhone is a huge huge huge pain in the ass.
        //alert("????????");


        //////////
        // document.body.style.overflow = "hidden";
        // document.body.style.position = "fixed";
        ///////////
        //stopBodyScrolling(true);
      // //document.html.style.height = '0px';
      // document.body.style.height = '0px';

//       $('body, html').style('height','');

//       //https://coderwall.com/p/lyw2ug/how-to-prevent-native-scrolling-on-mobile-browsers
//       //this isn't working at all.
//       $(document.body).on("touchmove", function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     alert('!!');
// });


      var fixedNavBar = $('.fixed_nav_sidebar');
      var navbar = document.getElementById("nav_bar");
      var fixedRow = document.getElementById("fixed_row");
      var offset = getPosition(navbar);


      var sticky = offset.y; 
      //navbar.offsetTop; this was always 0 for some reason, so we switched to the getPosition function
      var navbarOriginalParent = navbar.parentNode;
      var ff1 = true;
      var ff2 = false;

      var navBarOriginalHeight = navbarOriginalParent.offsetHeight;


      //For some damn reason, this didn't work
      //$(document.body).on('scroll', function() {
      //but this did.
      $(window).on('scroll', function(e) {

        if (getPageOffsetY() > sticky) {

            if(ff1) {
            ff1 = false;
            ff2 = true;
            navbarOriginalParent.removeChild(navbar);
            navbarOriginalParent.style.height = navBarOriginalHeight+'px';
            fixedRow.appendChild(navbar);
            fixedRow.style.display = 'block';
            }

        } else {

            if(ff2) {
            ff2 = false;
            ff1 = true;
            fixedRow.removeChild(navbar);
            navbarOriginalParent.appendChild(navbar);
            navbarOriginalParent.style.height = 'auto';
            fixedRow.style.display = 'none';
            }

        }
      });


      $('#hamburger_menu_icon').on('click', function(e) {
      animateInSidebar(fixedNavBar);
      });

      $('#sidenav_header').on('click', function(e) {
      animateOutSidebar(fixedNavBar);
      });


      $('.mobile_ul').on('click', function(e){
      var target = $(e.target);
      
      var expandTarget = target.next();

        if(expandTarget.length != 0) {
        var animationData = expandTarget.data('animation');

          if(!animationData) {
          animationData = {"transit":false, "closed":true};
          expandTarget.data('animation',animationData);
          }

        toggleExpand(expandTarget);


        }

      });

    }


    function randomFloat(floor, ceiling) {
    return  (ceiling - floor)*(Math.random()) + floor;
    }
    function randomInt(floor, ceiling) {
    return Math.round(randomFloat(floor,ceiling));
    }

    function loadRobRocketAdUnitMainIndexPage(adUnitText) {
    var mainListing = $('#main_listing');
    var numChildren = Math.min(mainListing.children().length, 4);
    var insertIndex = randomInt(0,4);
   
      if(numChildren == insertIndex) {
      insertIndex--;
      }

    var adUnitContainer = $(document.createElement("div"));

    adUnitContainer.html(adUnitText);

    mainListing.children().eq(insertIndex).after(adUnitContainer);
    }




