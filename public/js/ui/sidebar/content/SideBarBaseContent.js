BlueBox.compose("ui.sidebar.content.SideBarBaseContent", function(_class, _proto) {


	_proto._build = function(owner) {
	this._owner = owner;
	}

	/**
	 * get the owner of this thing.
	 *
	 */
	_proto.owner = function() {
	return this._owner;
	}

	/**
	 * gets called when the screen has a new size
	 *
	 */
	_proto.resize = function(size) {}


	/**
	 * return either a jquery or dom-node from this function for the content that you want to show
	 *
	 */
	_proto.provideContent = function() {}

	/**
	 * lifecycle function. the animation-in started
	 *
	 */
	_proto.animateInStart = function() {}


	/**
	 * lifecycle function. the animation-in ended
	 *
	 */
	_proto.animateInEnd = function() {}
	
	/**
	 * lifecycle function. the animation-out started
	 *
	 */
	_proto.animateOutStart = function() {}
	

	/**
	 * lifecycle function. the animation-out ended
	 *
	 */
	_proto.animateOutEnd = function() {}


	/**
	 * lifecycle destroy.
	 *
	 */
	_proto.destroy = function() {}

});