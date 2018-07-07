
/////////////////////////////////////////////////////////////
//                                                         //
//                                                         //
/////////////////////////////////////////////////////////////

BlueBox.compose(
	"ajax.servers.BaseServerInterface",  
	"ajax.servers.LaravelServer", function(_class, _proto, _super) {


	_proto.resetTokenFields = function() {
	//console.log("LaravelServerInterface: resetTokenFields: well we're supposed to do something here. here's the data:");
	//console.log(this.jsonData());
	}

	
	//The CSRF token comes through the metadata.
	_proto.retrieveCSRFToken = function() {
	return $('meta[name="csrf-token"]').attr('content');
	}


	// when a record is created, the server will return the new id.
	_proto.createModeRetrieveIDForSuccessfulResponse = function(data) {
	return data["created_record_id"];
	}

	// in this server culture the id is appended on the end of the url like this
	// http://mycoolproject/blah/blah/blah/42  
	// where 42 is the id. So this is easy
	_proto.editModeRetrieveRecordIDForInitialRequest = function() {
	var url = window.location.href;
	var split = url.split("/");
	var id = split[split.length-1];
	return id;
	}

	//if we're doing a post request we're just going to put together and id=42 encoded string
	_proto.editModeAddIDToPostDataForInitialRequest = function(recordID, formData) {
	var component =  encodeURIComponent("id") + "=" + encodeURIComponent(recordID);
		if(formData && formData != "") {
		formData += "&"+component;
		} else {
		formData = component;
		}
	return formData;
	}

	//the id comes last for the get url initial request
	_proto.editModeAddIDToGetURLForInitialRequest = function(recordID, getURL) {
	return (getURL.charAt(getURL.length-1) == "/") ? getURL+recordID : getURL+"/"+recordID;
	}


	//we're doing get here
	_proto.editModeInitialRequestMethod = function() {
	return "get";
	}
	
	//the server returns json kvps,
	_proto.editModeConvertInitialResponseToJSON = function(responseText) {
	return $.parseJSON(responseText);
	}


	//get the errors from the form response
	_proto.formSubmissionReturnArrayOfServerErrors = function() {
	var data = this.jsonData();
	var errors = data["errors"];
	return errors;
	}

	//if we're doing a post request we're just going to put together and id=42 encoded string
	_proto.formSubmissionAddIDToPostDataForInitialRequest = function(recordID, formData) {
	var component =  encodeURIComponent("id") + "=" + encodeURIComponent(recordID);
		if(formData && formData != "") {
		formData += "&"+component;
		} else {
		formData = component;
		}
	return formData;
	}

	//take one of the errors and turn it into a nice message.
	_proto.formSubmissionFormatErrorFromResponse = function(rawError) {
	var field = rawError["field"];
	var message = rawError["message"];
	var code = 0;
	var serverity = 0;

	return {"field":field, "message":message, "code":code, "severity":serverity};
	}



});