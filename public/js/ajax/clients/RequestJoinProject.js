
/////////////////////////////////////////////////////////////
//                                                         //
//                                                         //
/////////////////////////////////////////////////////////////

BlueBox.compose(
	"ajax.clients.BaseClientInterface",  
	"ajax.clients.RequestJoinProject", function(_class, _proto, _super) {

	var LaravelTextInput    		   = BlueBox.port("ajax.inputs.LaravelTextInput");
	var LaravelSubmitButton            = BlueBox.port("ajax.inputs.LaravelSubmitButton");
	var CheckBoxGroup                  = BlueBox.port("ajax.inputs.CheckBoxGroup");
	var LightBox     		           = BlueBox.port("ui.LightBox");
	var HTMLHelper                     = BlueBox.port("util.HTMLHelper");
	var HTML                           = BlueBox.port("util.HTML");

	_class.INST = null;

	_proto._build = function(ajax) {
	this._kvpExistingCheckBoxGroups = {};
	_class.INST = this;
	this._pageApp = null;
	_super._build.call(this, ajax);
	}


	_class.getInstance = function() {
	return _class.INST;
	}
	_proto.setApp = function(pageApp) {
	this._pageApp = pageApp;
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


		 if(id == 'needs' && type == 'checkbox') {

		 	//for a checkbox, we want to only have one returned to the client. checkboxes are weird
		 	//and they all share one name. so create one of them. The other ones will tag onto this
		 	//and then the one checkbox that the form knows about from this first case will serialize
		 	//all of the others when the form is submitted. pretty silly but that's html for you.
		 	if(!this._kvpExistingCheckBoxGroups[id]) {
		 	var container = formElementJQ.parent();
		 	var checkboxGroup = new CheckBoxGroup(container);
		 	this._kvpExistingCheckBoxGroups[id] = checkboxGroup;
		 	return checkboxGroup;
		 	} 

		 	//else, if there is already a checkbox for this group:
		 	else {
		 	var firstInGroup = this._kvpExistingCheckBoxGroups[id];
		 	var container = formElementJQ.parent();
			var siblingCheckbox = new CheckBoxGroup(container);
			firstInGroup.addSibling(siblingCheckbox);
		 	}
		 
		 return null;
		 } 

		//else
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

	$('#request_join_project_form').remove();

	$("#user_join_request_container").empty();

	HTML.i()
		.containStart($("#user_join_request_container"))
			
			.prefab("content-row-title-and-body")
				.fparam("title", "You've requested to join this project!")
				.fparam("hasMarginTop",true)
			._()

		.containEnd();

	var lb = new LightBox();
	lb.open({"height":"70%"});


	HTML.i()
		.cacheStart()
	        .vgroup()
	        	.vinner()
		        	.box().style("width","100%")
		        		.row()
		                .style("padding","15px")
		                .style("font-size","1.2em")
		                .style("font-weight","bold")
		                .style("text-align","center")
		                .style("color","white")
						.style("background","url('/images/stripe-green.png') repeat")
		               	.html("Request sent!")
		        		._()
		        	._()
	        	._()
	        	.vinner()
		        	.box()
		        	.attr("style","height:100%; width:100%;")
			        	//.abox()
			        	//.attr("style", "width:100%; height:100%;")
		        			.row()
		        			.attr("style","top:50%; transform:translateY(-50%); -ms-transform:translateY(-50%)")

		        				.row()
		        				.style("font-size","1.2em").style("text-align","center")
		        					.html("The owner of the project will see if you're a good fit!")
		        				._()

		        			._()
			        	//._()
		        	._()
	        	._()

	        ._()
		.cacheTo(lb.stage());
	}





});