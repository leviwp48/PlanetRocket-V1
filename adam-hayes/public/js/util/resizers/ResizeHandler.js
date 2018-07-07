BlueBox.compose("util.resizers.ResizeHandler", function(_class, _proto) {

	_proto._build = function(callback) {
	this._callback = callback;
	this._owner = null;

	this._prev = null;
	this._next = null;
	}

	_proto.go = function() {
	this._callback.call(this);
	}

	_proto.remove = function() {
	this._owner.removeResizeHandler(this);

	this._callback = null;
	this._owner = null;
	this._prev = null;
	this._next = null;
	}

});