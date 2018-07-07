
/////////////////////////////////////////////////////////////
//                                                         //
//                                                         //
/////////////////////////////////////////////////////////////

BlueBox.compose(
	"ajax.clients.BaseClientInterface",  
	"ajax.clients.RespondJoinProject", function(_class, _proto, _super) {

	var LaravelTextInput    		   = BlueBox.port("ajax.inputs.LaravelTextInput");
	var LaravelSubmitButton            = BlueBox.port("ajax.inputs.LaravelSubmitButton");
	var CheckBoxGroup                  = BlueBox.port("ajax.inputs.CheckBoxGroup");
	var LightBox     		           = BlueBox.port("ui.LightBox");
	var HTMLHelper                     = BlueBox.port("util.HTMLHelper");

	_proto._build = function(ajax) {
	this._kvpExistingCheckBoxGroups = {};

	_super._build.call(ajax);
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

	//console.log("id: "+id+" type: "+type);

		 if(id == 'need' && type == 'checkbox') {
		 	if(!this._kvpExistingCheckBoxGroups[id]) {
		 	this._kvpExistingCheckBoxGroups[id] = true;
		 	var container = formElementJQ.parent();
		 	return new CheckBoxGroup(container);
		 	}
		 
		 return null;
		 } //else


		// if(id == "project_images"){
		// this._imageUploadPanel = new LaravelImageUploadPanel(formElementJQ);
		// return this._imageUploadPanel;
		// } 

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


	_proto.formSucceeded = function() {
	//console.log(this.jsonData());

		if(!this._formSucceededLightBox) {
		this._formSucceededLightBox = new LightBox();
		}

	var recordID = this.getAJAX().editModeGetRecordID();
	var projectName = this.getAJAX().getClient().getInput("name").getValue();

	var lightbox = this._formSucceededLightBox;
	lightbox.open();

	var vgroup = HTMLHelper.i().vgroup();

	var v1 = HTMLHelper.i().vinner();
	var v2 = HTMLHelper.i().vinner();

	var b1 = HTMLHelper.i().box();
	var b2 = HTMLHelper.i().box();
	b1.css("padding","10px");
	b2.css("padding","10px");
	b2.css("height","100%");
	b2.css("vertical-align","middle");

	v1.append(b1);
	v2.append(b2);

	var titleRow = HTMLHelper.i().row("formstyles-success-big");
	titleRow.css("text-align","center");
	titleRow.html("Success!");

	var detailsRow1 = HTMLHelper.i().row();
	detailsRow1.css("text-align","center");
	detailsRow1.html('<h2>You changed your project: "'+projectName+'"</h2>');

	var detailsRow2 = HTMLHelper.i().row();
	detailsRow2.css("text-align","center");
	detailsRow2.css("margin-top","20px");
	detailsRow2.html('<h3><span id="lightbox-continue-editing" class="formstyles-linkstyle">Continue Editing</span>, or <a href="'+window["_APP_BASE"]+'/user/projects">See all your projects</a></h3>');

	b1.append(titleRow);
	b2.append(detailsRow1);
	b2.append(detailsRow2);

	vgroup.append(v1);
	vgroup.append(v2);

	lightbox.stage().append(vgroup);

		lightbox.beforeClose(function(){
		$('#lightbox-continue-editing').off('click');
		});

		$('#lightbox-continue-editing').on('click', function(e) {
		lightbox.close();
		});

	}





});