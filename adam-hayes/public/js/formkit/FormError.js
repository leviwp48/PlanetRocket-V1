BlueBox.compose("formkit.FormError", function(_class, _proto) {

var HTMLHelper = BlueBox.port("util.HTMLHelper");

/**
 * build the input object with a reference to the jquery object
 *
 */
_proto._build = function() {

var err = HTMLHelper.i().row("formstyles-error-row");
var hgroup = HTMLHelper.i().hgroup();

var b1 = HTMLHelper.i().box("formstyles-error-message-box1");
b1.css("vertical-align","middle");
var b2 = HTMLHelper.i().box();

//we need a row because we nned this to have that nice little overlap effect
//we can't put margins on the box elements. that's the mechanics of hgroups.
var r = HTMLHelper.i().row("formstyles-error-message-box2");
b2.append(r);

var plus = HTMLHelper.i().box("formstyles-exclamation-2-white");
b1.append(plus);
//plus.attr("style","position:relative; display:block; margin-left:auto; margin-right:auto; transform:translateX(-3px) translateY(-2px);");
plus.attr("style","position:relative; display:block; margin-left:auto; margin-right:auto; transform:translateY(-2px);");


hgroup.append(b1);
hgroup.append(b2);
err.append(hgroup);

this._error = err;
this._errorMsg = r;

this.jq = this._error;

}

_proto.setErrorMessage = function(message) {
this._errorMsg.html(message);
}




});