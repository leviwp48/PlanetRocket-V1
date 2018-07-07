
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
//  Ajax coordination for form elements.                                                                 //
//                                                                                                       //
//  The form must have a unique id for each of the input elements.                                       //
//  The form element must have two attributes:                                                           //
//                                                                                                       //
//      The name of the client interface which handles lifecycle events on the form. Errors and such     //
//      data-ajax-client-interface                                                                       //
//                                                                                                       //
//      The name of the server interface which handles the response from the server and                  //
//      smooths out any craziness that the framework throws our way.                                     //
//      data-ajax-server-interface                                                                       //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////


BlueBox.compose("ajax.Ajax", function(_class, _proto) {

var XHR = BlueBox.port("ajax.XHR");


	_class.INSTANCES = {};



	_proto._build = function(domNode) {

	this._errorsOnOrOff = {};

	var ctx = this;

	var formJQ = $(domNode);

	var formDomNode = domNode;

	var submitButton = formJQ.find("[type='submit']");

	var formElements = domNode.elements;

	var formAction = formJQ.attr("action");

	var editModeDataHookURL = formJQ.attr("data-ajax-data-hook");
	
	var editModeGlobalDataName = formJQ.attr("data-ajax-global-data-name");

	//get there's really only two
	var formMode = formJQ.attr('data-ajax-form-mode') || "create";

		if(formMode != "edit" && formMode != "create") {
		throw new Error("This form only works in create and edit mode");
		}

		if(formMode == "edit") {

			if(!editModeDataHookURL && !editModeGlobalDataName) {
			throw new Error("In edit mode, either the data-ajax-data-hook or the data-ajax-global-data-name must exist.");
			}


		}

	//the interface which will create all of the inputs and handle the different lifecycle events
	var clientInterfaceName = formJQ.attr("data-ajax-client-interface");

	//the interface which will deal with responses from the server
	var serverInterfaceName = formJQ.attr("data-ajax-server-interface");

	//we have to keep track of the errors that persist from one submission to another
	//so that we can turn off the errors that were fixed form the last submission
	this._activatedErrors = {};

		//complain if no interface
		if(!clientInterfaceName) {
		throw new Error("must have a client interface name: data-ajax-client-interface.");
		}
		if(!serverInterfaceName) {
		throw new Error("must have a client interface name: data-ajax-server-interface.");
		}

	//record these as public properties and grab the interface
	this._formJQ = formJQ;
	this._formDomNode = domNode;
	this._submitButtom = submitButton;
	this._formAction = formAction;
	this._formElements = formElements;

	this._formMode = formMode;
	this._editModeDataHookURL = editModeDataHookURL;
	this._editModeGlobalDataName = editModeGlobalDataName;
	this._editModeInitialRequestInMotion = false;
	this._createModeNewRecordID = 0;


	//the server interface handles things like the tokens and inspecting the
	//response for framework-specific things. They all have their formats and quirks
	this._serverInterface = new blue.ajax.servers[serverInterfaceName](this);

	//create the interaces. the client interface is to deal with the
	//form as it appears and acts and what messages are shown.
	this._clientInterface = new blue.ajax.clients[clientInterfaceName](this);


		//complain if no interface
		if(!this._clientInterface) {
		throw new Error("_clientInterface is null.");
		}
		if(!this._serverInterface) {
		throw new Error("_serverInterface is null.");
		}

		//if this is an editing form, and we have to fetch the data from somewhere, then we're going to fetch it right here.
		//
		if(this._formMode == "edit" && this._editModeDataHookURL) {

		this._editModeInitialRequestInMotion = true;

		//grab the interfaces
		var serverInterface = this._serverInterface;
		var clientInterface = this._clientInterface;

		//tell the client that we're about to start.
		clientInterface.editModeFetchRecordStart();

		var recordID = serverInterface.editModeRetrieveRecordIDForInitialRequest();
		this._recordID = recordID;

		//get the edit method
		var editMethod = serverInterface.editModeInitialRequestMethod();

		//make the get or post request
		var xhrRequest = editMethod == "post" ? XHR.postRequest() : XHR.getRequest();

		//get the url based on whether it's a get or post request
		var url = editMethod == "post" ? this._editModeDataHookURL : serverInterface.editModeAddIDToGetURLForInitialRequest(recordID, this._editModeDataHookURL);

		//start building the request.
		xhrRequest

			//add the url
			.url(url);

				//add the id and the token to the post data
				if(editMethod == "post") {
				xhrRequest.addData("id", recordID);
				xhrRequest.addData("_token", serverInterface.retrieveCSRFToken());
				}

			//on success we're going to convert the response to something digestible and
			//then hand it over to the client
			xhrRequest.onSuccess(function(responseText) {

				ctx._editModeInitialRequestInMotion = false;

				var dataRecord = serverInterface.editModeConvertInitialResponseToJSON(responseText);
				clientInterface.editModeFetchRecordSucceeded(dataRecord);
			})

			//on error we're going to hand the errors to the client
			.onError(function(xhr, status, error) {

				ctx._editModeInitialRequestInMotion = false;

				clientInterface.editModeFetchRecordFailedNetworkError(xhr, status, error);

			})

			//send it off
			.send();

		}


	//turn this off. we don't want these event listeners piling up
	formJQ.off("submit");

		//listen for the submission on the form node
		formJQ.on("submit", function( evt ) {
		ctx.ajaxSubmission(evt);
		});

	}


	/**
	 * aja submission. prevent the default behavior of the event.
	 * serialize the form data, coordinate with the interfaces and attach the
	 * listeners for the success and fail messages.
	 *
	 */
	_proto.ajaxSubmission = function(evt) {

		var ctx = this;

		//prevent the default behavior so that javascript will take over
		evt.preventDefault();

			//bail out if the initial request is pending.
			if(this._editModeInitialRequestInMotion) {
			return;
			}

	    //call this lifecycle function
		this._clientInterface.prevalidate();

		//serialize the form data, and while we're at it, cache a reference
		//to the form that we're in.
		var formData = this.serialize();

			//If we're in an editing scenario, then we're going to append the id to the
			//form data before it gets sent to the server.
			if(this._formMode == "edit") {
			formData = this._serverInterface.formSubmissionAddIDToPostDataForInitialRequest(this._recordID, formData);
			}

		var formAction = this._formAction;

		    //call this lifecycle function
			this._clientInterface.submissionSent();

			//perform the ajax call.
		  	$.ajax({
		    type:'POST',
		    data:formData,
		    url:formAction,

		      	success: function(e){
		      	var jsonData = $.parseJSON(e);
		        ctx.ajaxSucceeded(jsonData);
		        },
		        error: function(xhr, textStatus, errorThrown) {
		        ctx.ajaxFailedWithNetworkError(xhr, textStatus, errorThrown);
		        }

		  	});


	}



	/**
	 * Ajax succeeded. inform the interfaces, get the validation errors from the server,
	 * turn the errors on or off on the form via the client interface object. If everything
	 * went well, then we're going to call the formSucceeded function on the client object.
	 *
	 */
	_proto.ajaxSucceeded = function(jsonData) {

	this._receivedData = jsonData;


	var clientInterface = this._clientInterface;
	var serverInterface = this._serverInterface;

		//if we're in a creation situation, then coordinate with the server interface
		//to grab the newly created id from the response.
		if(this._formMode != "edit") {
		this._createModeNewRecordID = serverInterface.createModeRetrieveIDForSuccessfulResponse(jsonData);
		}

	//call these lifecycle functions on these interface objects
	clientInterface.responseSuccessfullyReceived(jsonData);

	serverInterface.responseSuccessfullyReceived(jsonData);

	//We have to do things for different frameworks. Generally there's going to be a hash to
	//guarantee the the form wasn't tampered with, or also cross-site-request-forgery protection
	//Your server interfaces will have to deal with those kinds of things in this function.
	serverInterface.resetTokenFields();

	//grab the array of errors from the response.
	var arrayOfServerErrors = serverInterface.formSubmissionReturnArrayOfServerErrors();

	var succeededWithoutErrors = true;

		if(arrayOfServerErrors) {
			if(arrayOfServerErrors.length > 0) {
			succeededWithoutErrors = false;
			}
		}

		//if there's an array of service errors, then we're going to
		//process them.
		if(!succeededWithoutErrors) {
		var i=0;
		var errorsCaughtOnThisRound = {};

			for(i=0; i<arrayOfServerErrors.length; i++) {

			//get the the formatted error from the server response.
			//the format is like this: {"field":"somefield", "message":"nice message", "code":"error code", "severity":"really bad"};
			var formattedError = serverInterface.formSubmissionFormatErrorFromResponse(arrayOfServerErrors[i]);
			var field = formattedError["field"];
			errorsCaughtOnThisRound[field] = true;

				if(!this._activatedErrors[field]) {
				this._activatedErrors[field] = true;
				clientInterface.errorOnForField(field, formattedError);
				}
			}

			//if there are activated errors that aren't in the latest set of errors that came back
			//from the server, then that means that those errors have been taken care of by the user
			//so we're going to turn them off.
			for(var field2 in this._activatedErrors) {
				if(!errorsCaughtOnThisRound[field2]) {
				this._activatedErrors = false;
				clientInterface.errorOffForField(field2);
				}
			}

		}

		//else, we have success. so we're going to turn off the errors.
		else {

		//turn off all of the errors
		clientInterface.turnAllErrorsOff(field);

		//and then the next thing is to tell the interface that the form succeeded.
		clientInterface.formSucceeded();

		}

	}


	/**
	 * the form failed with a network error. So tell the client object about that.
	 *
	 */
	_proto.ajaxFailedWithNetworkError = function(XHR, textStatus, errorThrown) {

	this._clientInterface.failedWithNetworkError(XHR.responseText, textStatus, errorThrown);

	}



	/**
	 * Some stackoverflow posts that come in handy.
	 * This is one of those things that never seems to get figured out.
	 * http://stackoverflow.com/questions/11661187/form-serialize-javascript-no-framework
	 * https://dejanstojanovic.net/javascript/2017/march/serialize-html-form-to-json-without-using-jquery/
	 * https://bl.ocks.org/Teino1978-Corp/8a6a3900e32e76f87d5b6f727940eb06
	 *
	 */
	_proto.serialize = function() {
	var clientInterface = this._clientInterface;
	var formElements = clientInterface.getFormElements();
	var arr = [];

		for(var i=0; i<formElements.length; i++) {
		var obj = formElements[i];
		var ser = obj.serialize();
		arr.push(ser);
		}

	return arr.join("&");
	}



/////////////
//         //
//  A P I  //
//         //
/////////////



	/**
	 * Tnit all of the ajax forms on the page. You can call this function when your page starts up. You can also
	 * call this any time your page mutates and you need to create another form. Doesn't handle memory-management
	 * yet, so if you destroy your form html this won't manage all the shit that goes with it. That's for
	 * another day.
	 *
	 */
	_class.bootstrap = function() {

		//create all of the instances of the ajax objects
		$( "form.ajax" ).each(function(index, node){
		var id = node.getAttribute('id');

			if(!_class.INSTANCES[id]) {

			var ajax = new _class(node);

			_class.INSTANCES[id] = ajax;
			}

		});

	}


	/**
	 * in edit mode, this will retrieve the ID of the record that's beng edited.
	 *
	 */
	_proto.editModeGetRecordID = function() {
	return this._recordID;
	}

	/**
	 * get the newly created record id.
	 *
	 */
	_proto.createModeGetNewRecordID = function() {
	return this._createModeNewRecordID
	}



	/**
	 * get the client and the server.
	 *
	 */
	_proto.getClient = function() {
	return this._clientInterface;
	}
	_proto.getServer = function() {
	return this._serverInterface;;
	}



	/**
	 * create an ajax form directly from a dom node.
	 *
	 */
	_class.initDirectlyWithDomNode = function(domNode) {
	var id = domNode.getAttribute('id');

		if(!_class.INSTANCES[id]) {

		var ajax = new _class(domNode);

		_class.INSTANCES[id] = ajax;
		}
	}




	/**
	 * destroy
	 *
	 */
	_proto.destroy = function() {

	this._clientInterface.destroy();
	this._clientInterface = null;

	this._serverInterface.destroy();
	this._serverInterface = null;

	}



});
