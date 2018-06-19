/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
//  There's a particularly terrible case in IE9 and IE10 where a nice "greedy"     //
//  vertical conserved element will be useless for placing an image-fill.          //
//  In order for that to work, we need this resizer to read the offsetHeight of    //
//  the container and then set the height manually.                                //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////

BlueBox.compose("util.resizers.ResizeHandler", "util.resizers.GreedyVerticalImageContainer", function(_class, _proto, _super) {

	_proto._build = function(container) {

	this._targetDomNode = null;
	this._setHeightOnThis = null;

	var callback = function() {
		var targetDomNode = this._targetDomNode;

			if(!targetDomNode) {
			var target =  container.find("[class*='ie-shiv']");
			targetDomNode = target.length > 0 ? target.get(0) : null;
			this._targetDomNode = targetDomNode;
			}

			if(targetDomNode) {
			var setHeightOnThis = this._setHeightOnThis;

				if(!setHeightOnThis) {
				setHeightOnThis = $(targetDomNode).children().eq(0);
				this._setHeightOnThis = setHeightOnThis;
				}

			setHeightOnThis.css("height", targetDomNode.offsetHeight);
			}

		};

	_super._build.call(this, callback);


	}

});