
	/**
	BlueBox and all of its supporting files are distributed under the MIT licence:

	BlueBox Copyright (c) 2011 Alex Lowe

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	 **/

//################################
//##### bluebox master copy ######
//################################


function BlueBox() {}


//default namespace root. has to be something.
BlueBox.dfltNS = 'blue';

//default prefix which is used to prevent collisions.
BlueBox.pfx = 'h7u';

//deprecated.
BlueBox._building_ = false;

//this is the path relative to the library from the page.
//if the library is one level up, then this is going to be
// "../" use the setLibPath() function to set this guy.
BlueBox.libPath = 'bluebox';

/**
 * create a new class within the BlueBox framework. Before the first class is defined, the
 * default namespace has to be set to something.
 *
 * compose('fundamental.Event' function(_proto,_class){})
 * will define a class Event in blue.fundamental.Event.
 *
 * compose('Event' function(_proto,_class){})
 * will define a class Event in blue.Event.
 *
 * compose('fundamental.Event', 'fundamental.hogwarts.SpecialEvent' function(_proto, _class, _super){})
 * will define a class blue.fundamental.hogwarts.SpecialEvent extended from blue.fundamental.Event
 *
 * compose('Event', 'SpecialEvent' function(_proto, _class, _super){})
 * will define a SpecialEvent extended from Event.
 *
 * You can do circular importing without problems, but if you try to extend from a class which
 * does not exist yet, BlueBox is going to complain.
 *
 *
 */
 BlueBox.compose = function(arg1, arg2, arg3) {

var l1 = arg1.lastIndexOf('.');
var c1;
var ns1;
var nsO1;

    //there must be a default namespace.
	if(!BlueBox.dfltNS) {
	throw new Error('Error: BlueBox => compose: There is no default namespace code. See BlueBox.js for details');
	}

	//if the class index is not defined, then define it.
	if(BlueBox.currClassInd == undefined) {
	BlueBox.currClassInd = 0;
	BlueBox.numClasses = 0;
	}

	//if the name of new class comes with a namespace, then check it out
	//and create it if it doesn't exist.
	if(l1 != -1) {
	c1 = arg1.substr(l1+1);

		//if there is not a default namespace, then we have to create one.
		//just use the default namespace code that BlueBox comes with. You
		//used to be able to set the default namespace implitly with the
		//first class, but that's one feature too many.
	    if(BlueBox.dflt == undefined) {
		ns1 = BlueBox.dfltNS.concat('.').concat(arg1.substr(0,l1));
		nsO1 = BlueBox.space(ns1);
		BlueBox.dflt = BlueBox.space(BlueBox.dfltNS);
		}

		//else, if there is already a default namespace, then make
		//the specified namespace of this class a child of the default
		//namespace.
		else {
		//strip off the name of the class at the end. what we have left
		//is the location of the class in the namespace hierarchy.
		ns1 = BlueBox.dfltNS.concat('.').concat(arg1.substr(0,l1));

	    //convert the dot-delimited string into actual slots in the namespace hierarchy.
	    nsO1 = BlueBox.space(ns1);
		}

	}

	//else if it doesn't come with a namespace, and there is no default namespace,
	//then create one.
	else {
    c1 = arg1;
    ns1 = BlueBox.dfltNS;

		if(BlueBox.dflt == undefined) {
		BlueBox.dflt = BlueBox.space(ns1);
		}

	nsO1 = BlueBox.dflt;
	}


//variables for in case we have to do some redefinitions.
var redef = false;
var fromInd;
var toInd;

	//if the second argument is a string, then the first argument is
	//the name of the parent class, along with the namespace, the
	//second argument is the name of the new child class and namespace,
	//and the third argument is the constructor of the child class.
	if(typeof arg2 == 'string') {

	var l2 = arg2.lastIndexOf('.');
	var c2;
	var ns2;
	var nsO2;

	    //if there's a namespace included with the new class.
		if(l2 != -1) {
		c2 = arg2.substr(l2+1);
		ns2 = BlueBox.dfltNS.concat('.').concat(arg2.substr(0,l2));
		nsO2 = BlueBox.space(ns2);
		} else {
		c2 = arg2;
		ns2 = BlueBox.dfltNS;
		nsO2 = BlueBox.dflt;
		}

        //if there is a _circRedInd_ already defined for this class,
        //then that means that a previous class has imported this before
        //it's defined. Therefore, after this class is defined, some of the previous
        //classes will need to be redefined.
    	if(nsO2[c2] != undefined) {
    		if(nsO2[c2]._circRefInd_ != undefined) {
    		redef = true;
    		fromInd = nsO2[c2]._circRefInd_;
    		toInd = BlueBox.currClassInd;
    		}
    	}

		//create the generic contructor.
		nsO2[c2] = function(){
			if(this._build){
				if(BlueBox._building_ == false){
				this._build.apply(this, arguments);
				}
			}
		};

		//if this fails, throw an error.
		if(!nsO1[c1]) {
		throw new Error('Error: BlueBox => compose: You cannot extend from a class which does not exist yet. Check the definitions of '+arg1+' and '+arg2+' and make sure that '+arg1+' is defined beforehand.');
		return;
		}

	//someSpace.Child.prototype = new someOtherSpace.Parent();
	BlueBox._building_ = true;
    nsO2[c2].prototype = new nsO1[c1]();
    BlueBox._building_ = false;

    //someSpace.prototype.constructor = someSpace.child
	nsO2[c2].prototype.constructor=nsO2[c2];

	//give the class a handy-dandy unique prefix, which is the
	//BlueBox's main prefix appended with the number of classes that
	//have been defined. So this prefix will never repeat.
	nsO2[c2].pfx = BlueBox.pfx+BlueBox.numClasses;
	BlueBox.numClasses++;

	//cache the context function so that the import function will work
	BlueBox._crntClassCtx = arg3;

	//run the context function to create the class.
	arg3(nsO2[c2], nsO2[c2].prototype, nsO1[c1].prototype);

	//cache the definition in there's a circular import down the road.
	BlueBox.cacheDefinition(arg3, nsO2[c2], nsO2[c2].prototype, nsO1[c1].prototype);

        //if we have to, redefine some previous classes.
  		if(redef == true) {
  		BlueBox.redefineClasses(fromInd, toInd);
  		}

	}

	//there is no inheritance. create the class with the proper namespace.
	else {

        //if there is a _circRedInd_ already defined for this class,
        //then that means that a previous class has imported this before
        //it's defined. Therefore, after this class is defined, some of the previous
        //classes will need to be redefined.
    	if(nsO1[c1] != undefined) {
    		if(nsO1[c1]._circRefInd_ != undefined) {
    		redef = true;
    		fromInd = nsO1[c1]._circRefInd_;
    		toInd = BlueBox.currClassInd;
    		}
    	}


	//someSpace.SomeClass = someFunc.
    nsO1[c1] = function(){
    	if(this._build){
    		if(BlueBox._building_ == false) {
    		this._build.apply(this, arguments);
    		}
    	}
    };


	//give the class a handy-dandy unique prefix, which is the
	//BlueBox's main prefix appended with the number of classes that
	//have been defined. So this prefix will never repeat.
	nsO1[c1].pfx = BlueBox.pfx+BlueBox.numClasses;
	BlueBox.numClasses++;

	BlueBox._crntClassCtx = arg2;

    //create the class. pass the reference to the class, and the reference to the
    //prototype of the class.
    arg2(nsO1[c1], nsO1[c1].prototype);

	//cache the definition in there's a circular import down the road.
	BlueBox.cacheDefinition(arg2, nsO1[c1], nsO1[c1].prototype);

        //if we have to, redefine some previous classes.
  		if(redef == true) {
  		BlueBox.redefineClasses(fromInd, toInd);
  		}

	}

}


/**
 * create a slots in the namespace hierarchy of classes with a dot-delimited
 * string. the first entry in the string must be the default namespace of
 * BlueBox- for instance, 'blue.svg.animators' would create a slot for
 * animators within the slot for svg all within the default namespace 'blue'
 * of BlueBox.
 *
 * return the last slot.
 *
 */
BlueBox.space = function(ns) {
var nsParts;

nsParts = ns.split('.');
var root = window;
var len = nsParts.length;

 	for(var i=0; i<len; i++) {
  		if(root[nsParts[i]] == undefined) {
  		root[nsParts[i]] = new Object();
  		}

  	root = root[nsParts[i]];
 	}

return root;
}

/**
 * Caches all the information for how to define a BlueBox class into an array.
 * This is so that classes can be redefined on the fly if need be.
 *
 */
BlueBox.cacheDefinition = function(mainDef, mainClass, mainProto, superProto) {

	//if the array of definitions doesn't exist yet, create it.
	if(BlueBox.classDefs == undefined) {
	BlueBox.classDefs = new Array();
	}

//assign the index so that this class knows where it is in the
//collection of all classes to be defined.
mainClass._defInd_ = BlueBox.classDefs.length;

//add the definition to the array of class definitions.
BlueBox.classDefs.push({def:mainDef, clss:mainClass, proto:mainProto, supr:superProto});

//increment the class index.
BlueBox.currClassInd++;
}

/**
 * in order to resolve circular imports, the main BlueBox function calls this method to redefine
 * a set of classes.
 *
 * For example, if class A, B, C and D are defined in that order, and A has to import D, then
 * A's definition, and possibly B and C's are incomplete, because they may involve the class D
 * directly or indirectly. Therefore, when class D is finally defined, A B and C must be redefined
 * in a loop, and that's what this function does.
 *
 * Obviously, its best to avoid circular imports, or to have classes which circularly import each other
 * defined close together, so that not as many functions need redefinition. In the above example, if
 * A and D really do need to import each other, then the best order is A D B C. That way, only A requires
 * redefinition. That is, unless B and C rely on A or D somehow. Then A B and C need to be redefined.
 *
 */
BlueBox.redefineClasses = function(fromInd, toInd) {

var g=0;

	//loop through and redefine the classes. this is to resolve circular imports.
	for(g=fromInd; g<toInd; g++) {
	var df = BlueBox.classDefs[g];

	    //if inheritance, then call the definition with the super prototype
		if(df.supr != undefined) {
		df.def(df.clss, df.proto, df.supr);
		}

		//else, just call the definition.
		else {
		df.def(df.clss, df.proto);
		}

	}

}



/**
 * str1 is the full qualified class name of the class to import. str2 is optional.
 * if str2 exists, then str2 is the name of the reference to the imported class.
 * else if str2 does not exist, then the reference to the imported class is by default
 * the simple name of the class specified in str1.
 *
 */
BlueBox.port = function(str1) {
var prt = BlueBox.dflt;

	try {
	var nsArr = str1.split('.');
	var l=nsArr.length;
	var j=0;
	var s = BlueBox.dflt;
	var lM1 = l-1;
	var p;
	var fin;
		for(j=0; j<l; j++) {
		p = nsArr[j];
			if(j<lM1) {
			s = s[p];
			}
		fin = p;
		prt = prt[p];
		}

	    //if the imported class is not defined yet, then
	    //give it a placeholder object until it gets defined.
	    //basically its a forward declaration, like in Objective-C.
		if(prt==undefined) {
	    var tmp2 = function(){};

		//create the empty placeholder. used eval before, but
		//now just getting the correct object in the loop above.
		s[fin] = tmp2;

		    //record the index of the class which is trying to import
		    //an as-yet-undefined class. only record it once. we'll need
		    //this information later to resolve the circular imports.
			if(tmp2._circRefInd_ == undefined) {
			tmp2._circRefInd_ = BlueBox.currClassInd;
			}

		}

	//console.log("port: "+str1);
	} catch(e) {
	throw new Error('BlueBox Error: BlueBox.port(): The class path '+str1+' is not valid.');
	}

return prt;
}

/**
 * this gets called after the page is ready for javascript excecution. clears out all the
 * cached class definitions. I don't like the idea of them hanging around.
 *
 */
BlueBox.endClasses = function() {
BlueBox.classDefs.splice(0,BlueBox.classDefs.length);
BlueBox.classDefs = [];
BlueBox.classDefs = null;
}



/***
 * Test for the barbaric anti-standard anti-developer IE browsers.
 * this came in realy handy:
 * http://stackoverflow.com/questions/81099/safe-feature-based-way-for-detecting-google-chrome-with-javascript
 *
 * much better than the older method of relying on the user agent string, although we do that in here too
 * a little bit to find out which iOS device we're in.
 */
BlueBox.detectBrowsers = function() {

//all of the class-level variables to hold information about
//what kind of environment we're working with. the last one,
//isCSSTrns, lets us know if CSS animations are available.
BlueBox.isIE6     = false;
BlueBox.isIE7     = false;
BlueBox.isIE8     = false;
BlueBox.isIE9     = false;
BlueBox.isIE10    = false;
BlueBox.isIE11    = false;
BlueBox.isMSEdge  = false;
BlueBox.isIE      = false;
BlueBox.isiOS     = false;
BlueBox.isiPad    = false;
BlueBox.isiPod    = false;
BlueBox.isiPhone  = false;
BlueBox.isFF      = false;
BlueBox.isSafari  = false;
BlueBox.isChrome  = false;
BlueBox.isOpera   = false;
BlueBox.isCSSTrns = false;
BlueBox.isVML = false;
BlueBox.initVML = false;
BlueBox.barbaric = false;

var div = document.createElement('div');
var agnt = navigator.userAgent;

//https://stackoverflow.com/questions/31511870/detecting-microsofts-edge-or-spartan-with-javascript
// Internet Explorer 6-11
var isIE6_11 = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE6_11 && !!window.StyleMedia;

	//test for firefox. then test to see if transitions are supported.
	//if(window.globalStorage) {
	if(agnt.indexOf('Firefox') != -1) {
	BlueBox.isFF = true;

		//if( 'MozTransition' in div.style || '-moz-transition' in div.style) {
		if( '-moz-animation-name' in div.style || 'MozAnimationName' in div.style) {
		BlueBox.isCSSTrns = true;
		}

	}

	//if Edge
	else
	if(isEdge) {
	this.isMSEdge = true;
	}

	//if IE 9,10,11
	else
	if(navigator.appName == "Microsoft Internet Explorer") {
	var UAString = navigator.userAgent;

		//For IE9
		if(navigator.appVersion.indexOf("MSIE 9") != -1) {
		this.isIE9 = true;
		}

		//For IE10
		else
		if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
		BlueBox.isIE10 = true;
		}

		//For IE11
		else
		if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1) {
		BlueBox.isIE11 = true;
		}

	}

	//if older IE
	else
	if(document.all && !window.opera && document.createEventObject) {
	BlueBox.isIE = true;

		//if(!window.XMLHttpRequest) {
		//BlueBox.isIE6 = true;
		//} else
		//if(document.all && window.XMLHttpRequest && !XDomainRequest && !window.opera) {
		//BlueBox.isIE7 = true;
		//} else
		//if(document.documentMode==8) {
		//BlueBox.isIE8 = true;
		//}
	//alert('##  '+typeof document.documentElement.style.opacity);

		if(window.addEventListener) {
		BlueBox.isIE9 = true;
		} else {
			if(typeof document.createElement('DIV').style.maxHeight == "undefined") {
			BlueBox.isIE6 = true;
			BlueBox.isVML = true;
			BlueBox.barbaric = true;
			} else
			if(!!(!window.addEventListener && window.XMLHttpRequest && !document.querySelectorAll)) {
			BlueBox.isIE7 = true;
			BlueBox.isVML = true;
			BlueBox.barbaric = true;
			} else
			if(!!(!window.addEventListener && document.querySelectorAll && document.documentMode == 8)) {
			BlueBox.isIE8 = true;
			BlueBox.isVML = true;
			BlueBox.barbaric = true;
			}
		}

	} else
	//test for opera. bless you, opera. look for transitions.
	if(window.opera) {
	BlueBox.isOpera = true;

		if( '-o-transition' in div.style || 'OTransition' in div.style) {
		BlueBox.isCSSTrns = true;
		}

	} else
	//test for chrome. bless you, chrome. look for transitions.
	if(window.chrome) {
	BlueBox.isChrome = true;

		if( '-webkit-transition' in div.style || 'WebkitTransition' in div.style) {
		BlueBox.isCSSTrns = true;
		}

	} else
	//test for safari, then test for iOS and transitions support, and then check to see which
	//iOS device we're working with.
	if(window.getComputedStyle && !window.opera) {
	BlueBox.isSafari = true;

		if( '-webkit-transition' in div.style || 'WebkitTransition' in div.style) {
		BlueBox.isCSSTrns = true;
		}

		try {
		BlueBox.isiOS = true;
		var evO = document.createEvent('TouchEvent');

			if(agnt.indexOf('iPhone') != -1) {
			BlueBox.isiPhone = true;
			} else
			if(agnt.indexOf('iPod') != -1) {
			BlueBox.isiPod = true;
			} else
			if(agnt.indexOf('iPad') != -1) {
			BlueBox.isiPad = true;
			}

		} catch(err) {
		BlueBox.isiOS = false;
		}

	}

div = null;
}


////////////////////////////////////////
//  fire the detectBrowsers function  //
////////////////////////////////////////
BlueBox.detectBrowsers();


/////////////////////////////////////////////////////////////////////////
//  document-is-ready function                                         //
//  thank you http://www.javascriptkit.com/dhtmltutors/domready.shtml  //
/////////////////////////////////////////////////////////////////////////

if(BlueBox.isOpera == true || BlueBox.isFF == true || BlueBox.isChrome == true) {

	BlueBox.ready = function(onReady) {
	BlueBox.endClasses();
	document.addEventListener("DOMContentLoaded", onReady, false);
	}

} else
if(BlueBox.isSafari == true) {

	BlueBox.ready = function(onReady) {
	var _timer=setInterval(function(){
		if(/loaded|complete/.test(document.readyState)){
		clearInterval(_timer);
		BlueBox.endClasses();
		onReady();
		}}, 10);
	}
} else
if(BlueBox.isIE == true) {

	BlueBox.ready = function(onReady) {

	//Define a "blank" external JavaScript tag
	document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
	var contentloadtag=document.getElementById("contentloadtag");
		contentloadtag.onreadystatechange=function(){
			if (this.readyState=="complete") {
			BlueBox.endClasses();
			onReady();
			}

		}

	}

}



/////////////
//         //
//  A P I  //
//         //
/////////////

 //color utilities. transform all permutations of hexadecimal, RGB and CSS string into each other.
 BlueBox.hexRGB = function(hx) {
  	if(hx == 0 || !hx) {
 	return {r:0, g:0, b:0};
 	}
 var o = {};
 o.r = hx >> 16 & 0xFF;
 o.g = hx >> 8 & 0xFF;
 o.b = hx & 0xFF;
 return o;
 }
 BlueBox.RGBHex= function(o) {
 return ((o.r << 16) + (o.g << 8) + (o.b));
 }
 BlueBox.hexStrng= function(hx) {
 	if(hx == 0 || !hx) {
 	return '#000000';
 	}
 var t = "#000000";
 var s = hx.toString(16);
 return t.substring(0,7 - s.length) + s;
 }
 BlueBox.strngHex= function(strng) {
 var h = strng.slice(1);
 return parseInt(h, 16);
 }
 BlueBox.RGBStrng = function(o) {
 return BlueBox.hexStrng(BlueBox.RGBHex(o));
 }
 BlueBox.strngRGB = function(strng) {
 return BlueBox.hexRGB(BlueBox.strngHex(strng));
 }

/**
 * object util. test to see whether the object is empty.
 *
 */
 if(Object.keys) {

 	BlueBox.isEmpty = function(obj) {

 		if(Object.keys(obj).length == 0) {
    	return true;
 		}
 	return false;
 	}
 } else {

 	BlueBox.isEmpty = function(obj) {

		for(var i in obj) {
		return false;
		}
	return true;
 	}
 }

/**
 * cleans whitespace off of a dom node.

 */
 /*
 BlueBox.cleanWhite = function(node) {
 var notWhtspc = /\S/;

  for (var x=0; x<node.childNodes.length; x++) {
    var childNode = node.childNodes[x];
    if ((childNode.nodeType == 3)&&(!notWhtspc.test(childNode.nodeValue))) {
    // that is, if it's a whitespace text node
    node.removeChild(node.childNodes[x]);
    x--;
    }
    if (childNode.nodeType == 1) {
    //elements can have text child nodes of their own
    BlueBox.cleanWhite(childNode);
    }
  }
}*/
//http://www.codingforums.com/showthread.php?t=29108
BlueBox.cleanWhite = function(node){
var notspace = /\S/;
    var i=0;
    var cNodes=node.childNodes;
    var t;
    //there was an IE error here. did not like the item() function.
    //while((t=cNodes.item(i++)))
    while((t=cNodes[i++]))
        switch(t.nodeType){
            case 1: // Element Node
                BlueBox.cleanWhite(t);
                break;
            case 3: // Text Node
                if(notspace.test(t.nodeValue))
                    break;
            case 8: // Comment Node (and Text Node without non-whitespace content)
                node.removeChild(t);
                i--;
        }
}

/**
 * round a number to numDec number of decimals. handy dandy.
 *
 */
 BlueBox.round = function(input, numDec) {
 var m = Math.pow(10,numDec);
 return Math.round(input*m)/m;
 }


/**
 * this is the path relative to the library from the page.
 * if the library is one level up, then this is going to be
 * "../". If the library is ensconced in http://www.somedomain/bluebox,
 * then the path will be "http://www.somedomain/"
 *
 * this is for some texture resources that come with the library.
 *
 */
BlueBox.setLibPath = function(p) {
BlueBox.libPath = p.concat('bluebox');
}


/**
 * get the url to an asset in the common folder.
 * assumes that the library path is correct.
 *
 */
BlueBox.getAssetURL = function(cm) {
return BlueBox.libPath+'/common/'+cm;
}


  //logging variables.
  BlueBox._numLogs = 0;
  BlueBox._totalLogStr = '';
  BlueBox._logLim = 300;
  BlueBox._logging = false;


	/**
	 * set up a logging window.
	 *
	 */
	BlueBox.loggingWindow = function(id, style, logLim) {
	var el = document.getElementById(id);
	BlueBox._logDiv = el;
	BlueBox._logLim = logLim;
	BlueBox._logging = true;

		if(el) {
			for(var k in style) {
			el.style[k] = style[k];
			}
		el.style.overflow = 'scroll';//'auto';
		} else {
		throw new Error('Error: BlueBox -> loggingWindow: no elemen exists for id '+id);
		}

	}

	/**
	 * log a message to the window. nothing fancy.
	 *
	 */
	BlueBox.log = function(msg) {
		if(BlueBox._logging) {
			if(BlueBox._logDiv && BlueBox._numLogs < BlueBox._logLim) {
			var l = BlueBox._numLogs+': '+msg+'<br/>';
			BlueBox._totalLogStr = BlueBox._totalLogStr.concat(l);
			BlueBox._numLogs++;
			BlueBox._logDiv.innerHTML = BlueBox._totalLogStr;
			}
		}
	}
