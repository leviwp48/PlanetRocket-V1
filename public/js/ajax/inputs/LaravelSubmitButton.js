
BlueBox.compose(
	"ajax.inputs.BaseInputInterface", 
    "ajax.inputs.LaravelSubmitButton", 

function(_class, _proto, _super) {

	_proto.isSubmit = function() {
	return true;
	}

	//the submit button doesn't do any serializing.
	_proto.serialize = function() {
	return "";
	}

});