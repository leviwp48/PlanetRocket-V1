/////////////////////////////////////////////////////////////////
//                                                             //
//  BaseServerInterface                                        //
//  Turns server responses into standard objects               //
//  Author Alex Lowe                                           //
//                                                             //
/////////////////////////////////////////////////////////////////


BlueBox.compose("ajax.servers.BaseServerInterface", function(_class, _proto) {

_proto._build = function(ajax) {
this._ajax = ajax;
this._jsonData = null;
}


/**
 * record the data that was sent back
 *
 */
_proto.responseSuccessfullyReceived = function(jsonData) {
this._jsonData = jsonData;
}


/**
 * to get the data.
 *
 */
_proto.jsonData = function() {
return this._jsonData;
}


/////////////////////////////
//                         //
//  Overridable Delegates  //
//                         //
/////////////////////////////


/**
 * framework specific. reset token fields and csrf fields
 *
 */
_proto.resetTokenFields = function() {

}

/**
 * for the loaded page, this function will have to retrieve the CSRF token from the page
 *
 */
_proto.retrieveCSRFToken = function() {

}


/**
 * when a record is created, the server will return the new id.
 *
 */
_proto.createModeRetrieveIDForSuccessfulResponse = function(data) {

}


/**
 * for an editable record, this function will have to retrieve the id for the record. 
 * typically this will in the url as a get parameter.
 *
 */
_proto.editModeRetrieveRecordIDForInitialRequest = function() {
//return "post" return "get"
}

/**
 * return "post" or "get" here for what kind of a request the server expects.
 *
 */
_proto.editModeInitialRequestMethod = function() {

}

/**
 * The editable record was retrieved from the server, so right here we're  going
 * to parse the request and return a nice json object.
 *
 */
_proto.editModeConvertInitialResponseToJSON = function(responseText) {
	
}


/**
 * before the intial request is send to the server, we need the url to have the id 
 * appended. This is for get requests
 *
 */
_proto.editModeAddIDToGetURLForInitialRequest = function(recordID, getURL) {

}

/**
 * Before the form submission is sent to the server we need it to append the id to the form data.
 * this is usually a straigntforward process. This is for post requests
 *
 */
_proto.formSubmissionAddIDToPostDataForInitialRequest = function(recordID, formData) {

}


/**
 * return an array of the server errors if any. return null if no errors
 *
 */
_proto.formSubmissionReturnArrayOfServerErrors = function() {
return null;
}



/**
 * framework specific. take one of the errors that we returned in the above function
 * and we're going to return a simple object with the field name, and the message
 *
 */
_proto.formSubmissionFormatErrorFromResponse = function(rawError) {
return {"field":"somefield", "message":"nice message", "code":"error code", "severity":"really bad"};
}




});