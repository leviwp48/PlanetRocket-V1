/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
//  Main Page javascript application.                                          //
//  Handles all the bells and whistles, and feeds all the different modules    //
//  lifecycle delegate calls.                                                  //
//  Author- Alex Lowe                                                          //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////

// BlueBox.compose("ResizeHandler", function(_class, _proto) {

// 	_proto._build = function(callback) {
// 	this._callback = callback;
// 	this._owner = null;

// 	this._prev = null;
// 	this._next = null;
// 	}

// 	_proto.go = function() {
// 	this._callback.call(this);
// 	}

// 	_proto.remove = function() {
// 	this._owner.removeResizeHandler(this);

// 	this._callback = null;
// 	this._owner = null;
// 	this._prev = null;
// 	this._next = null;
// 	}

// });


// BlueBox.compose("ResizeHandler", "GreedyVerticalImageContainer", function(_class, _proto, _super) {

// 	_proto._build = function(container) {

// 	this._targetDomNode = null;
// 	this._setHeightOnThis = null;


// 	var callback = function() {
// 		var targetDomNode = this._targetDomNode;

// 			if(!targetDomNode) {
// 			var target =  container.find("[class*='ie-shiv']");
// 			targetDomNode = target.length > 0 ? target.get(0) : null;
// 			this._targetDomNode = targetDomNode;
// 			}

// 			if(targetDomNode) {
// 			var setHeightOnThis = this._setHeightOnThis;

// 				if(!setHeightOnThis) {
// 				setHeightOnThis = $(targetDomNode).children().eq(0);
// 				this._setHeightOnThis = setHeightOnThis;
// 				}

// 			setHeightOnThis.css("height", targetDomNode.offsetHeight);
// 			}

// 		};

// 	_super._build.call(this, callback);


// 	}

// });




BlueBox.compose('applications.AppBase', function(_class, _proto) {

var Helper          	= BlueBox.port("util.Helper");
var ResizeHandler   	= BlueBox.port("util.resizers.ResizeHandler");
var HTML                = BlueBox.port("util.HTML");
var UserNavWidget   	= BlueBox.port("ui.UserNavWidget");
var SideBar         	= BlueBox.port("ui.sidebar.SideBar");
var CollapsibleMenu     = BlueBox.port("ui.sidebar.content.CollapsibleMenu");
var LightBox            = BlueBox.port("ui.LightBox");



_proto.init = function() {

this.globalTransit = false;

this._responsiveDeviceCode = 0;

this._moreModInstances = [];

this._moreModulesToLoad = [];

this._loggedIn = window["_loggedIn"];

this._firstResizeHandler = null;
this._lastResizeHandler = null;

HTML.i()
	.definePrefabStart("big-loading-panel")
		.abox()
			.attr("style","width:100%; height:100%; background:#FFFFFF;")
			.abox()
				.style("width","200px")
				.style("height","200px")
				.style("background","url('"+window["_APP_BASE"]+"/images/Spinner-0.6s-200px.gif')")
				.style("border","2px solid #DDDDDD")
				.style("left","50%")
				.style("top","50%")
				.style("transform","translateX(-50%) translateY(-50%)")
				.style("-me-transform","translateX(-50%) translateY(-50%)")
			._()
		._()
	.definePrefabEnd()

HTML.i()
	.definePrefabStart("error-panel")
        .vgroup()
        	.box().style("width","100%")
        		.row()
                .style("padding","15px")
                .style("font-size","1.2em")
                .style("font-weight","bold")
                .style("color","white")
                .style("text-align","center")
                .style("background","url('"+window["_APP_BASE"]+"/images/stripe-red.png') repeat")
                .html("Oh, Snap! A server error!")
        		._()
        	._()
        	.box()
        		.attr("style","height:100%; width:100%;")
        			.row()
        				.attr("style","padding:15px; padding-right:30px; text-align:center; font-size:1.4em; top:50%; transform:translateY(-50%); -ms-transform:translateY(-50%);")
        				.html(HTML.param("error-message"))
        			._()
        	._()
        ._()
	.definePrefabEnd();

}

//patch for IE8 and lower.
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}


_proto.showXHRError = function(message, realMessage) {
var l = new LightBox();
l.open({"height":"80%"});

	HTML.i()
		.cacheStart()
			.prefab("error-panel")
				.fparam("error-message", message)
			._()
		.cacheTo(l.stage());

		if(realMessage) {
		//console.log(realMessage)
		}

}
_proto.showXHRLoadingPanel = function() {
var l = new LightBox();
l.open({"height":"80%"});
l.mandatory(true);

	HTML.i()
		.cacheStart()
			.prefab("big-loading-panel")
			._()
		.cacheTo(l.stage());	
}

_proto.isUserLoggedIn = function() {
return this._loggedIn;
}


_proto.bootstrap = function() {

var ctx = this;

this.helper = new Helper();

this._viewportSize = this.helper.getViewportDimensions();

this._responsiveDeviceCode = this.helper.getResponsiveDeviceCode();

this._sidebar = new SideBar(this, new CollapsibleMenu());

this._modules = {};

this._userNavWidget = new UserNavWidget(this._loggedIn, this);

this.initModules();

var moreModules = $('.js_gbc_app');

this.loadAdditionalModules(moreModules);

$(window).on('resize.AppClick', function() {
	ctx.resize();
	});

}


/**
 * load whatever additional modules come from the page. 
 *
 */
_proto.loadAdditionalModules = function(moreModules) {
var ctx = this;
var moreModulesToLoad = this._moreModulesToLoad;
var moduleInstances = this._moreModInstances;

	if(moreModules.length > 0) {
		moreModules.each(function() {
		var el = $(this);
		var moduleType = el.attr("data-module");
		//console.log("moduleType: "+moduleType);
		var moduleArgs = null;

			//CodeBox is weird and it has a definite structure which is not meant to 
			//be interpreted as arguments.
			if(moduleType != "CodeBox") {

			var innerText = el.html().trim();
			innerText = ctx.helper.replaceCurlyQuotes(innerText);

				if(innerText[0] == '{' || innerText[0] == '[') {
				console.log(innerText);
				moduleArgs = JSON.parse(innerText);
				} else {
				moduleArgs = innerText;
				}

			} 
			
			//else, if it is CodeBox, then we're going to just make the arguments an empty object.
			else {
			var moduleArgs = {};
			}

		//this is information for the particular instance of the module, that we're going
		//to be using. If the page has 10 tags for video-embeds, then we're going to record
		//10 different elements that will have to get instantiated as soon as the VideoEmbed
		//module is loaded.
		var moduleInfo = {"module":moduleType, "args":moduleArgs, "el":el};
		moduleInstances.push(moduleInfo);

		moreModulesToLoad.push(moduleType);
		});


	//now we're going to loop through and all of these new modules that were specified on the page, we're going
	//to put together a new loader and load all of them up
	var loader = new _FileLoader();

	loader.homeDirectory('http://glowingbluecore.com/wordpress/wp-content/themes/glowingbluecore/assets/');

		for(var i=0; i<moreModulesToLoad.length; i++) {
		var moduleType = moreModulesToLoad[i];
		var path = "js/"+moduleType+'.js';
		//console.log("enqueing: "+moduleType);
		loader.enqueue(path);
		}

	//load everything up. when each module is 
	loader.resolveQueue(function(){
		ctx.moreModulesLoaded();
		});

	}

} 


_proto.moreModulesLoaded = function() {
var moreModInstances = this._moreModInstances;
var moreModulesToLoad = this._moreModulesToLoad;

	//all of the modules were loaded, so instantiate them all.
	for(var k=0; k<moreModulesToLoad.length; k++) {
	var moduleType = moreModulesToLoad[k];
	this.newModule(moduleType, window[moduleType]);
	}


	//now, load up all of the instances on the page.
	for(var i=0; i<moreModInstances.length; i++) {
	var instInfo = moreModInstances[i];
	var moduleType = instInfo["module"];
	var module = this._modules[moduleType]; 
	var args = instInfo["args"];
	var jEl = instInfo["el"];
	module.newInstance(args, jEl);
	}


}

/**
 * get the device-code. 0 for desktop, 1 for tablet/phablet, 2 for phone
 *
 */
_proto.getResponsiveDeviceCode = function() {
return this._responsiveDeviceCode;
}


/**
 * add either a resizer instance or a callback. returns a resizer object.
 * it's up to you to call the remove() method on othe resizer object when you no longer need it.
 *
 */
_proto.addResizer = function(arg) {
var r;

	if(arg instanceof Function) {
	r = new ResizeHandler(arg);
	} else {
	r = arg;
	}

r._owner = this;

this._numResizeHandlers++;

	if(!this._firstResizeHandler) {
	this._firstResizeHandler = r;
	this._lastResizeHandler = r;
	} else {
	this._lastResizeHandler._next = r;
	r._prev = this._lastResizeHandler;
	this._lastResizeHandler = r;
	}

r.go();

return r;

}


_proto.removeResizeHandler = function(handler) {

	if(handler._next && handler._prev) {
	handler._prev._next = handler._next;
	handler._next._prev = handler._prev;
	} 
	else
	if(!handler._next && handler._prev) {
	this._lastResizeHandler = handler._prev;
	this._lastResizeHandler._next = null;
	} 
	else 
	if(handler._next && !handler._prev) {
	this._firstResizeHandler = handler._next;
	this._firstResizeHandler._prev = null;
	} 
	else
	if(!handler._next && !handler._prev) {
	this._firstResizeHandler = null;
	this._lastResizeHandler = null;
	}

handler._prev = null;
handler._next = null;



}


_proto.resize = function() {
var newCode = this.helper.getResponsiveDeviceCode();
var modules = this._modules;

	if(newCode != this._responsiveDeviceCode) {
	this._responsiveDeviceCode = newCode;

		for(var modName in modules) {
		var module = modules[modName];
		module.newScreenSize();
		}

	}

	for(var modName in modules) {
	var module = modules[modName];
	module.resized();
	}

var resizeHandler = this._firstResizeHandler;

this._viewportSize = this.helper.getViewportDimensions();

	while(resizeHandler) {
	resizeHandler.go();
	resizeHandler = resizeHandler._next;
	}
	

}


_proto.getViewportDimensions = function() {
return this._viewportSize;	
}

_proto.newModule = function(moduleName, classHandle, argObject) {
//console.log("moduleName: "+moduleName);
this._modules[moduleName] = new classHandle(argObject, this);
}

_proto.getModuleWithName = function(moduleName) {
return this._modules[moduleName];
}

_proto.initModules = function() {
//use the newModule function here.

}

});


