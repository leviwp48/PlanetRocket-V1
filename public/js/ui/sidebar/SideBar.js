////////////////////////////////////////////////////////////////////
//                                                                //
//  Sidebar. The content area gets passed in by injection, and    //
//  this class calls a set of lifecycle functions on that object  //
//                                                                //
////////////////////////////////////////////////////////////////////


BlueBox.compose("ui.sidebar.SideBar", function(_class, _proto) {

var Helper         = BlueBox.port("util.Helper");
var HTML           = BlueBox.port("util.HTML");


  _proto._build = function(app, contentObject) {

  this._app = app;

  this._isOpen = false;

  this._contentObject = contentObject;

  this._contentObject._owner = this;

  var fixedDomNode = HTML.i()

      .cacheStart()
        .div()
          .style("position","fixed")
          .style("top","0px")
          .style("left","-100%")
          .style("width","100%")
          .style("height","100%")
          .style("z-index","11")
          .style("background","#333333")
          .style("overflow","scroll")
        ._()
      .cacheEnd();

  this._fixed = $(fixedDomNode);

  var content = contentObject.provideContent();

    if(content instanceof jQuery) {
    this._fixed.append(content);
    } else {
    this._fixed.append($(content));
    } 

  $(document.body).append(this._fixed);

  }


  /**
   * lifecycle functions.
   *
   */
  _proto.animateInStart = function() {
  var ctx = this;
  var app = this._app;

  //$(document.body).append(this._fixed);

  this._resizer = app.addResizer(function(){
      var size = app.getViewportDimensions();
      ctx.resize(size);
      });

  this._contentObject.animateInStart();
  }
  _proto.animateInEnd = function() {

  this._contentObject.animateInEnd();

  }
  _proto.animateOutStart = function() {

  this._contentObject.animateOutStart();

  }
  _proto.animateOutEnd = function() {
  this._resizer.remove();
  this._contentObject.animateOutEnd();
  //this._fixed.detach();
  }

  /**
   * this will fire on resize of the window. update the height of the fixed element.
   *
   */
  _proto.resize = function(size) {
  var h = size["height"];
  this._fixed.css('height', h+'px');
  this._contentObject.resize(size);
  }


  _proto.animateInSidebar = function(jEl) {
  var app = this._app;
  var ctx = this;
  var contentObject = this._contentObject;


    if(app.globalTransit) {
    return;
    }

  this.animateInStart();

  //stop scrolling on the body
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.scroll = "no"; // ie only

  //var dims =  Helper.i().getViewportDimensions();
  //this._fixedPane.css('height', dims['height']+'px');

  app.globalTransit = true;

  jEl.animate(
    {'left':'0%'},
    {duration:250, complete:
      function() {
      app.globalTransit = false;
      ctx.animateInEnd();
      }
    });

  }



  _proto.animateOutSidebar = function(jEl) {
  var app = this._app;
  var ctx = this;
  var contentObject = this._contentObject;

    if(app.globalTransit) {
    return;
    }

  this.animateOutStart();

  //start the scrolling on the body again. 
  document.body.style.overflow = "auto";
  document.body.style.position = "static";
  document.body.scroll = "yes"; // ie only

  app.globalTransit = true;

  jEl.animate(
    {'left':'-100%'},
    {duration:250, complete:
      function() {
      app.globalTransit = false;
      ctx.animateOutEnd();
      }
    });

  }


  _proto.closeIfOpen = function() {
    if(this._isOpen) {
    this.toggleAnimateSideBar();
    }
  }


  _proto.toggleAnimateSideBar = function() {

    if(this._app.globalTransit) {
    return;
    }

    if(!this._isOpen) {
    this._isOpen = true;
    this.animateInSidebar(this._fixed);
    } else {
    this._isOpen = false;
    this.animateOutSidebar(this._fixed);
    }

  }


});
