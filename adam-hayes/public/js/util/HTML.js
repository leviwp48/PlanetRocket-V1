//TODO: prefab needs all the perameters or we get a silent fail. See the involved section of the AppViewProjectReadOnly.


BlueBox.compose("util.HTMLPrefab", function(_class, _proto) {

	_proto._build = function(html) {
	this._html = html;
	this._elements = [];
	this._dynamicParamKVP = null;

	this._gatherContentsMode = false;
	this._gatherContentsForArea = null;
	this._gatherContentsKVP = null;

	this._areaKeys = null;
	}


	_proto.log = function(string) {
	console.log(string);
	return this;
	}
		

	/**
	 * adds a call-object to the prefab, which is just an object that says what function to call with what parameters
	 *
	 */
	_proto.addCall = function() {
	var fName = arguments[0];
	var hasDynamicParams = false;
	var dynamicParams = [];
	var params = [];
	var i=1;

		//loop through the arguments and see if any of them are dynamic parameters
		for(i=1; i<arguments.length; i++) {
		var arg = arguments[i];
			if(typeof arg == 'object') {
				if(arg["_dueuf74"] == 42) {
				dynamicParams.push({"index":i-1, "key":arg["key"]});
				hasDynamicParams = true;
				}
			} 
		params.push(arg);
		}

	//log everything that we need to make a call. the "area:false" means that this is NOT a placeholder for 
	//a dynamic content area.
	var callObj = {"f":fName, "has_dynamic":hasDynamicParams, "dynamic":dynamicParams, "params":params, "area":false}

		//add the dynamic-call to the specific content-area for contents that are supposed to 
		//go into a specific instance of this template
		if(this._gatherContentsMode) {
		this._gatherContentArea.push(callObj);
		} 
		//else, just add them to the main template array.
		else {
		this._elements.push(callObj);
		}

	} 


	/**
	 * these functions are called in the prefab-invoking functions in the HTML class.
	 *
	 */
	_proto.startDynamicParamCache = function() {
	this._dynamicParamKVP = {};
	}
	_proto.cacheDynamicParam = function(key, value) {
	this._dynamicParamKVP[key] = value;
	}
	_proto.endDynamicParamCache = function() {
	this._dynamicParamKVP = null;
	}

	_proto.startGatherContentsForKey = function(key) {
	this._gatherContentsMode = true;

		if(!this._gatherContentsKVP) {
		this._gatherContentsKVP = {};
		}
	var kvp = this._gatherContentsKVP;
	var areaArray = kvp[key];

		if(!areaArray) {
		areaArray = [];
		kvp[key] = areaArray;
		} 

	this._gatherContentArea = areaArray;
	}
	_proto.endGatherContentsForKey = function() {
	this._gatherContentsMode = false;
	}




	/**
	 * called when a set of prefab-invoking calls are finished.
	 *
	 */
	_proto.hydrate = function() {
	var paramsKVP = this._dynamicParamKVP;
	var els = this._elements;
	var len = els.length;
	var i=0;
	var el;
	var dynamicParams;
	var params;
	var fName;
	var html = this._html;


		for(i=0; i<len; i++) {

		//get the prefab element and the params
		el = els[i];

		//if this is just a regular template object, then do the regular jazz with the dynamic
		//params and make all of the calls on the html object
		params = el["params"];
		fName = el["f"];

			//if the element has any dynamic parameters,
			//then we're going to loop through the dynamic-prefab placeholders, get
			//the key, then grab the corresponding "live" data from the outside world
			//and replace that specific place in the array of params. 
			if(el["has_dynamic"]) {
			dynamicParams = el["dynamic"];
			var numDyn = dynamicParams.length;
			var j=0;
			var dynParam;

				for(j=0; j<numDyn; j++) {
				dynParam = dynamicParams[j];
				dynKey = dynParam["key"];
				dynIndex = dynParam["index"];

				params[dynIndex] = paramsKVP[dynKey];
				}
			}

		//now that we have the full array of params with the dynamic data included,
		//we're going to call the function.
		html[fName].apply(html, params);

		}

	}


	/**
	 * the prefabable functions.
	 *
	 */
	_proto._ = function() {
	this.addCall("_");
	return this;
	}
	_proto.div = function(handle) {
	this.addCall("div",handle);
	return this;
	}
	_proto.row = function(handle) {
	this.addCall("row",handle);
	return this;
	}
	_proto.box = function(handle) {
	this.addCall("box",handle);
	return this;
	}
	_proto.abox = function(handle) {
	this.addCall("abox",handle);
	return this;
	}
	_proto.hgroup = function(handle) {
	this.addCall("hgroup",handle);
	return this;
	}
	_proto.vgroup = function(handle) {
	this.addCall("vgroup",handle);
	return this;
	}
	_proto.vinner = function(handle) {
	this.addCall("vinner",handle);
	return this;
	}
	_proto.a = function(handle) {
	this.addCall("a",handle);
	return this;
	}
	_proto.ul = function(handle) {
	this.addCall("ul",handle);
	return this;
	}
	_proto.li = function(handle) {
	this.addCall("li",handle);
	return this;
	}
	_proto.h1 = function(handle) {
	this.addCall("h1",handle);
	return this;
	}
	_proto.h2 = function(handle) {
	this.addCall("h2",handle);
	return this;
	}
	_proto.h3 = function(handle) {
	this.addCall("h3",handle);
	return this;
	}
	_proto.img = function(handle) {
	this.addCall("img",handle);
	return this;
	}
	_proto.input = function(handle) {
	this.addCall("input",handle);
	return this;
	}
	_proto.textarea = function(handle) {
	this.addCall("textarea",handle);
	return this;
	}
	_proto.form = function(handle) {
	this.addCall("form",handle);
	return this;
	}
	_proto.attr = function(key, value) {
	this.addCall("attr",key,value);
	return this;
	}
	_proto.class = function(value) {
	this.addCall("class",value);
	return this;
	}
	_proto.style = function(key, value) {
	this.addCall("style",key,value);
	return this;
	}
	_proto.id = function(value) {
	this.addCall("id",value);
	return this;
	}
	_proto.href = function(value) {
	this.addCall("href",value);
	return this;
	}
	_proto.src = function(value) {
	this.addCall("src",value);
	return this;
	}
	_proto.html = function(html) {
	this.addCall("html",html);
	return this;
	}
	_proto.data = function(key, value) {
	this.addCall("data",key,value);
	return this;
	}
	_proto.loop = function(array, callback) {
	this.addCall("loop",array,callback);
	return this;
	}
	_proto._if = function(condition) {
	this.addCall("_if",condition);
	return this;
	} 
	_proto._elseif = function(condition) {
	this.addCall("_elseif",condition);
	return this;
	}
	_proto._else = function() {
	this.addCall("_else");
	return this;
	}
	_proto._end = function() {
	this.addCall("_end");
	return this;
	}
	_proto.context = function(callback, ctx) {
		if(!ctx) {
		ctx = false;
		}
	this.addCall("context", callback, ctx);
	return this;
	}
	_proto.prefab = function(prefabName) {
	this.addCall("prefab", prefabName);
	return this;
	}
	_proto.fparam = function(key, value) {
		if(!key || value === null) {
		throw new Error("fparam: needs both key and value");
		}
	this.addCall("fparam", key, value);
	return this;
	}

	_proto.definePrefabEnd = function() {
	this._html.definePrefabEnd();
	}
	


});




BlueBox.compose("util.HTML", function(_class, _proto) {


var HTMLPrefab = BlueBox.port("util.HTMLPrefab");


_proto._build = function() {

//the final structure that a group of api calls comes up with.
this._finalStructure = null;

//prefab defintions can't nest. you can't define a prefab and then define another
//prefab within that definition.
this._prefabs = {};

//state variables for prefab definitions
this._currentDefinitionPrefab = null;
this._currentDefinitionPrefabName = null;

//state varianles for actually useing the prefabs in markup.
this._prefabStack = [];
this._currentPrefab = null;
this._inPrefabMode = false;

//logic can next
this._logicStack = [];
this._logicalCaseCleared = true;

//parents can nest
this._parents = [];
this._currentParent = null;
this._currentType = null;
this._specialType = null;

//some of these object have pre-build classes. See the core-layout css for examples.
this._specialTypeClasses = {"row":"row", "box":"box", "h-group":"h-group", "v-group":"v-group", "v-inner":"v-inner", "abox":"abox"};

//the kvp for cached references to elements that we might want 
//when a structure is complete.
this._kvp = null;

}

_class.i = function() {

	if(!_class.INSTANCE) {
	_class.INSTANCE = new _class;
	}

return _class.INSTANCE;
}



_proto.domTree = function(nodeKind, openOrClose, handle) {

var domNode = null;

	if(openOrClose) {
	domNode = document.createElement(nodeKind);
	}

	//if the "opening tag" for the object
	if(openOrClose) {

		if(handle) {
		this._kvp[handle] = domNode;
		}

		if(this._currentParent) {
		this._currentParent.appendChild(domNode);
		} //else {
		//this._kvp = null;
		//}

		if(!this._kvp) {
		this._kvp = {};
		}

		if(this._specialType) {
		var spClass = this._specialTypeClasses[this._specialType];
		domNode.setAttribute("class",spClass);
		}


	this._currentParent = domNode;

	this._currentType = nodeKind;

	this._parents.push(this._currentParent);

	} 

	//the "closing tag" for the object
	else {

	var parents = this._parents;

	this._specialType = null;

	var lastOne = parents.pop();

		//if we're not back to the top, then the currentParent is going to be
		//the last element on the array
		if(parents.length > 0) {
		this._currentParent = parents[parents.length-1];
		} 

		//else, we're back up to the top, so do some cleanup, and
		//if we're in a situation where we're supposed to just append
		//the final output to a container, then do that.
		else {
		this._currentParent = null;
		this._parents = [];
		this._finalStructure = lastOne;

			//if there's container, then we're going to append the final object
			//to the container. The container can be either a jquery object
			//or a plain old dom-node.
			if(this._container) {

				if(this._container instanceof jQuery) {
				this._container.append($(lastOne));
				} else {
				this._container.appendChild(lastOne);
				}

			this._finalStructure = null;
			//}
			} else 
			if(this._cache) {

			this._cache.push(lastOne);

			this._finalStructure = null;
			}

		}

	}

}


/**
 * this function is called by _() and it caps off a prefab invocation.
 * when a prefab is done being invoked, this will loop through and hydrate it.
 *
 */
_proto.prefabEnd = function() {
	if(!this._logicalCaseCleared) {
	return this;
	}
	
//this must be set back to false before hydrate or else the _() 
//won't behave propery. welcome to tree-logic.
this._inPrefabMode = false;
var prefabs = this._prefabStack;
var prefabToHydrate = prefabs.pop();

prefabToHydrate.hydrate();
prefabToHydrate.endDynamicParamCache();


	if(prefabs.length > 0) {
	this._currentPrefab = prefabs[prefabs.length-1];
	} else {
	this._currentPrefab = null;
	}

return this;
}



/////////////
//         //
//  A P I  //
//         //
/////////////


/** 
 * this is how we insert params into a prefab.
 *
 */
_class.param = function(key) {
return {"_dueuf74":42, "key":key};
}



/**
 * create some dom-nodes. Some of them are wired to the core-layout document
 * Here's an example:
 * You have to wrap everything in containStart and containEnd. The container can be either a jquery object or a dom-node.
 *

	HTML.i()
	.containStart(projectContainer)

		.row()
			.attr("style","text-align:center; margin-top:10px; margin-bottom:10px;")
				.h1()
				.html(projectData["name"])
				._()
		._()

	.containEnd()

 */
_proto._ = function() {

	if(!this._logicalCaseCleared) {
	return this;
	}

this._specialType = null;

	if(this._inPrefabMode) {
	this.prefabEnd();
	} else {
	this.domTree('div', false);
	}

return this;
}
_proto.div = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}

this._specialType = null;
this.domTree('div', true, handle);
return this;
}
_proto.row = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = 'row';
this.domTree('div', true, handle);
return this;
}
_proto.box = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = 'box';
this.domTree('div', true, handle);
return this;
}
_proto.abox = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = 'abox';
this.domTree('div', true, handle);
return this;
}
_proto.hgroup = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = 'h-group';
this.domTree('div', true, handle);
return this;
}
_proto.vgroup = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = 'v-group';
this.domTree('div', true, handle);
return this;
}
_proto.vinner = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = 'v-inner';
this.domTree('div', true, handle);
return this;
}
_proto.a = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = null;
this.domTree('a', true, handle);
return this;
}
_proto.ul = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = null;
this.domTree('ul',  true, handle);
return this;
}
_proto.li = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = null;
this.domTree('li', true, handle);
return this;
}
_proto.h1 = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = null;
this.domTree('h1', true, handle);
return this;
}
_proto.h2 = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = null;
this.domTree('h2', true, handle);
return this;
}
_proto.h3 = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = null;
this.domTree('h3', true, handle);
return this;
}
_proto.img = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = null;
this.domTree('img', true, handle);
return this;
}
_proto.input = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = null;
this.domTree('input', true, handle);
return this;
}
_proto.textarea = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = null;
this.domTree('textarea', true, handle);
return this;
}
_proto.form = function(handle) {
	if(!this._logicalCaseCleared) {
	return this;
	}
this._specialType = null;
this.domTree('form', true, handle);
return this;
}



/**
 * set properties on the dom-node that we just created.
 *
 */
_proto.attr = function(key, value) {
	if(!this._logicalCaseCleared) {
	return this;
	}

this._currentParent.setAttribute(key,value);
return this;
}
_proto.class = function(value) {
	if(!this._logicalCaseCleared) {
	return this;
	}

var specialType = this._specialType;

	if(specialType) {
	var specialTypeClass = this._specialTypeClasses[specialType];
	value = specialTypeClass+' '+value;
	}

this.attr("class",value);

return this;
}
_proto.style = function(key, value) {
	if(!this._logicalCaseCleared) {
	return this;
	}

this._currentParent.style[key] = value;
return this;
}
_proto.id = function(value) {
	if(!this._logicalCaseCleared) {
	return this;
	}

this.attr("id",value);
return this;
}
_proto.href = function(value) {
	if(!this._logicalCaseCleared) {
	return this;
	}

this.attr("href",value);
return this;
}
_proto.src = function(value) {
	if(!this._logicalCaseCleared) {
	return this;
	}

this.attr("src",value);
return this;
}
_proto.html = function(html) {
	if(!this._logicalCaseCleared) {
	return this;
	}

this._currentParent.innerHTML = html;
return this;
}
_proto.data = function(key, value) {
	if(!this._logicalCaseCleared) {
	return this;
	}

$(this._currentParent).data(key, value);
return this;
}


/**
 * take a break and call some regular imperative code in a context. 
 * if you don't specify the context, it will use the current object that's
 * being generated.
 *
 */
_proto.context = function(callback, ctx) {
	if(!this._logicalCaseCleared) {
	return this;
	}
	
	if(ctx) {
	callback.call(ctx);
	} else {
	callback.call(this._currentParent);
	}
return this;
}


/**
 * perform a callback in a loop. You have to have at least one other
 * object as a parent. the one below will create 3 nice litle blue squares
 * that say 1, 2 and 3.
 *  
 *    	.row()
 *			.style("margin-top","20px")
 *			.loop(["1","2","3"], function(el,i,len) {
 *
 *				this.box()
 *					.attr("style","background:#0066CC; padding:10px; border-radius:4px; margin-left:5px;")
 *					.html(el)
 *				._();
 *
 *			})
 * 		._()
 *
 */
 _proto.loop = function(array, callback) {
	if(!this._logicalCaseCleared) {
	return this;
	}
 	
 var i=0;
 var len=array.length;

 	for(i=0; i<len; i++) {
 	callback.call(this, array[i],i,len);
 	}

 return this;
 }

 /**
 * The logic functions. Any api calls caught in a case with a false condition will simply
 * not occur. They'll have no effect. So this is how you can switch on or off sections of 
 * a prefab with parameters. One of these logic statements always has to be capped off 
 * with the _end function.
 *   

	Here's a couple of examples of this thing. In the first one we're just using the
	logic functions to regulate the html function.

	.row()
		.box()
		.attr("style","text-align:center; margin-top:10px; margin-bottom:10px;")
			._if(false)
				.html("case 1!")
			._elseif(true)
				.html("case 2!")
			._elseif(false)
				.html("case 3!")
			._else()
				.html("case 4!")
			._end()
		._()
	._()

	And in this next example, we're having a logic case wrap around a whole structure.
	They will have this effect around any of the structure and attribute functions.

	.row()
		._if(false)
			.row()
				.style("background","#FF0000")
				.html("case 1!")
			._()
		._elseif(true)
			.row()
				.style("background","#FF00FF")
				.html("case 2!")
			._()
		._elseif(false)
			.row()
				.style("background","#FFFF00")
				.html("case 3!")
			._()
		._else()
			.row()
				.style("background","#00FFFF")
				.html("case 4!")
			._()
		._end()
	._()
 
 */
_proto._if = function(condition) {
var logicStack = this._logicStack;
var parentBoolean = true;

	//grab the parent logic object and see what its boolean is.
	if(logicStack.length > 0) {
	var parentLogic = logicStack[logicStack.length-1];
	parentBoolean = parentLogic["bool"];
	}

//console.log("_if: parentBoolean: "+parentBoolean);

//here the boolean for this case. note that we're making sure that we just
//store boolean values only.
var booleanValue = condition ? true : false;

	//if the parent case is false, then this will be false.
	if(!parentBoolean) {
	booleanValue = false;
	}

//make a new logicObj and push it to the stack.
var logicObj = {"bool":booleanValue, "parent_bool":parentBoolean, "case_caught":booleanValue};
logicStack.push(logicObj);

//record this so that all of the api-calls in this case will be able to test.
this._logicalCaseCleared = booleanValue;
//console.log("this._logicalCaseCleared: "+this._logicalCaseCleared);

return this;
} 
_proto._elseif = function(condition) {

var logicStack = this._logicStack;
var currentLogic = logicStack[logicStack.length-1];
var parentBoolean = currentLogic["parent_bool"];

//here the boolean for this case. note that we're making sure that we just
//store boolean values only.
var booleanValue = condition ? true : false;

	//if the parent case is false, or a previous case in this
	//level was caught, then this local boolean will go to false.
	if(!parentBoolean) {
	booleanValue = false;
	}
	if(currentLogic["case_caught"]) {
	booleanValue = false;
	}

	//if the local boolean value is true, then we're going to flag this case as caught.
	if(booleanValue) {
	currentLogic["case_caught"] = true;
	}

//mark this so that the other api-calls can easily test.
currentLogic["bool"] = booleanValue;
this._logicalCaseCleared = booleanValue;

return this;

}
_proto._else = function() {
var logicStack = this._logicStack;
var currentLogic = logicStack[logicStack.length-1];
var parentBoolean = currentLogic["parent_bool"];

var booleanValue = parentBoolean;

	if(!parentBoolean) {
	booleanValue = false;
	}
	if(currentLogic["case_caught"]) {
	booleanValue = false;
	}


	//if an if or an elseif didn't grab this case-structure yet,
	//then we're going to grab it here if we can.
	if(booleanValue) {
	currentLogic["case_caught"] = true;
	} 

currentLogic["bool"] = booleanValue;
this._logicalCaseCleared = booleanValue;
return this;
}
_proto._end = function() {

var logicStack = this._logicStack;
logicStack.pop();

	//else it means that we're clear of the logic cases, so then
	//qe're going to just set this back to true.
	if(logicStack.length == 0) {
	this._logicalCaseCleared = true;
	}

return this;
}



/**
 * Invoke a prefab. You start it with prefab() function, 
 * bind parameters with fparam(), and then close it off with the regular _() function.
 * 
 * You can do really cool things with prefab.
 * You can invoke a prefab within a prefab definition and forward
 * a parameter to the parent prefab:
 * 

	HTML.i()
	.prefabStart("Simple")

		.row()
			.style("color","#FF0000")
			.html(HTML.param("copy"))
		._()

	.prefabEnd();


	HTML.i()
	.prefabStart("Complex")

		.row()
			._if(HTML.param("param1"))
				.row()
					.style("background","#FF0000")
					.html("prefab case 1!")
				._()
			._elseif(HTML.param("param2"))
				.row()
					.style("background","#FF00FF")
					.html("prefab case 2!")
				._()

				.prefab("Simple")
					.fparam("copy", HTML.param("copy"))
				._()

			._elseif(false)
				.row()
					.style("background","#FFFF00")
					.html("prefab case 3!")
				._()
			._else()
				.row()
					.style("background","#00FFFF")
					.html("prefab case 4!")
				._()
			._end()
		._()

	.prefabEnd();

then to invoke:

		.prefab("Complex")
			.fparam("param1", false)
			.fparam("param2", true)
			.fparam("copy", "My cool copy here.")
		._()

 */
_proto.prefab = function(prefabName) {
	if(!this._logicalCaseCleared) {
	return this;
	}

var prefab = this._prefabs[prefabName];

	if(!prefab) {
	throw new Error("prefabStart: no prefab for name: "+prefabName);
	}

this._inPrefabMode = true;

prefab.startDynamicParamCache();
this._currentPrefab = prefab;
this._prefabStack.push(prefab);

return this;
}
_proto.fparam = function(key, value) {
	if(!this._logicalCaseCleared) {
	return this;
	}
	if(!this._inPrefabMode) {
	throw new Error("fparam can only be called within a prefab structure.");
	}
	if(!key || value === null) {
	throw new Error("fparam: needs both key and value");
	}
	
this._currentPrefab.cacheDynamicParam(key, value);
return this;
}


_proto.log = function(string) {
console.log(string);
return this;
}
	


/**
 * start the definition for a prefab.
 * prefab definitions can't nest. you can't define a prefab
 * and then within that definition define a sub-prefab. they must be
 * defined separately. 
 *
 */
_proto.definePrefabStart = function(prefabName) {
	if(!prefabName) {
	throw new Error("prefabStart: missing prefabName");
	}
	if(this._prefabs[prefabName]) {
	throw new Error("prefabStart: prefab already exists: "+prefabName);
	}
this._currentDefinitionPrefabName = prefabName;
this._currentDefinitionPrefab = new HTMLPrefab(this);
return this._currentDefinitionPrefab;
}
_proto.definePrefabEnd = function() {
this._prefabs[this._currentDefinitionPrefabName] = this._currentDefinitionPrefab;
}



/**
 * get the structure, and then after you've gotten the structure you can retrieve
 * parts of it by the handles that you made.
 *
 * Note that this won't work if you're using the contain functions.
 */
_proto.out = function() {
var out = this._finalStructure;
this._finalStructure = null;
return out;
}

/**
 * After a structure has been created, you can fetch 
 * one of the objects inside by the handle.
 *
 */
_proto.retrieve = function(handle) {
	if(this._kvp) {
	return this._kvp[handle];
	}
return null;
}


/**
 * you can wrap your structures in this and it will will 
 * add all of structures to the container. The container can be either
 * a dom-node or a jQuery object. These calls can't nest.
 * 
 */
_proto.containStart = function(container) {

	if(this._container) {
	throw new Error("containStart: this call can't nest within other containStart/end pairs.");
	}

this._container = container;
return this;
}
_proto.containEnd = function() {
this._container = null;
}


/**
 * used the same as containStart, containEnd. cacheEnd returns all of the contents.
 * if multiple things were created, then return them as an array. 
 *
 */
_proto.cacheStart = function() {
this._cache = [];
return this;
}
_proto.cacheEnd = function() {
	if(this._cache.length > 1) {
	return this._cache;
	} else 
	if(this._cache.length == 1) {
	return this._cache[0];
	} else {
	return null;
	}
}
/**
 * and alternate way to end the cahce- add it to a container- either 
 * a jquery or a dom-node element.
 *
 */
_proto.cacheTo = function(container) {
var cache = this._cache;
var len = cache.length;
var i=0;

	if(container instanceof jQuery) {

		for(i=0; i<len; i++) {
		var el = cache[i];
		container.append($(el));
		}

	} else {

		for(i=0; i<len; i++) {
		var el = cache[i];
		container.appendChild(el);
		}

	}

}




});