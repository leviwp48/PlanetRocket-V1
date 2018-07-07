//This is basically the same as EndCapButton1, except that is one isn't a row, it's a box.
//The text is single-line.

BlueBox.compose("formkit.EndCapButton2", function(_class, _proto) {


var HTMLHelper = BlueBox.port("util.HTMLHelper");
var HTML = BlueBox.port("util.HTML");

/**
 * build the input object with a reference to the jquery object
 *
 */
/*
_proto._build = function(textString, leftOrRight, capInnerClass) {

var button = HTMLHelper.i().box();

var innerRow = HTMLHelper.i().row("formstyles-button-withcap"); //this.div("row formstyles-button-withcap");
var hgroup = HTMLHelper.i().hgroup(); //this.div("h-group");
innerRow.append(hgroup);

var capOuterClass = leftOrRight ? "formstyles-button-leftcap" : "formstyles-button-rightcap";

var b1 = HTMLHelper.i().box(capOuterClass);//this.div("box "+capOuterClass);
b1.css("width","50px");
b1.css("vertical-align","middle");

var plus = HTMLHelper.i().box(capInnerClass);//this.div('box '+capClass);
b1.append(plus);
plus.attr("style","position:relative; display:block; margin-left:auto; margin-right:auto;");

var b2 = HTMLHelper.i().box();
b2.css("padding","15px");
b2.css("white-space","nowrap");

hgroup.append(b1);
hgroup.append(b2);

b2.html(textString);

button.append(innerRow);
this.jq = button;
}
*/

/*
_proto._build = function(textString, leftOrRight, capInnerClass) {

var button = HTMLHelper.i().box();
button.css("padding-left","70px");
button.css("white-space","nowrap");
button.html(textString);

var innerAbsoluteWrapper = HTMLHelper.i().div("abox");
innerAbsoluteWrapper.attr("style","width:100%; height:100%;");
button.append(innerAbsoluteWrapper);


var innerRow = HTMLHelper.i().row("formstyles-button-withcap"); //this.div("row formstyles-button-withcap");
var hgroup = HTMLHelper.i().hgroup(); //this.div("h-group");
innerRow.append(hgroup);

var capOuterClass = leftOrRight ? "formstyles-button-leftcap" : "formstyles-button-rightcap";

var b1 = HTMLHelper.i().box(capOuterClass);//this.div("box "+capOuterClass);
b1.css("width","50px");
b1.css("vertical-align","middle");

var plus = HTMLHelper.i().box(capInnerClass);//this.div('box '+capClass);
b1.append(plus);
plus.attr("style","position:relative; display:block; margin-left:auto; margin-right:auto;");

var b2 = HTMLHelper.i().box();
b2.css("padding","15px");
b2.css("white-space","nowrap");

hgroup.append(b1);
hgroup.append(b2);

b2.html(textString);

innerAbsoluteWrapper.append(innerRow);
this.jq = button;
}
*/

_proto._build = function(textString, leftOrRight, capInnerClass, color, options) {

	if(!options) {
	options = {};
	}

var endCapWidth = options["end_cap_width"] || "50px";
var padding = options["padding"] || "15px";

/*
var el = HTML.i()
.cacheStart()

	.box()
		.class("formstyles-button-withcap-"+color)
		.style("padding-left","calc("+endCapWidth+" + "+padding)
		.box()
			.style("white-space","nowrap")
			.html(textString)
		._()

		.abox()
			.box()
				.class(capInnerClass)
				.attr("style","position:relative; display:block; margin-left:auto; margin-right:auto;")
			._()
		._()

	._()

.cacheEnd();

this.jq = $(el);
*/


var button = HTMLHelper.i().box("formstyles-button-withcap-"+color);

var capOuterClass = leftOrRight ? "formstyles-button-leftcap-"+color : "formstyles-button-rightcap-"+color;

var b1 = HTMLHelper.i().box(capOuterClass);
b1.css("width",endCapWidth);
b1.css("vertical-align","middle");
//eh we need this here as well. if we're not in an hgroup, then its not going to height itself automatically.
b1.css("padding",padding);  

var plus = HTMLHelper.i().box(capInnerClass);
b1.append(plus);
plus.attr("style","position:relative; display:block; margin-left:auto; margin-right:auto;");

var b2 = HTMLHelper.i().box();
b2.css("white-space","nowrap");
b2.css("padding",padding);

b2.html(textString);

button.append(b1);
button.append(b2);
this.jq = button;

this._b1 = b1;
this._plus = plus;

this._textElement = b2;

//button.css("display","table");
//button.css("min-width","100%");
//button.css("width","350px");

this.flattenEndCapWithData("instance", this);

}


_proto.flattenEndCapWithData = function(key, value) {
this._b1.data(key,value);
this._plus.data(key,value);
this.jq.data(key,value);
}



});