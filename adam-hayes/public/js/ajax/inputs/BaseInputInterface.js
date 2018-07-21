
BlueBox.compose("ajax.inputs.BaseInputInterface", function(_class, _proto) {

var HTMLHelper = BlueBox.port("util.HTMLHelper");
var FormError  = BlueBox.port("formkit.FormError");


/**
 * build the input object with a reference to the jquery object
 *
 */


_proto._build = function(formElementJQ) {

this._jq = formElementJQ;
this._inputNode = formElementJQ.get(0);

this._error = new FormError();

}
/**
 * the default is for this to not be a submit button.
 * submit buttons subclass this class and they must return true here.
 *
 */
_proto.isSubmit = function() {
return false;
}


/**
 * get and set the values of the input.
 *
 */
_proto.getValue = function() {
return this._inputNode.value;
}
_proto.setValue = function(val) {
this._inputNode.value = val;
}

/**
 * a special setter here. this sets the value in the context of the initial request that fetches the data for the form.
 *
 */
_proto.setValueEditModeInitialRequest = function(val) {
this._inputNode.value = val;
}


/**
 * return the serialized data from this input element.
 *
 */
_proto.serialize = function() {
var inputValue = this._inputNode.value;
var serializeValue = inputValue;//(inputValue == placeholder) ? "" : inputValue;
return encodeURIComponent(this._inputNode.name) + "=" + encodeURIComponent(serializeValue);
}

// AFBaseInput.prototype.serialize = function() {
// var placeholder = this._jq.attr("placeholder");
// var inputValue = this._inputNode.value;
// var serializeValue = (inputValue == placeholder) ? "" : inputValue;
// return encodeURIComponent(this._inputNode.name) + "=" + encodeURIComponent(serializeValue);
// }

/**
 * turn error on, with the formatted error, which is always going to be in this form:
 * {"field":"somefield", "message":"nice message", "code":"error code", "severity":"really bad"};
 *
 */
_proto.errorOn = function(formattedError) {
this._jq.after(this._error.jq);
this._error.setErrorMessage(formattedError["message"]);
$(this._inputNode).addClass("formstyles-text-input-error");
}

_proto.errorOff = function() {
this._error.jq.detach();
$(this._inputNode).removeClass("formstyles-text-input-error");
}



});
