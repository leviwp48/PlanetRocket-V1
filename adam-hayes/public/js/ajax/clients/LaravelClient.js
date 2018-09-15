
/////////////////////////////////////////////////////////////
//                                                         //
//                                                         //
/////////////////////////////////////////////////////////////

BlueBox.compose(
	"ajax.clients.BaseClientInterface",  
	"ajax.clients.LaravelClient", function(_class, _proto, _super) {

	var LaravelTextInput    		   = BlueBox.port("ajax.inputs.LaravelTextInput");
	var LaravelNeedInput               = BlueBox.port("ajax.inputs.LaravelNeedInput");
	var LaravelSubmitButton            = BlueBox.port("ajax.inputs.LaravelSubmitButton");
	var LaravelImageUploadPanel        = BlueBox.port("ajax.inputs.laravel-image-upload-panel.LaravelImageUploadPanel");
	var LightBox     		           = BlueBox.port("ui.LightBox");
	var HTMLHelper                     = BlueBox.port("util.HTMLHelper");


	_proto._build = function(ajax) {
	this._imageUploadPanel = null;

	_super._build.call(this, ajax);

	this._dropZoneInstance;
	var ctx = this;

	var csrf = ajax.getServer().retrieveCSRFToken();
	var extraParams = {"_token":csrf};

		Dropzone.options.myAwesomeDropzone = { // The camelized version of the ID of the form element

		  // The configuration we've talked about above
		  //autoProcessQueue: false,
		  //uploadMultiple: true,
		  //parallelUploads: 100,
		  //maxFiles: 100,
		  params: extraParams,

		  maxFilesize: 2, //2 MB

		  // The setting up of the dropzone
		  init: function() {

		  	this.on("drop", function(file){
		  	ctx._imageUploadPanel.imageDroppedOntoZone();
		  	});

		  	this.on("complete", function(file, responseText) {
		  	//console.log(file+"  "+responseText);
		  	//console.log(file.name);
		    //console.log(file.xhr.responseText);

		  	//console.log(file);

		  	//previewElement: div.dz-preview.dz-processing.dz-image-preview.dz-success.dz-complete
		  	//console.log(file.previewElement)
		  	var base64ImageData = $(file.previewElement).children().eq(0).children().eq(0).attr("src");
		  	//console.log("base64");
		  	//console.log(base64);

		  	//<img data-dz-thumbnail="" alt="opbhsd3cw6n01.jpg" src="data:image/png;base64,iVBORw0Kdi9e3F5u... ... II=">

				 if(!ctx._imageUploadPanel) {
				 throw new Error("_imageUploadPanel is missing.");
				 }

			//coordinate with the image-upload panel for the received file.
			var serverResponse = $.parseJSON(file.xhr.responseText);

			ctx._imageUploadPanel.fileAddedToForm(file.name, serverResponse["filename"], serverResponse["correlation"], '', base64ImageData);

		  	});

		    this.on("error", function(file, responseText) {
		  	console.log(file+"  "+responseText);
		  	});

		    // // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
		    // // of the sending event because uploadMultiple is set to true.
		    // this.on("sendingmultiple", function() {
		    //   // Gets triggered when the form is actually being sent.
		    //   // Hide the success button or the complete form.
		    // });
		    // this.on("successmultiple", function(files, response) {
		    //   // Gets triggered when the files have successfully been sent.
		    //   // Redirect user or notify of success.
		    // });
		    // this.on("errormultiple", function(files, response) {
		    //   // Gets triggered when there was an error sending the files.
		    //   // Maybe show form again, and notify user of error
		    // });
		  }
		 
		}


	// this._dropZoneInstance;
	// var ctx = this;

	// 	Dropzone.options.myAwesomeDropzone = { // The camelized version of the ID of the form element

	// 	  // The configuration we've talked about above
	// 	  autoProcessQueue: false,
	// 	  uploadMultiple: true,
	// 	  parallelUploads: 100,
	// 	  maxFiles: 100,

	// 	  // The setting up of the dropzone
	// 	  init: function() {
	// 	    var myDropzone = this;
	// 	    ctx._dropZoneInstance = this;


	// 	    // First change the button to actually tell Dropzone to process the queue.
	// 	    // this.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
	// 	    //   // Make sure that the form isn't actually being sent.
	// 	    //   e.preventDefault();
	// 	    //   e.stopPropagation();
	// 	    //   myDropzone.processQueue();
	// 	    // });

	// 	    // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
	// 	    // of the sending event because uploadMultiple is set to true.
	// 	    this.on("sendingmultiple", function() {
	// 	      // Gets triggered when the form is actually being sent.
	// 	      // Hide the success button or the complete form.
	// 	    });
	// 	    this.on("successmultiple", function(files, response) {
	// 	      // Gets triggered when the files have successfully been sent.
	// 	      // Redirect user or notify of success.
	// 	    });
	// 	    this.on("errormultiple", function(files, response) {
	// 	      // Gets triggered when there was an error sending the files.
	// 	      // Maybe show form again, and notify user of error
	// 	    });
	// 	  }
		 
	// 	}


	}


	/**
	 * the fields in this setup are identified uniquely by name.
	 * 
	 */
	_proto.config = function() {
	this.configSetUniqueIdentifierForInput("name");
	}


	/**
	 * provide an input object for a given id and type of input.
	 *
	 */
	_proto.provideInputObjectWithIdAndType = function(formElementJQ, id, type) {

		if(id == 'needs') {
		return new LaravelNeedInput(formElementJQ);
		} //else


		if(id == "project_images"){
		this._imageUploadPanel = new LaravelImageUploadPanel(formElementJQ);
		return this._imageUploadPanel;
		} 

		else {
		return new LaravelTextInput(formElementJQ);
		}

	}

	/**
	 * provide the submission button
	 *
	 */
	_proto.provideSubmitButton = function(formElementJQ) {
	return new LaravelSubmitButton(formElementJQ);
	}


	/**
	 * lifecycle function. the submission was sent off. do whatever you need to here.
	 *
	 */
	_proto.submissionSent = function() {
	//console.log("ProjectClientInterface: submission was sent");
	}


	/**
	 * lifecyc;e function. the submission is about to be validated. do whatever you need to here.
	 *
	 */
	_proto.prevalidate = function() {
	//console.log("ProjectClientInterface: prevalidation");
	}


	/**
	 * lifecycle function. the form succeeded
	 *
	 */
	_proto.formSucceeded = function() {
	//console.log("ProjectClientInterface: formSucceeded. here's the data:");
	console.log(this.jsonData());
	}


	_proto.editModeFetchRecordFailedNetworkError = function(xhr, textStatus, errorThrown) {
	console.log(xhr);
	console.log(textStatus);
	console.log(errorThrown);

	//xhr, textStatus, errorThrown
	//xhr.statusText
	//this.failedWithNetworkError(xhr, textStatus, errorThrown);
	
	}
	_proto.editModeFetchRecordStart = function() {
	//the fetch started
	}


	/**
	 * The form failed with errors. Show them in a lightbox. 
	 *
	 */
	_proto.failedWithNetworkError = function(responseText, textStatus, errorThrown) {
	var responseData = $.parseJSON(responseText);

		if(!this._networkErrorLightBox) {
		this._networkErrorLightBox = new LightBox();
		}

	this._networkErrorLightBox.open();

	var networkErrorMessage = HTMLHelper.i().vgroup();

	var v1 = HTMLHelper.i().vinner();
	var v2 = HTMLHelper.i().vinner();

	var b1 = HTMLHelper.i().box();
	var b2 = HTMLHelper.i().box();
	b1.css("padding","10px");
	b2.css("padding","10px");
	b2.css("height","100%");

	v1.append(b1);
	v2.append(b2);

	var errorRow = HTMLHelper.i().row("formstyles-lightbox-error-message");
	errorRow.html("Network Error: "+responseData["message"]);

	var detailsRow = HTMLHelper.i().row();
	detailsRow.html(responseData["exception"]+' '+responseData["file"]+" "+responseData["line"]);

	b1.append(errorRow);
	b2.append(detailsRow);

	networkErrorMessage.append(v1);
	networkErrorMessage.append(v2);

	this._networkErrorLightBox.stage().append(networkErrorMessage);
	}



});