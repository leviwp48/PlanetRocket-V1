/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
//  Main Page javascript application.                                          //
//  Handles all the bells and whistles, and feeds all the different modules    //
//  lifecycle delegate calls.                                                  //
//  Author- Alex Lowe                                                          //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////

function App() {}

App.prototype = new AppBase();
App.prototype.constructor = AppBase;

App.bootstrap = function() {
	if(App._INSTANCE_) {
	return;
	}
App._INSTANCE_ = new App();
App._INSTANCE_.init();
App._INSTANCE_.bootstrap();
}
App.getInstance = function() {

	if(!App._INSTANCE_) {
	throw new Error("App instance wasn't started. App.bootstrap must be called first.");
	}

return App._INSTANCE_;
}

App.prototype.initModules = function() {

this.newModule('sticky-top-nav', StickyTopNav);

this.newModule('lightbox', LightBox);

this.newModule('sidebar-ads', SideBarAds);

this.newModule('sidebar-nav', SideBarNav);


}

