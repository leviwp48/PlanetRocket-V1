/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
//  The app for the home-page                                                  //
//  Author- Alex Lowe                                                          //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////

BlueBox.compose('applications.AppBase', 'applications.AppIndexPage', function(_class, _proto, _super) {

var StickyTopNav 		= BlueBox.port("ui.StickyTopNav");
var SideBarNav 			= BlueBox.port("ui.SideBarNav");
var XHR             	= BlueBox.port("ajax.XHR");
var HTMLHelper      	= BlueBox.port("util.HTMLHelper");


_class.bootstrap = function() {
	if(_class._INSTANCE_) {
	return;
	}
_class._INSTANCE_ = new _class();
_class._INSTANCE_.init();
_class._INSTANCE_.bootstrap();
}
_class.getInstance = function() {

	if(!_class._INSTANCE_) {
	throw new Error("App instance wasn't started. App.bootstrap must be called first.");
	}

return _class._INSTANCE_;
}

_proto.initModules = function() {

this.newModule('sticky-top-nav', StickyTopNav);

}

});


