///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//  StickyTopNav                                                                                     //
//                                                                                                   //
//  The sticky top-nav. This receives the resized and newScreenSize delegate calls from the app.     //
//  There's some nasty state-problems in here, but basically this should behave in all               //
//  modes: The page starting down in the middle, the page starting as collapsed then expanding,      //
//  the page starting as expanded, then collapsing etc etc.                                          //
/// Author- Alex Lowe                                                                                //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////


BlueBox.compose("ui.StickyTopNav", function(_class, _proto) {


_proto._build = function(moduleArgs, app) {

this._app = app;

this._navbar = document.getElementById("nav_bar");
this._fixedRow = document.getElementById("fixed_row");
this._offset = this._app.helper.getPosition(this._navbar);

this._navbarNext = this._navbar.nextSibling;
this._navbarPrev = this._navbar.previousSibling;
this._navbarParent = this._navbar.parentNode;
this._navbarOriginalHeight = this._navbarParent.offsetHeight;


this._removed = false;
this._gtStickyFF = false;
this._ltStickyFF = true;

this._behavior = true;
this.addBehavior();

this._hideFixedRow = false;

  // if(window.location.href == "http://planetrocket.com") {
  // this._offset = 0; 
  // }

  //we want an override here so that if the screen is in a narrow position, then the sticky-top-nav
  //won't be visible at all.
  if(app.helper.getResponsiveDeviceCode() != 0) {
  this._hideFixedRow = true;
  this._fixedRow.style.display = 'none';
  }

}


_proto.removeNavBar = function() {
  if(!this._removed) {
  this._navbarParent.removeChild(this._navbar); 
  this._removed = true;
  }
}
_proto.replaceNavBar = function() {
  try {

    if(this._removed) {

      if(this._navbarNext) {
      this._navbarParent.insertBefore(this._navbar, this._navbarNext);
      } else {
      this._navbarParent.appendChild(this._navbar); 
      }

    this._removed = false;
    }

  } catch(err) {
  throw new Error(" replaceNavBar: "+err.message);
  }

}


/**
 * the resize delegate function.
 *
 */
_proto.resized = function() {}

/**
 * this gets called when a new screen-size appears.
 *
 */
_proto.newScreenSize = function() {
var newSize = this._app.getResponsiveDeviceCode();

  if(newSize == 0) {

  this._hideFixedRow = false;
  this._fixedRow.style.display = 'static';

    if(!this._behavior) {
    this.addBehavior();
    $(window).trigger('scroll.StickyTopNav_scroll');
    this._behavior = true;
    }

  } else {

  this._hideFixedRow = true;
  this._fixedRow.style.display = 'none';

    if(this._behavior) {
    this.removeBehavior();
    this._behavior = false;
    }

  }



}


/**
 * add and remove the behavior
 *
 */
_proto.addBehavior = function() {

var ctx = this;

var navbar = this._navbar;
var navbarOriginalContainer = this._navbarParent;
var fixedRow = this._fixedRow;
var offset = this._offset;

var sticky = offset.y; 



  $(window).on('scroll.StickyTopNav_scroll', function() {

    if (ctx._app.helper.getPageOffsetY() > sticky) {

        if(!ctx._gtStickyFF) {
        ctx._gtStickyFF = true;
        ctx._ltStickyFF = false;
        ctx.removeNavBar();
        navbarOriginalContainer.style.height = ctx._navbarOriginalHeight+'px'
        fixedRow.appendChild(navbar);

          if(ctx._hideFixedRow) {
          fixedRow.style.display = 'none';
          } else {
          fixedRow.style.display = 'block';
          }
        }

    } else {

        if(!ctx._ltStickyFF) {
        ctx._gtStickyFF = false;
        ctx._ltStickyFF = true;
        fixedRow.removeChild(navbar);
        ctx.replaceNavBar();
        navbarOriginalContainer.style.height = 'auto';
        fixedRow.style.display = 'none';
        }

    }

  });


}

_proto.removeBehavior = function() {
$(window).off('.StickyTopNav_scroll');
}


});




