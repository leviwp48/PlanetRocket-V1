
function Auxilliary() {
this.globalTransit = false;

var o = $('#js_responsive_device_width').get(0).offsetWidth;

var screenCodes = {'0':-1, '100':0, '200':1, '300':2};

this._responsiveDeviceCode = screenCodes[o+''];

}


Auxilliary.prototype.getPosition = function(el) {

  var x = 0,
      y = 0;

  while (el != null && (el.tagName || '').toLowerCase() != 'html') {
      x += el.offsetLeft || 0; 
      y += el.offsetTop || 0;
      el = el.parentNode;
  }

  return { x: parseInt(x, 10), y: parseInt(y, 10) };
}

Auxilliary.prototype.getViewportDimensions = function() {
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

return {"width":x, "height":y};
}
Auxilliary.prototype.getPageHeight = function() {
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

    Auxilliary.prototype.getPageOffset = function() {
    return  {x:window.pageXOffset, y:window.pageYOffset};
    }
    Auxilliary.prototype.getPageOffsetX = function() {
    return  window.pageXOffset;
    }
    Auxilliary.prototype.getPageOffsetY = function() {
    return  window.pageYOffset;
    }


  } 
  // IE9 and earlier
  else {

    Auxilliary.prototype.getPageOffset = function() {
    return {x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop};
    }
    Auxilliary.prototype.getPageOffsetX = function() {
    return document.documentElement.scrollLeft;
    }
    Auxilliary.prototype.getPageOffsetY = function() {
    return document.documentElement.scrollTop;
    }

  }


Auxilliary.prototype.randomFloat = function(floor, ceiling) {
return  (ceiling - floor)*(Math.random()) + floor;
}
Auxilliary.prototype.randomInt = function(floor, ceiling) {
return Math.round(this.randomFloat(floor,ceiling));
}

_Aux = new Auxilliary();