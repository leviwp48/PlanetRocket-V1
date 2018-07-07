/////////////////////////////////////////////////////////////////
//                                                             //
//  BaseClientInterface                                        //
//  Handles errors, messages and generates input objects       //
//  Author Alex Lowe                                           //
//                                                             //
/////////////////////////////////////////////////////////////////

BlueBox.compose("ajax.clients.BaseClientInterface", function(_class, _proto) {

/**
 * loop through and create input objects for each
 * of the elements on the form.
 *
 */
_proto._build = function(ajax) {
this._ajax = ajax;

this._idToInputsKVP = {};

this._errorsOnOrOff = {};

this._arrayOfInputObjects = [];

this._uniqueIdentifier = 'id';

this.config();

var formElements = ajax._formElements;
var i=0;
var len = formElements.length;
var uniqueIdentifier = this._uniqueIdentifier;

	for(i=0; i<len; i++) {
	var formElement = $(formElements[i]);
	var id = formElement.attr(uniqueIdentifier);
	var type = formElement.attr("type");
	var inputObject = null;

		if(type == "submit") {
		inputObject = this.provideSubmitButton(formElement);
		} else {
	    inputObject = this.provideInputObjectWithIdAndType(formElement, id, type);
		}

		//it's possible that the input object might not exist. HTML does this thing 
		//with radio-buttpn groups and checkbox-groups where each button acts as its own input,
		//when the sensible thing would be for the entire group to act as a single input. So in those
		//cases, the client is only going to provide the input-object for ONE of the buttons in the group.
		if(inputObject) {
		this._idToInputsKVP[id] = inputObject;

		this._arrayOfInputObjects.push(inputObject);
		}

	}

}


/**
 *
 */
_proto.configSetUniqueIdentifierForInput = function(identifier) {
this._uniqueIdentifier = identifier;
}


/**
 * Ajax needs this array for serialization
 * 
 */
_proto.getFormElements = function() {
return this._arrayOfInputObjects;
}


/**
 * record the data that was sent back.
 *
 */
_proto.responseSuccessfullyReceived = function(jsonData) {
this._jsonData = jsonData;
}



/**
 * the ajax has found an error for this field. we won't turn the error on twice.
 * the formattedError has the form:
 *
 * {"field":"somefield", "message":"nice message", "code":"error code", "severity":"really bad"};
 *
 * The server-interface is responsible to wrangling this format out of whatever response we're getting from
 * whatever framework we're using. 
 * 
 */
_proto.errorOnForField = function(field, formattedError) {

	//if the field is not logged here, then we're going to 
	//tutn the error on. 
	if(!this._errorsOnOrOff[field]) {
	this._errorsOnOrOff[field] = true;
	
	var inputs = this._idToInputsKVP;
	var input = inputs[field];

		if(!input) {
		throw new Error("BaseClientInterface: errorOnForField: no input for field: "+field+".");
		}

	input.errorOn(formattedError);

	}

}

_proto.errorOffForField = function(field) {

	//if the field is not logged here, then we're going to 
	//tutn the error on. 
	if(this._errorsOnOrOff[field]) {
	this._errorsOnOrOff[field] = false;
	
	var inputs = this._idToInputsKVP;
	var input = inputs[field];

		if(!input) {
		throw new Error("BaseClientInterface: errorOnForField: no input for field: "+field+".");
		}

	input.errorOff();

	}

}



/**
 * turn all of the errors off. 
 *
 */
_proto.turnAllErrorsOff = function() {
var inputs = this._idToInputsKVP;
var input = null;

	for(var field in inputs) {
	input = inputs[field];
	this._errorsOnOrOff[field] = false;

		if(!input) {
		throw new Error("BaseClientInterface: turnAllErrorsOff: no input for field: "+field+".");
		}

	input.errorOff();
	}

}


/**
 * destruction
 *
 */
_proto.destroy = function() {

var arr = this._arrayOfInputObjects;

	for(var i=0; i<arr.length; i++) {
	var input = arr[i];
	input.destroy();
	}

this._arrayOfInputObjects = [];
this._arrayOfInputObjects = null;

this._idToInputsKVP = {};
this._idToInputsKVP = null;

}

/**
 * when we get the editable record fetched from the server, we're going to 
 * loop through the inputs and throw the inputs into each of them.
 * it's up to the inputs to handle this correctly.
 *
 */
_proto.editModeFetchRecordSucceeded = function(editRecord) {
var inputs = this._idToInputsKVP;

	for(var field in editRecord) {
	var input = inputs[field];

		if(!input) {
		throw new Error("editModeFetchRecordSucceeded: no input for field: "+field);
		}

	input.setValueEditModeInitialRequest(editRecord[field]);
	}

}


/////////////
//         //
//  A P I  //
//         //
/////////////


/**
 * clear out the form of all the inputs
 *
 */
_proto.clearForm = function() {
var inputs = this._idToInputsKVP;

	for(var field in inputs) {
		//kind of sloppy to hard-code this in here but oh well
		if(field != "_token") {
		var input = inputs[field];

			if(!input.isSubmit()) {
			input.setValue("");
			}
		}
	}
}


/**
 * get a particular input
 *
 */
_proto.getInput = function(field) {
return this._idToInputsKVP[field];
}


/**
 * to get the data.
 *
 */
_proto.jsonData = function() {
return this._jsonData;
}

/**
 * get the ajax form manager
 *
 */
_proto.getAJAX = function() {
return this._ajax;
}



/////////////////////////////
//                         //
//  Overridable Delegates  //
//                         //
/////////////////////////////


/**
 * called when the interface is created. Call all of your config functions in here.
 *
 */
_proto.config = function() {
//configSetUniqueIdentifierForInput will default to 'id'

}

_proto.editModeFetchRecordFailedNetworkError = function(xhr, status, error) {
//complain here
}
_proto.editModeFetchRecordStart = function() {
//do stuff here
}


/**
 * provide an input object for a given id and type of input.
 *
 */
_proto.provideInputObjectWithIdAndType = function(formElementJQ, id, type) {
//return a new object here
}

/**
 * provide the submission button
 *
 */
_proto.provideSubmitButton = function() {
//return the submisson button here.
}


/**
 * lifecycle function. the submission was sent off. do whatever you need to here.
 *
 */
_proto.submissionSent = function() {

}


/**
 * lifecyc;e function. the submission is about to be validated. do whatever you need to here.
 *
 */
_proto.prevalidate = function() {

}


/**
 * lifecycle function. the form succeeded
 *
 */
_proto.formSucceeded = function() {

}


/**
 * The form failed with errors
 *
 */
_proto.failedWithNetworkError = function(responseText, textStatus, errorThrown) {


}




});