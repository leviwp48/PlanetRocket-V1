/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
//  Main Page javascript application.                                          //
//  Handles all the bells and whistles, and feeds all the different modules    //
//  lifecycle delegate calls.                                                  //
//  Author- Alex Lowe                                                          //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////

BlueBox.compose('applications.AppBase', 'applications.AppAllProjects', function(_class, _proto, _super) {

var StickyTopNav 		= BlueBox.port("ui.StickyTopNav");
var SideBarNav 			= BlueBox.port("ui.SideBarNav");
var Table           	= BlueBox.port("formkit.table.Table");
var XHR             	= BlueBox.port("ajax.XHR");
var HTMLHelper      	= BlueBox.port("util.HTMLHelper");
var AllProjectsTable    = BlueBox.port("formkit.table.prefabs.AllProjectsTable");


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

var table1 = new AllProjectsTable('all_projects', false, null, AllProjectsTable.ALL_PROJECTS());

table1.init();

}

});


