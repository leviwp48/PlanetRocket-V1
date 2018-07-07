function PostPage() {

//https://sano.shop/en/products/detail/49149
//https://www.buybuybaby.com/store/product/joovy-reg-spoon-walker-in-charcoal/1040558219?skuId=40558219&mcid=PS_googlepla_nonbrand_furniture_online&product_id=40558219&product_channel=online&adtype=pla&adpos=1o28&creative=87525725820&device=c&matchtype=&network=g&mrkgadid=3103772842&mrkgcl=611&rkg_id=h-fc28eba20f28c5af4c0a36b3d3178085_t-1515863673&gclid=EAIaIQobChMI8e6P5rfV2AIVUGt-Ch3buQtdEAkYHCABEgKvB_D_BwE

this._sideNavInInitialEmptyState = true; 
this._sideNavCurrentPane = '';
this._categoriesAndTagsSidePane = null;
this._navigationSidePane = null;
this._currentSideNavPaneKey = '';
this._currentSideNavPane = null;
this._contentForFixedSidebar = null;
this._fixedSideBarPanes = {};

this._fixedSideBarPanes['cats_and_tags'] = $('#sidebar_categories_and_tags_pane');
this._fixedSideBarPanes['main_nav'] = $('#sidebar_navigation_pane');
this._contentForFixedSidebar = $('#fixed_sidebar_content');

}

PostPage.prototype.animateInSidebar = function(jEl) {

  if(_Aux.globalTransit) {
  return;
  }

//stop scrolling on the body
document.body.style.overflow = "hidden";
document.body.style.position = "fixed";
document.body.scroll = "no"; // ie only

var dims = _Aux.getViewportDimensions();

$('#fixed_sidebar_content').css('height', dims['height']+'px');



_Aux.globalTransit = true;

jEl.animate(
  {'left':'0%'},
  {duration:250, complete:
    function() {
    _Aux.globalTransit = false;
    }
  });

}
PostPage.prototype.animateOutSidebar = function(jEl) {

  if(_Aux.globalTransit) {
  return;
  }

//start the scrolling on the body again. 
document.body.style.overflow = "auto";
document.body.style.position = "static";
document.body.scroll = "yes"; // ie only

_Aux.globalTransit = true;

jEl.animate(
  {'left':'-100%'},
  {duration:250, complete:
    function() {
    _Aux.globalTransit = false;
    }
  });

}


PostPage.prototype.toggleExpand = function(jEl) {
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


//'cats_and_tags'
//main_nav
PostPage.prototype.setSideNavToDisplayPane = function(whichPane) {

  if(this._sideNavInInitialEmptyState) {
  var newPane = this._fixedSideBarPanes[whichPane];

    if(!newPane) {
    throw new Error("Sidebar pane not found for key "+whichPane);
    }

  this._contentForFixedSidebar.append(newPane);
  this._currentSideNavPaneKey = whichPane;
  this._currentSideNavPane = newPane;
  } else {

    if(whichPane != this._currentSideNavPaneKey) {
    this._currentSideNavPane.detach();

    var newPane = this._fixedSideBarPanes[whichPane];

      if(!newPane) {
      throw new Error("Sidebar pane not found for key "+whichPane);
      }

    this._contentForFixedSidebar.append(newPane);
    this._currentSideNavPaneKey = whichPane;
    this._currentSideNavPane = newPane;
    }

  }

this._sideNavInInitialEmptyState = false;

this.collapsableSideNavBehavior();

}




PostPage.prototype.fixedNavBarBehavior = function() {

  var hiddenCategoriesAndTags = $('#hidden_categories_and_tags');

  var filedTo = $('#filed_to_button_mobile');
  var fixedNavBar = $('.fixed_nav_sidebar');

  //the fixed-sidebar content has two panes. one for the categories and tags and one for the navigation collapseable
  //menu. We're reusing the this fixed-sidebar for both uses. We're going to start off by removing both of the panes, but
  //we're holding onto them in memory so that we can reuse them later.
  this._fixedSideBarPanes['cats_and_tags'].detach();
  this._fixedSideBarPanes['main_nav'].detach();
  var ctx = this;

    //if we're on a phone or tablet, then we're going to get rid of the drop-down version of the
    //cats and tags, and leave it up to the side-nav to show that information.
    if(_Aux._responsiveDeviceCode > 0) {

    //the categories and tags are initially on a hidden row in the post markup. We're going to loop through with jquery
    //and take those contents out of there and put them in a specific div on the fixed sidebar. We're going to use that sidebar
    //for two things- 1: the naviation and 2: showing the tags and categories on mobile.
    hiddenCategoriesAndTags.children().each(function() {
      var j = $(this);
      j.detach();
      ctx._fixedSideBarPanes['cats_and_tags'].append(j);
    });

    $('#categories_and_tags_list_main').remove();

      filedTo.on('click', function(){
      ctx.setSideNavToDisplayPane('cats_and_tags');
      ctx.animateInSidebar(fixedNavBar);
      });
    }


  $('#hamburger_menu_icon').on('click', function(e) {
  ctx.setSideNavToDisplayPane('main_nav');
  ctx.animateInSidebar(fixedNavBar);
  });

  $('#sidenav_header').on('click', function(e) {
  ctx.animateOutSidebar(fixedNavBar);
  });

}

PostPage.prototype.collapsableSideNavBehavior = function() {
var ctx = this;

  $('.mobile_ul').on('click', function(e){
  var target = $(e.target);

  var expandTarget = target.next();

    if(expandTarget.length != 0) {
    var animationData = expandTarget.data('animation');

      if(!animationData) {
      animationData = {"transit":false, "closed":true};
      expandTarget.data('animation',animationData);
      }

    ctx.toggleExpand(expandTarget);


    }

  });

}



PostPage.prototype.stickyTopNavBehavior = function() {

  //var fixedNavBar = $('.fixed_nav_sidebar');
  var navbar = document.getElementById("nav_bar");
  var fixedRow = document.getElementById("fixed_row");
  var offset = _Aux.getPosition(navbar);

  var sticky = offset.y; 
  //navbar.offsetTop; this was always 0 for some reason, so we switched to the getPosition function
  var navbarOriginalParent = navbar.parentNode;
  var ff1 = true;
  var ff2 = false;

  var navBarOriginalHeight = navbarOriginalParent.offsetHeight;


    //if we're on a phone or tablet, then we're going to skip this sticky nav thing.
    if(_Aux._responsiveDeviceCode == 0) {

      //For some damn reason, this didn't work
      //$(document.body).on('scroll', function() {
      //but this did.
      $(window).on('scroll', function() {

        if (_Aux.getPageOffsetY() > sticky) {

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

    }


}


PostPage.prototype.mainPageBehavior = function() {

  this.fixedNavBarBehavior();

  this.collapsableSideNavBehavior();

  this.stickyTopNavBehavior();

}



function mainPageBehavior() {

var postPage = new PostPage();
postPage.mainPageBehavior();

var sidebarAds = new SideBarAds();
sidebarAds.startAds();

}




