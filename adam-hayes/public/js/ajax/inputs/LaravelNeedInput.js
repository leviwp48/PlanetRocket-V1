BlueBox.compose(
	"ajax.inputs.BaseInputInterface",
    "ajax.inputs.LaravelNeedInput",

function(_class, _proto, _super) {

var EndCapButton 		 = BlueBox.port("formkit.EndCapButton");
var EndCapButton2 		 = BlueBox.port("formkit.EndCapButton2");
var LightBox     		 = BlueBox.port("ui.LightBox");
var TreeDisplayPanel     = BlueBox.port("ui.TreeDisplayPanel");
var HTMLHelper           = BlueBox.port("util.HTMLHelper");
var HyperZone            = BlueBox.port("util.hyperzone.HyperZone");
var HyperData            = BlueBox.port("util.hyperzone.HyperData");
var HTML                 = BlueBox.port("util.HTML");



/**
 * build the input object with a reference to the jquery object
 *
 */
_proto._build = function(formElementJQ) {
_super._build.call(this, formElementJQ);

this._needsTreeJSON = window["needsTree"];

this._selectedNeedsContainerAdded = false;

var ctx = this;

this._inputNode.value = "";

this._needsSelectorLightBox = new LightBox();

this._kvpInputAndID = {};

//again, the needs input has to obey this soecific html format: A text-input wrapped inside a row which hides it,
//and then wrapped again inside a container row.
this._container = this._jq.parent().parent();

this._defaultButton = new EndCapButton("Add a requirement for your project", true, "formstyles-plus-4-white", "blue");
this._container.append(this._defaultButton.jq);


this._defaultButton.jq.on("click", function(e){
	e.stopPropagation();
	ctx.openUpLightBoxWithNeedSelector()
});

this._selectedNeedsContainer = HTMLHelper.i().row("formstyles-selections-area");
this._selectedNeedsContainer.css("margin-top","10px");

//we have to do get this flat data thing.
this._selectedNeedsContainer.on("click", function(e){
	var targ = $(e.target);
		if(targ.data("isNeedButton")) {
		var uiObj = targ.data("instance");
		ctx._hyperData.deleteUI(uiObj, "input-panel");
		}
	});

$(this._inputNode).on("focus", function(e){
	ctx.inputFocused();
	});
$(this._inputNode).on("blur", function(e){
	ctx.inputBlurred();
	});




var ctx = this;
this._treeDisplayPanel = null;

//alert("on remove, does the tree-display hyperzone set the _isSelected of the nodeObj back to false??");


//make the hyper-data.
this._hyperData = HyperData.start([])

	.startHyperZone("lightbox-panel")
		.onZoneOn(function() {

			var lightbox = ctx._needsSelectorLightBox;
			var selectedNeedsContainer = ctx._selectedNeedsContainer;

				if(!ctx._treeDisplayPanel) {
				ctx._treeDisplayPanel = new TreeDisplayPanel(this);
				}

			lightbox.open({"height":"85%"});
			lightbox.stage().append(ctx._treeDisplayPanel.jq);
			ctx._treeDisplayPanel.activate();

				lightbox.beforeClose(function(){
				ctx._treeDisplayPanel.jq.detach();
				$(ctx._inputNode).trigger("focus");
				selectedNeedsContainer.addClass("formstyles-selections-area-focus");
				ctx._hyperData.zoneOff("lightbox-panel");
				ctx._hyperData.zoneOff("tree-display");
				});

		})
        .onZoneOff(function() {
        	ctx._treeDisplayPanel.deactivate();
        })
		.onCreate( function(dataObj) {
			var ui = new EndCapButton(dataObj["name"], true, "formstyles-x-4-white", "grey", {"end_cap_width":"40px", "padding":"8px"});
			ui.jq.css("margin","5px");
			ui.flattenEndCapWithData("isNeedButton", true);
			return ui;
		})
		.setBind(function(dataObj, uiObj) {
		uiObj.flattenEndCapWithData("data", dataObj);
		})
		.setRetrieve(function(uiObj) {
		return uiObj.jq.data("data");
		})
		.onAdd(function(dataObj, uiObj) {
		ctx._treeDisplayPanel._currentSelectionsBox.append(uiObj.jq);
		})
		.onEdit(function(dataObj, uiObj) {
			var name = dataObj["name"];
			uiObj._textElement.html(name);
		})
		.onRemove(function(dataObj, uiObj) {
			uiObj.jq.remove();
		})

	.endHyperZone()

	.startHyperZone("tree-display")
		.onZoneOn(function(){})
		.onZoneOff(function(){})
		.onCreate( function(dataObj) {
			var radioButton = dataObj["_radioButton"];
			return radioButton;
		})
		.setBind(function(dataObj, uiObj) {
		uiObj.data("data", dataObj);
		})
		.setRetrieve(function(uiObj) {
		return uiObj.data("data");
		})
		.onAdd(function(dataObj, uiObj) {
		uiObj.attr("class","box radio-button-for-tree-display formstyles-radio-button-small-white-selected");
		})
		.onEdit(function(dataObj, uiObj) {

		})
		.onRemove(function(dataObj, uiObj) {
		dataObj["_isSelected"] = false;
		uiObj.attr("class","box radio-button-for-tree-display formstyles-radio-button-small-white");
		})
	.endHyperZone()





	.startHyperZone("input-panel")
		.onZoneOn(function() {})
        .onZoneOff(function() {})
		.onCreate(function(dataObj) {
			var ui = new EndCapButton2(dataObj["name"], true, "formstyles-x-4-white", "grey", {"end_cap_width":"40px", "padding":"8px"});
			ui.jq.css("margin","5px");
			ui.flattenEndCapWithData("isNeedButton", true);
			return ui;
		})
		.setBind(function(dataObj, uiObj) {
		uiObj.flattenEndCapWithData("data", dataObj);
		})
		.setRetrieve(function(uiObj) {
		return uiObj.jq.data("data");
		})
		.onAdd(function(dataObj, uiObj) {

		var input = $(document.createElement("textarea"));
		input.attr("rows",3);
		input.addClass("box");
		input.css("border","1px solid #CCCCCC");
		input.css("padding","5px");
		input.css("background","#FFFFFF");
		input.css("width","100%");
		input.css("resize","none");
		input.attr("placeholder","Describe this requirement");

			if(dataObj["user_description"]) {
			input.val(dataObj["user_description"]);
			}

		var id = dataObj["id"];
		ctx._kvpInputAndID[id] = input;

		uiObj.jq.css("white-space","nowrap");

		var row = HTML.i().cacheStart()
			.hgroup()
				.box()
					.context(function(){
					$(this).append(uiObj.jq);
					})
				._()
				.box().style("width","100%")
					.context(function(){
					$(this).append(input);
					})
				._()
			._()
		.cacheEnd();

		var rowjq = $(row);
		rowjq.css("margin-bottom","4px");

		uiObj.jq.data("linked-hgroup", rowjq);
		uiObj.jq.data("input", input);

		ctx._selectedNeedsContainer.append(rowjq);

			if(!ctx._selectedNeedsContainerAdded) {
			ctx._selectedNeedsContainerAdded = true;
			ctx._container.append(ctx._selectedNeedsContainer);
			}
		})
		.onEdit(function(dataObj, uiObj) {
			var name = dataObj["name"];
			uiObj._textElement.html(name);
		})
		.onRemove(function(dataObj, uiObj) {
		var linkedHGroup = uiObj.jq.data("linked-hgroup");
		uiObj.jq.remove();
		linkedHGroup.remove();

		var id = dataObj["id"];
		ctx._kvpInputAndID[id] = null;

			if(ctx._selectedNeedsContainer.children().length == 0) {
			ctx._selectedNeedsContainerAdded = false;
			ctx._selectedNeedsContainer.detach();
			}

		})
	.endHyperZone()

.end();

this._hyperData.zoneOn("input-panel");

}


_proto.inputFocused = function() {

}
_proto.inputBlurred = function() {
this._selectedNeedsContainer.removeClass("formstyles-selections-area-focus");
}




/**
 * create the tree-display, open up the lightbox and guarantee that if the lightbox
 * is closed that it will destroy the tree-display properly
 *
 */
_proto.openUpLightBoxWithNeedSelector = function() {
this._hyperData.zoneOn("lightbox-panel");
this._hyperData.zoneOn("tree-display");
}

/**
 *
 *
 */
_proto.getSelectedNeedsContainer = function() {
return this._selectedNeedsContainer;
}



//https://gist.github.com/chicagoworks/754454
/**
 * return the serialized data from this input element.
 *
 */
_proto.serialize = function() {
//var inputValue = this._inputNode.value;
//var serializeValue = inputValue;

var hData = this._hyperData.getDataReadOnly();
var kvpInputAndID = this._kvpInputAndID;
var serializable = [];

	for(var i=0; i<hData.length; i++) {
	h = hData[i];
	//var d = {"id":h["id"], "name":h["name"]};
	var needID = h["id"];
	//serializable.push(needID);

	var input = kvpInputAndID[needID];
	var userDescription = input.val();
	var obj = {"id":needID, "user_description":userDescription};
	serializable.push(obj);
	}

var serializedValue = $.stringify(serializable);

//return encodeURIComponent(this._inputNode.name) + "=" + encodeURIComponent(serializeValue);
return encodeURIComponent(this._inputNode.name) + "=" + encodeURIComponent(serializedValue);
}

_proto.errorOn = function(formattedError) {
this._defaultButton.jq.after(this._error.jq);
this._error.setErrorMessage(formattedError["message"]);
//$(this._inputNode).addClass("formstyles-text-input-error");
}

_proto.errorOff = function() {
this._error.jq.detach();
//$(this._inputNode).removeClass("formstyles-text-input-error");
}




/**
 * get and set the values of the input.
 *
 */
// _proto.getValue = function() {
// return this._inputNode.value
// }
_proto.setValue = function(val) {
//take no action.
	// if(val == "") {
	// this._inputNode.value = "";
	// var ctx = this;
	// this._hyperData.empty();
	// } else {
	// this._inputNode.value = val;

	// var arr = $.parseJSON(val);
	// this._hyperData.replaceData(arr);
	// }

}


/**
 *
 *
 */
_proto.setValueEditModeInitialRequest = function(needs) {
var fullNeeds = this._needsTreeJSON;
var arrayOfIdentifiedNeeds = [];

this.helper_recurseThroughNeedsAndGetSelectedNeedRecords(fullNeeds, needs, arrayOfIdentifiedNeeds);
var i=0;
var len = arrayOfIdentifiedNeeds.length;

	//this create the ui buttons
	for(i=0; i<len; i++) {
	var needInfo = arrayOfIdentifiedNeeds[i];
	this._hyperData.append(needInfo);
	}

}


/**
 * recurse through the tree and find the needs that came from the server and put them into an array.
 *
 */
_proto.helper_recurseThroughNeedsAndGetSelectedNeedRecords = function(treeNode, needs, arrayOfIdentifiedNeeds) {
var i=0;
var need;

	for(i=0; i<needs.length; i++) {
	need = needs[i];

		//if this is one of the needs, then we're going to add it to the array
		//and remove this element from the needs so that we don't end up searching for it again.
		if(treeNode["id"] == need["id"]) {
		arrayOfIdentifiedNeeds.push(need);
		needs.splice(i,1);
		}

	}

var children = treeNode["children"];

	if(children) {
	var len = children.length;
	var child;
	i=0;

		for(i=0; i<len; i++) {
		child = children[i];
		this.helper_recurseThroughNeedsAndGetSelectedNeedRecords(child, needs, arrayOfIdentifiedNeeds);
		}

	}

}



});
