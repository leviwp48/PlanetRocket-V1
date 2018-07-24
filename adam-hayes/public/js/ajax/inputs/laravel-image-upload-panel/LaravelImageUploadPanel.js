
//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//  Coordination with the dropzone plugin. There's a little weirdness here.             //
//  Like all plugins, they never account for cases where you have to change their       //
//  internal data and state. I need be able to tell the plugin to remove certain        //
//  files and of course the only way to do that is to loop through the elements and     //
//  hunt down the one that you need to get rid of and then manually manage the          //
//  visibility of the default message. so it's a little messy, but Dropzone.js          //
//  is just glorious otherwise.                                                         //
//  Author- Alex Lowe                                                                   //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

BlueBox.compose(
	"ajax.inputs.BaseInputInterface",
    "ajax.inputs.laravel-image-upload-panel.LaravelImageUploadPanel",

function(_class, _proto, _super) {

var ImageUploadRow   = BlueBox.port("ajax.inputs.laravel-image-upload-panel.ImageUploadRow");
var LightBox         = BlueBox.port("ui.LightBox");
var HTMLHelper       = BlueBox.port("util.HTMLHelper");


	_proto._build = function(formElementJQ) {

	_super._build.call(this, formElementJQ);

	var ctx = this;

	var panelRow = formElementJQ.parent().prev();

	this._imgDescriptionLightBox = new LightBox();

	this._panelRow = panelRow;

	this._dropZoneContainer = $("#my-awesome-dropzone");

	this._dzDefaultMessage = this._dropZoneContainer.find("[class='dz-default dz-message']");

		panelRow.on("click", ".add-edit-description", function(e){
		var imageUploadRow = $(e.target).data("upload_row");
		ctx.imageUploadRowAddEditDescription(imageUploadRow);
		});

		panelRow.on("click", ".formstyles-button-leftcap-grey", function(e) {
		var fileData = $(e.target).data("file");
		var fileToRemove = fileData["file"];
		ctx.removeFile(fileToRemove);
		//console.log(fileData);
		});

	}


	/**
	 * a files uploaded, so we have to add it to the form.
	 *
	 */
	_proto.fileAddedToForm = function(file, actualUploadFileName, correlation, description, base64ImageData,  imgURL, skipRefresh) {

	// var newImageButton = new EndCapButton2(file, true, "formstyles-x-4-white", "grey", {"end_cap_width":"40px", "padding":"8px"});
	// newImageButton.flattenEndCapWithData("isButton", true);
	// newImageButton.flattenEndCapWithData("file",{"file":file, "actual":actualUploadFileName});
	// this._panelRow.append(newImageButton.jq);

	var newImageRow = new ImageUploadRow(file, actualUploadFileName, correlation, description, base64ImageData, imgURL);

		if(this._panelRow.children().length > 0) {
		newImageRow.topBorderAndPadding();
		}

	this._panelRow.append(newImageRow.jq);

	newImageRow.addedToDOM();

		if(!skipRefresh) {
		this.refreshInput();
		}

	}


	/**
	 * the file was removed, so we have to hunt it down both on the dropzone panel as well as the
	 * other panel and then refresh the input
	 *
	 */
	_proto.removeFile = function(fileToRemove) {

	//loop through the children of the panel row and destroy the one that matches the file that we want to remove.
	this._panelRow.children().each(function() {
		var child = $(this);
		var fileData = child.data("file");
		var uploadRow = child.data("upload_row");
		var fileName = fileData["file"];

			//if the file matches the one to remove, then get rid of it.
			if(fileName == fileToRemove) {
			uploadRow.jq.remove();
			}

		});

	var dropZoneContainer = this._dropZoneContainer;
	var els = dropZoneContainer.find("[class='dz-preview dz-processing dz-image-preview dz-success dz-complete']");

		els.each(function(){

		var dzFileElement = $(this);
		var dzImage = dzFileElement.children().eq(0).children().eq(0);
		var dzImageAlt = dzImage.attr("alt");

			if(dzImageAlt == fileToRemove) {
			dzFileElement.remove();
			}

		});

		if(this._panelRow.children().length == 0) {
		var defaultMsg = this._dropZoneContainer.find("[class='dz-default dz-message']");
		defaultMsg.css("display","block");
		}

	this.refreshInput();
	}


	/**
	 * we have to do this annoying thing where we manually manage the visiblity of the
	 * darned default message for dropzone, because there's no hooks to manuually
	 *
	 */
	_proto.imageDroppedOntoZone = function(file) {
	var defaultMsg = this._dropZoneContainer.find("[class='dz-default dz-message']");
	defaultMsg.css("display","none");
	}



	/**
	 * the add/edit description button was checked so we're going to pop open a lightbox and let the user edit the description there.
	 *
	 */
	_proto.imageUploadRowAddEditDescription = function(imageUploadRow) {

	var ctx = this;
	var lightbox = this._imgDescriptionLightBox;

	//really have to make this dynamic someday.
	var vgroup = HTMLHelper.i().vgroup();
	var v1 = HTMLHelper.i().vinner();
	var v2 = HTMLHelper.i().vinner();
	v2.css("height","100%");
	var b1 = HTMLHelper.i().box();
	var b2 = HTMLHelper.i().box();
	b1.css("padding","10px");
	b2.css("padding","10px")
	b2.css("padding-top","0px");
	v1.append(b1);
	v2.append(b2);

	vgroup.append(v1);
	vgroup.append(v2);


	titleRow = HTMLHelper.i().row("formstyles-repeat-stripe-light-grey");
	titleRow.css("padding","10px");
	titleRow.css("border-radius","5px");
	titleRow.css("text-align","center");
	titleRow.html("<h3>Add or edit the description for your image<h3>");

	b1.append(titleRow);

	var form = $(document.createElement("form"));
	var textarea = $(document.createElement("textarea"));
	textarea.attr("class","row formstyles-textarea-input");
	form.append(textarea);
	form.css("height","100%");
	textarea.css("height","100%");

		if(imageUploadRow._description) {
		textarea.val(imageUploadRow._description);
		}

	b2.append(form);

		if(imageUploadRow._description) {
		textarea.val(imageUploadRow._description);
		}

	lightbox.open({"height":"60%"});
	lightbox.stage().append(vgroup);

		lightbox.beforeClose(function(){

		imageUploadRow.setDescription(textarea.val());
		ctx.refreshInput();
		});

	}



	/**
	 * refresh the input. loop through the rows, grab the data and concatenate a new json string.
	 *
	 */
	_proto.refreshInput = function() {
	var files = [];

	this._panelRow.children().each(function() {
		var child = $(this);
		var fileData = child.data("file");
		var uploadRow = child.data("upload_row");
		var description = uploadRow._description;
		var actualFileName = fileData["actual"];
		var correlation = fileData["correlation"]

		var fileObj = {"file":actualFileName, "correlation":correlation};

			if(description) {
			fileObj["description"] = description;
			}

		files.push(fileObj);
		});

	var rawDataForImages = $.stringify(files);
	this.setValue(rawDataForImages);
	}


	/**
	 * set the initial value of this input object. in this case, we
	 * have to loop through the json and create the project-cover-images.
	 *
	 */
	_proto.setValueEditModeInitialRequest = function(projectImages) {

		for(var i=0; i<projectImages.length; i++) {
		var projectImage = projectImages[i];
		var url = window["_APP_BASE"]+"/storage/project-cover-images/"+projectImage["url"];

		//this._panelRow.append(imgBox);
		var description = projectImage["description"];

			if(!description) {
			description = '';
			}

		this.fileAddedToForm(projectImage["url"], projectImage["url"], projectImage["id"], description,  null, url, true);
		//Object { id: 363, project_id: 5699, url: "363-cf6d4f3ca1de08fa1b2647a12563c8e1.jpg", created_at: "2018-03-27 19:57:13", updated_at: "2018-03-27 19:57:35", description: "Testing 1 2 3", claimed: 1 }

		}

	this.refreshInput();

	}


});
