BlueBox.compose("formkit.EndCapButton", function(_class, _proto) {

var HTMLHelper = BlueBox.port("util.HTMLHelper");

/**
 * build the input object with a reference to the jquery object
 *
 */
_proto._build = function(textString, leftOrRight, capInnerClass, color, options) {

	if(!options) {
	options = {};
	}

var endCapWidth = options["end_cap_width"] || "50px";
var padding = options["padding"] || "15px";

var button = HTMLHelper.i().row("formstyles-button-withcap-"+color); //this.div("row formstyles-button-withcap");
var hgroup = HTMLHelper.i().hgroup(); //this.div("h-group");
button.append(hgroup);

var capOuterClass = leftOrRight ? "formstyles-button-leftcap-"+color : "formstyles-button-rightcap-"+color;

var b1 = HTMLHelper.i().box(capOuterClass);//this.div("box "+capOuterClass);
b1.css("width",endCapWidth);
b1.css("vertical-align","middle");

var plus = HTMLHelper.i().box(capInnerClass);//this.div('box '+capClass);
b1.append(plus);
plus.attr("style","position:relative; display:block; margin-left:auto; margin-right:auto;");

var b2 = HTMLHelper.i().box();
b2.css("padding",padding);

hgroup.append(b1);
hgroup.append(b2);

b2.html(textString);

this._b1 = b1;
this._plus = plus;

this._textElement = b2;

this.jq = button;

this.flattenEndCapWithData("instance", this);
}


_proto.flattenEndCapWithData = function(key, value) {
this._b1.data(key,value);
this._plus.data(key,value);
this.jq.data(key,value);
}




});