/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////

BlueBox.compose("util.resizers.ResizeHandler", "util.resizers.VerticalGroup", function(_class, _proto, _super) {

	_proto._build = function(container) {

	this._targetDomNode = null;
	this._setHeightOnThis = null;

	var pctChildren = [];
	var nonPctChildren = [];
	var pcts = [];
	var ctx = this;


	    container.children().each(function() {
		var child = this;
		var height = this.style["height"];

	    	if(height.indexOf("%") > -1) {
	    	pctChildren.push(child);
	    	pcts.push(height);
	    	} else {
	    	nonPctChildren.push(child);
	    	}
		});


	var callback = function() {

		//console.log("yee haw");

		var totalOffset = 0;

		//grab the total offset height
		var i=0;
		var len = nonPctChildren.length;
		var child;
			for(i=0; i<len; i++) {
			child = nonPctChildren[i];
			totalOffset += child.offsetHeight;
			}

		//now loop through and distribute that total offset height
		//from the non-percent elements among the percent elements.
		i=0;
		len = pctChildren.length;
		var correction = totalOffset/len;
		var pct;

			for(i=0; i<len; i++) {
			child = pctChildren[i];
			pct = pcts[i];
			child.style["height"] = "calc("+pct+" - "+correction+"px)";
			}

		};

	_super._build.call(this, callback);

	}

});