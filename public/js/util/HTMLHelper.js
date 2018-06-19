BlueBox.compose("util.HTMLHelper", function(_class, _proto) {

/**
 * build the input object with a reference to the jquery object
 *
 */
_proto._build = function() {}

_class.i = function() {

	if(!_class.INSTANCE) {
	_class.INSTANCE = new _class;
	}

return _class.INSTANCE;
}



_proto.div = function(cssClass) {
var d =  $(document.createElement('div'));
	if(cssClass) {
	d.attr("class",cssClass);
	}
return d;
}
_proto.a = function(cssClass) {
var d =  $(document.createElement('a'));
	if(cssClass) {
	d.attr("class",cssClass);
	}
return d;
}
_proto.row = function(extraClass) {
var cssClass = "row";
var fullClass = extraClass ? cssClass+" "+extraClass : cssClass;
var d =  $(document.createElement('div'));
d.attr("class",fullClass);
return d;
}
_proto.box = function(extraClass) {
var cssClass = "box";
var fullClass = extraClass ? cssClass+" "+extraClass : cssClass;
var d =  $(document.createElement('div'));
d.attr("class",fullClass);
return d;}
_proto.hgroup = function(extraClass) {
var cssClass = "h-group";
var fullClass = extraClass ? cssClass+" "+extraClass : cssClass;
var d =  $(document.createElement('div'));
d.attr("class",fullClass);
return d;
}
_proto.vgroup = function(extraClass) {
var cssClass = "v-group";
var fullClass = extraClass ? cssClass+" "+extraClass : cssClass;
var d =  $(document.createElement('div'));
d.attr("class",fullClass);
return d;
}
_proto.vinner = function() {
var d =  $(document.createElement('div'));
d.attr("class","v-inner");
return d;
}


});