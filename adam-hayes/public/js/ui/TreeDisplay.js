BlueBox.compose("ui.TreeDisplayRow", function(_class, _proto) {

var HTML = BlueBox.port("util.HTML");

	_proto._build = function(recLevel, node) {

	var colorClass = "formstyles-collapselist-color-"+recLevel;
	var ctx = this;

	this._expandMsg = null;
	this._expandMessageActive = false;
	this._radioButton = null;


	var el = HTML.i()
		.cacheStart()
			.row()
				.class("tree_display_node "+colorClass)
				.attr("style",'border-bottom:2px solid #FFFFFF; border-radius:3px; cursor:pointer;')

				.box()
					.context(function(){
					ctx._radioButton = $(this);
					$(this).data("nodeObj", ctx);
					node["_radioButton"] = ctx._radioButton;
					})
					._if(node["_isSelected"])
						.class("radio-button-for-tree-display formstyles-radio-button-small-white-selected")
					._else()
						.class("radio-button-for-tree-display formstyles-radio-button-small-white")
					._end()
				._()

				.box()
					.class("tree_display_node_text")
					.style("margin-left","10px")
					.html(node["name"])
					.context(function(){
					$(this).data("nodeObj", ctx);
					})
				._()

				.abox()
					.class("tree_display_node_text")
					.context(function() {
					ctx._expandMsg = $(this);
					$(this).data("nodeObj", ctx);
					})
					.attr("style","left:auto; right:20px; font-size:0.8em; top:10px;")
				._()

			._()
		.cacheEnd();

	this.jq = $(el);

	node["nodeObj"] = this;
	this.jq.data("nodeObj", this);
	this._nodeInfo = node;

	}

	_proto.expandMessageActive = function() {
	this._expandMessageActive = true;
	this._expandMsg.html("expand");
	}

	_proto.expandMsg = function(yesNo) {

		if(this._expandMessageActive) {
		this._expandMsg.html( yesNo ? "(expand)" : "(hide)");
		} 

	}

	// _proto.clickRadioButton = function() {
	// this._radioButton.trigger("click");
	// }
	// _proto.radioButtonOff = function() {
	// this._radioButton.attr("class","box formstyles-radio-button-small-white");
	// }
	// _proto.radioButtonOn = function() {
	// this._radioButton.attr("class","box formstyles-radio-button-small-white-selected");
	// }

});



BlueBox.compose("ui.TreeDisplay", function(_class, _proto) {

var HTMLHelper = BlueBox.port("util.HTMLHelper");
var TreeDisplayRow = BlueBox.port("ui.TreeDisplayRow");


	_proto._build = function(jsonTree, displayPanel) {

	this._displayPanel = displayPanel;

	this._treeDepth = 0;
	this.determineTreeDepth(jsonTree, 0);

	this._firstColor = 0x0066CC;
	this._lastColor = 0xFF00FF;

	this._firstRGB = BlueBox.hexRGB(this._firstColor);
	this._lastRGB = BlueBox.hexRGB(this._lastColor);

	this._recLevelColors = ['#0066CC', '#FF0066', '#00CC99'];

	this._indentNextLevel = '25px';


	var rootChildren = jsonTree["children"];

	this.jq = HTMLHelper.i().row();

		for(var i=0; i<rootChildren.length; i++) {
		var child = rootChildren[i];
		this.buildTreeNodeRecurse(child, this.jq, 0);
		}

	}


	_proto.determineTreeDepth = function(child, recLevel) {
	var children = child["children"];

		if(children) {
		recLevel++;

			if(recLevel > this._treeDepth) {
			this._treeDepth = recLevel;
			}

			for(var i=0; i<children.length; i++) {
			var newChild = children[i];
			this.determineTreeDepth(newChild, recLevel);
			}

		}

	}

	_proto.buildTreeNodeRecurse = function(child, jqContainer, recLevel) {
	//var name = child["name"];
	//var desc = child["description"];
	
	var info = this.makeNodeRow(recLevel, child);
	//info.jq.data("nodeInfo", child);
	jqContainer.append(info.jq);

	var children = child["children"];

		if(children) {

			if(children.length > 0) {
			info.expandMessageActive();
			info.expandMsg(true);
			}

		recLevel++;
		var newLevel = this.makeContainer();
		jqContainer.append(newLevel);

			for(var i=0; i<children.length; i++) {
			var newChild = children[i];
			this.buildTreeNodeRecurse(newChild, newLevel, recLevel);
			}
			
		}

	}


	_proto.makeNodeRow = function(recLevel, node) {
	var row = new TreeDisplayRow(recLevel, node);
	return row;
	}


	_proto.makeContainer = function() {
	var el = $(document.createElement("div"));
	el.attr("class","row");
	el.attr("style","height:0px; overflow:hidden; margin-left:"+this._indentNextLevel);
	el.data("isContainer",1);
	return el;
	}


	_proto.toggleExpand = function(jEl, nodeObj) {
	var data = jEl.data('animation');

	  if(data.transit == false) {

	    if(data.transit) {
	    return;
	    }

	    if(data.closed) {

	    nodeObj.expandMsg(false);

	    data.closed = false;
	    data.transit = true;

	    jEl.css('height','auto');
	    var offsetHeight =  jEl.get(0).offsetHeight+'px';
	    jEl.css('height','0px');


	      jEl.animate(
	        {'height':offsetHeight},
	        {duration:250, complete:
	          function() {
	          data.transit = false;
	          jEl.css('height','auto');
	          }
	        });

	    } else {
	    nodeObj.expandMsg(true);

	    data.closed = true;
	    data.transit = true;

	        jEl.animate(
	        {'height':'0px'},
	        {duration:250, complete:
	          function() {
	          data.transit = false;
	          }
	        });

	    }

	  }

	}

	_proto.collapsableBehaviorOff = function() {
	$('.tree_display_node').off('click.TreeDisplay_click');
	$('.tree_display_node').off('mouseover');
	$('.formstyles-radio-button-small-white').off('click');
	}


	/**
	 * A radio-button was clicked, so we're going to manage the style of the radio-button as well 
	 * as inform the outside world that a node was removed.
	 *
	 */
	_proto.toggleSelectNeed = function(radioButton, nodeObj) {
	var data = nodeObj._nodeInfo;

		if(data["_isSelected"]) {
		data["_isSelected"] = false;
		this._displayPanel.fromTree_needRemoved(data);
		} else {
		data["_isSelected"] = true;
		this._displayPanel.fromTree_needAdded(data);
		}

		// if(nodeObj["_isSelected"]) {
		// nodeObj["_isSelected"] = false;
		// this._displayPanel.fromTree_needRemoved(nodeObj._nodeInfo);
		// } else {
		// nodeObj["_isSelected"] = true;
		// this._displayPanel.fromTree_needAdded(nodeObj._nodeInfo);
		// }

	}



/////////////
//         //
//  A P I  //
//         //
/////////////


	_proto.activate = function() {
	var ctx = this;

		// $('.formstyles-radio-button-small-white, .formstyles-radio-button-small-white-selected').on('click', function(e){
		// //we need this 
		// e.stopImmediatePropagation();
		// var radioButton = $(e.target);
		// var nodeObj = radioButton.data("nodeObj");

		// console.log("IS THIS FIRING TWICE??");

		// ctx.toggleSelectNeed(radioButton, nodeObj);
		// });

		$('.radio-button-for-tree-display').on('click', function(e){
		//we need this 
		e.stopImmediatePropagation();
		var radioButton = $(e.target);
		var nodeObj = radioButton.data("nodeObj");
		ctx.toggleSelectNeed(radioButton, nodeObj);
		});


		$('.tree_display_node').on('mouseover', function(e){
		var nodeObj = $(e.target).data("nodeObj");

		 	if(nodeObj) {
		 	var nodeInfo = nodeObj._nodeInfo;
		 	ctx._displayPanel.fromTree_showRolloverInfo(nodeInfo["name"], nodeInfo["description"]);
		 	}
		});


		$('.tree_display_node_text').on('click.TreeDisplay_click', function(e) {
		$(e.target).parent().trigger("click.TreeDisplay_click");
		})



		$('.tree_display_node').on('click.TreeDisplay_click', function(e){
		var target = $(e.target);
		var nodeObj = target.data("nodeObj");

		var expandTarget = target.next();
		//var expandTarget = target.parent().next();

			if(expandTarget.length != 0 && expandTarget.data("isContainer") == 1) {
			var animationData = expandTarget.data('animation');

				if(!animationData) {
				animationData = {"transit":false, "closed":true};
				expandTarget.data('animation',animationData);
				}

			ctx.toggleExpand(expandTarget, nodeObj);

			}

		});

	}

	_proto.deactivate = function() {
	$('.radio-button-for-tree-display').off('click');
	$('.tree_display_node_text').off('click.TreeDisplay_click');
	$('.tree_display_node').off('click.TreeDisplay_click');
	$('.tree_display_node').off('mouseover');
	}


	_proto.destroy = function() {
	this.collapsableBehaviorOff();
	this.jq.remove();
	this.jq = null;
	}

});