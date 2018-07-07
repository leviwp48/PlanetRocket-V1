BlueBox.compose("ui.TreeDisplayPanel", function(_class, _proto) {

var HTMLHelper 		= BlueBox.port("util.HTMLHelper");
var EndCapButton    = BlueBox.port("formkit.EndCapButton");
var TreeDisplay     = BlueBox.port("ui.TreeDisplay");
var HTML 			= BlueBox.port("util.HTML")


	//Makes use of: vertical conservation, example 2,
	//and horizontal conservation, example 1.
	_proto._build = function(panelOwner) {
	var ctx = this;

	this._needsTreeJSON = window["needsTree"];
	this._panelOwner = panelOwner;

	var treeContainer = null;

	var el = HTML.i()
		.cacheStart()
			.vgroup()

				//the title
				.vinner()
						.box()
							.class("formstyles-repeat-stripe-light-grey")
							.style("text-align","center")
							.style("padding","10px")
							.html("<h3>Select a requirement from the collapsible options below<h3>")
						._()
				._()

				//the content
				.vinner()
					.box().style("height","100%")

						//the two main panes. the first one is the tree and the description box.
						.hgroup().style("height","100%")
							.box().style("width","60%")

								.vgroup()

									.vinner()
										.box().style("height","80px")
											.abox("description-box")
												.style("box-sizing","border-box")
												.style("width","100%")
												.style("height","80px")
												.style("padding","10px")
												.style("padding-right","20px")
												.style("overflow","hidden")
											 	.style("text-overflow","ellipsis")
											._()
										._()
	
									._()
									.vinner()
										.box().style("height","100%")

											.div("tree-container")
		 									.attr("style", "position:absolute; left:0; top:0; width:100%; height:100%; overflow-y:scroll; padding-left:10px; padding-bottom:10px; box-sizing:border-box;")
		     								._()

										._()
									._()

								._()

							._()

							//the second one is the 
							.box().style("width","40%")

								.vgroup()
								
									.vinner()
										.box("current-selections-title")
										.html("<b>Current Selections: (none)</b>")
										.style("padding-bottom","10px")
										._()
									._()
									.vinner()
										.box().style("height","100%")

												.div("current-selections-box")
												.attr("style", "position:absolute; left:0; top:0; width:100%; height:100%; overflow-y:scroll; box-sizing:border-box;")
												._()

										._()
									._()

								._()

							._()
						._()


					._()
				._()
			._()
		.cacheEnd();

	treeContainer = $(HTML.i().retrieve("tree-container"));
	this._descriptionBox = $(HTML.i().retrieve("description-box"));
	this._selectionTitle = $(HTML.i().retrieve("current-selections-title"));
	this._currentSelectionsBox = $(HTML.i().retrieve("current-selections-box"));

    this.jq = $(el);

	this._treeDisplay = new TreeDisplay(this._needsTreeJSON, this);
	treeContainer.append(this._treeDisplay.jq);


	}

	_proto.fromTree_showRolloverInfo = function(name, description) {
	var nodeMessage = "";

		if(description) {
	    nodeMessage = "<b>Requirement:</b> "+name+"<br/>"+"<b>Description:</b> "+description;
		} else {
		nodeMessage = "<b>Requirement:</b> "+name;
		}

	this._descriptionBox.html(nodeMessage);
	}

	_proto.fromTree_needAdded = function(needInfo) {
	this._panelOwner._hyperData.append(needInfo);
	}
	_proto.fromTree_needRemoved = function(needInfo) {
	this._panelOwner._hyperData.delete(needInfo);
	}



	_proto.activate = function() {
	this._treeDisplay.activate();
	var ctx = this;

	this._currentSelectionsBox.on("click", function(e){
		var targ = $(e.target);

			if(targ.data("isNeedButton")) {
			var uiObj = targ.data("instance");
			ctx._panelOwner._hyperData.deleteUI(uiObj, "lightbox-panel");
			}
		});

	}
	_proto.deactivate = function() {
	this._treeDisplay.deactivate();
	this._currentSelectionsBox.off("click");
	}



	_proto.destroy = function() {
	this._treeDisplay.destroy();
	this.jq.remove();
	this.jq = null;
	}

});