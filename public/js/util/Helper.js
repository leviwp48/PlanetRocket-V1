BlueBox.compose('util.Helper', function(_class, _proto) {

_proto._build = function() {

this._isBodyScrollFrozen = false;

}

_class.i = function() {

  if(!_class.instance) {
  _class.instance = new _class();
  }

}

_proto.getResponsiveDeviceCode = function() {

var o = $('#js_responsive_device_width').get(0).offsetWidth;
var screenCodes = {'0':-1, '100':0, '200':1, '300':2};
var r = screenCodes[o+''];

return r;
}


_proto.freezeBodyScroll = function() {

  if(!this._isBodyScrollFrozen) {
  this._isBodyScrollFrozen = true;

  this._currentScroll = $(window).scrollTop();

  //stop scrolling on the body
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.scroll = "no"; // ie only

  //can't make this work for some reason. it always scrolls to the top when you click the lightbox open
  //tried commenting out the overflow. wierd weird weird.
  //$(window).scrollTop(this._currentScroll);
  //document.body.style['top'] = this._currentScroll;
  //console.log("this._currentScroll: "+this._currentScroll);

  }

}

_proto.allowBodyScroll = function() {

  if(this._isBodyScrollFrozen) {
  this._isBodyScrollFrozen = false;

  //start the scrolling on the body again. 
  document.body.style.overflow = "auto";
  document.body.style.position = "static";
  document.body.scroll = "yes"; // ie only

  $(window).scrollTop(this._currentScroll);


  }

}


//http://glowingbluecore.com/wordpress/star-citizens-never-ending-story/
//wordpress also will mangle quotes by turning them into prime symbols.
//probably this is a security thing,
_proto.replaceCurlyQuotes = function(dirty) {
var clean = dirty.replace(/[\u2018\u2019]/g, "'")
.replace(/[\u201C\u201D]/g, '"')
.replace(/\u2033/g, '"');  //U+2033 fucking wordpress inserts an asci double-prime 

//these are the prime symbols.
//\u2032, \u2033, \u2035, \u2036

return clean;
}

_proto.replaceWordpressURLBullshit = function(dirty) {
//goddamn wordpress replaces your shit that your write with fucking unicode character goddammit
//https://en.wikipedia.org/wiki/X_mark
var clean = dirty.replace(/\u00D7/g, "x")
.replace(/\u2A2F/g, "x");

return clean;
}


_proto.getPosition = function(el) {

  var x = 0,
      y = 0;

  while (el != null && (el.tagName || '').toLowerCase() != 'html') {
      x += el.offsetLeft || 0; 
      y += el.offsetTop || 0;
      el = el.parentNode;
  }

  return { x: parseInt(x, 10), y: parseInt(y, 10) };
}

_proto.getViewportDimensions = function() {
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

return {"width":x, "height":y};
}
_proto.getPageHeight = function() {
var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

return height;
}


  //https://www.w3schools.com/jsref/prop_win_pagexoffset.asp
  //cross-browser get page x/y offset.
  // All browsers, except IE9 and earlier
  if (window.pageXOffset !== undefined) { 

    _proto.getPageOffset = function() {
    return  {x:window.pageXOffset, y:window.pageYOffset};
    }
    _proto.getPageOffsetX = function() {
    return  window.pageXOffset;
    }
    _proto.getPageOffsetY = function() {
    return  window.pageYOffset;
    }


  } 
  // IE9 and earlier
  else {

    _proto.getPageOffset = function() {
    return {x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop};
    }
    _proto.getPageOffsetX = function() {
    return document.documentElement.scrollLeft;
    }
    _proto.getPageOffsetY = function() {
    return document.documentElement.scrollTop;
    }

  }


  _proto.randomFloat = function(floor, ceiling) {
  return  (ceiling - floor)*(Math.random()) + floor;
  }
  _proto.randomInt = function(floor, ceiling) {
  return Math.round(this.randomFloat(floor,ceiling));
  }


});
