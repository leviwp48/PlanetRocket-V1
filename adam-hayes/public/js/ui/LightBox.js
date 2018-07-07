BlueBox.compose('ui.LightBox', function(_class, _proto) {

_class._isBodyScrollFrozen = false;

_class._currentOpenLightBox = null;


_proto._build = function() {

this._open = false;

this._stage = null;

this._mandatory = false;

}


_proto.freezeBodyScroll = function() {

  if(!_class._isBodyScrollFrozen) {
  _class._isBodyScrollFrozen = true;

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

  if(_class._isBodyScrollFrozen) {
  _class._isBodyScrollFrozen = false;

  //start the scrolling on the body again. 
  document.body.style.overflow = "auto";
  document.body.style.position = "static";
  document.body.scroll = "yes"; // ie only

  $(window).scrollTop(this._currentScroll);

  }

}



/////////////
//         //
//  A P I  // 
//         //
/////////////


/**
 * open the lightbox. this will close whatever lightbox is already open.
 *
 */
_proto.open = function(options) {
	if(!options) {
	options = {};
	}

var currentLB = _class._currentOpenLightBox;

	if(currentLB) {
	currentLB.forceClose();
	}


	if(!this._open) {
	this._open = true;

	_class._currentOpenLightBox = this;

	this.freezeBodyScroll();

	var body = $(document.body);

	var ctx = this;

	var background = $(document.createElement('div'));
	background.attr("class","formstyles-lightbox-background");

	var stage = $(document.createElement('div'));
	stage.attr('class', 'abox lightbox_width_800 formstyles-lightbox-stage');

		if(options["height"]) {
		stage.css("height",options["height"]);
		} else {
		stage.css("height","70%");
		}


	var closeOuter = $(document.createElement('div'));
	closeOuter.attr('class','abox');
	closeOuter.attr('style','top:0px; left:100%;');

	var closeInner = $(document.createElement('div'));
	closeInner.attr('class','abox');
	closeInner.attr('style','top:-40px; left:auto; right:-10px; white-space:nowrap; padding:10px; color:#FFFFFF; cursor:pointer; font-weight:bold; font-size:1.5em;');
	closeInner.html('close (x)');

	closeOuter.append(closeInner);

	this._background = background;
	this._stage = stage;
	this._closeInner = closeInner;
	this._closeOuter = closeOuter;

	body.append(background);
	body.append(stage);
	stage.append(closeOuter);

		this._closeInner.on('click',function(e){
		ctx.close();
		});
	    this._background.on('click',function(e){
		ctx.close();
		});

	this._stage = stage;

	}

}


/**
 * set the mandatory variable.
 *
 */
_proto.mandatory = function(yesOrNo) {
this._mandatory = yesOrNo;
	if(yesOrNo) {
	this._closeOuter.css("display","none");
	} else {
	this._closeOuter.css("display","inline");
	}
}



/**
 * the stage.
 *
 */
_proto.stage = function() {
return this._stage;
}


/**
 * force-close, ignoring the mandatory thing
 *
 */
_proto.forceClose = function() {
this.mandatory(false);
this.close();
}


/**
 * close and obey the mandatory rule.
 *
 */
_proto.close = function() {

	if(this._open && !this._mandatory) {

		if(this._beforeClose) {
		this._beforeClose.call(this);
		}

	this._open = false;

	this.allowBodyScroll();

	this._background.remove();
	this._closeInner.remove();
	this._closeOuter.remove();
	this._stage.remove();
	//this._foreground.remove();

	this._background = null;
	this._closeInner = null;
	this._closeOuter = null;
	this._stage = null;
	this._foreground = null;

	_class._currentOpenLightBox = null;
	}

}


_proto.beforeClose = function(closure) {
this._beforeClose = closure;
}

_proto.destroy = function() {
this.close();
}


});


