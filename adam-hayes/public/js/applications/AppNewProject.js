/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
//  Main Page javascript application.                                          //
//  Handles all the bells and whistles, and feeds all the different modules    //
//  lifecycle delegate calls.                                                  //
//  Author- Alex Lowe                                                          //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////

BlueBox.compose('applications.AppBase', 'applications.AppNewProject', function(_class, _proto, _super) {

var StickyTopNav 	= BlueBox.port("ui.StickyTopNav");
var SideBarNav 		= BlueBox.port("ui.SideBarNav");
var Ajax            = BlueBox.port("ajax.Ajax");
var XHR             = BlueBox.port("ajax.XHR");

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

//this.newModule('sidebar-nav', SideBarNav);

Ajax.bootstrap();




//var logArea = $('#log_area');
	XHR.postRequest()
		.url(window["_APP_BASE"]+"/projects/upload-image-endpoint")
		//.data({"test":"fartface"})
		.addData("_token", $('meta[name="csrf-token"]').attr('content'))
		.addData("test","fartface")
		.onSuccess(function(responseText) {
			//logArea.html("success: "+responseText);
			console.log("success: "+responseText);
		})
		.onError(function(xhr, status, error) {
			//logArea.html("error: "+status);
		})
		.send();

}

});
