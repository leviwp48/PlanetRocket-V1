BlueBox.compose(
    "ajax.inputs.laravel-image-upload-panel.ImageUploadRow",

function(_class, _proto) {

var EndCapButton2 		 = BlueBox.port("formkit.EndCapButton2");
var HTMLHelper           = BlueBox.port("util.HTMLHelper");
var HTML                 = BlueBox.port("util.HTML");

_proto._build = function(file, actualUploadFileName, correlation, description, base64ImageData, imgURL) {

this._description = description;

var fileData = {"file":file, "actual":actualUploadFileName, "correlation":correlation};


var el = HTML.i()
.cacheStart()

	.hgroup().class("switch-to-rows")
		.box()
			.hgroup()
				//the box for the
				.box()
					//.style("border",'1px solid red')
					.context(function() {
					var fileNameWithEllipsis = (file.length > 30) ? file.substr(0,30)+'...' : file;
					var newImageButton = new EndCapButton2(fileNameWithEllipsis, true, "formstyles-x-4-white", "grey", {"end_cap_width":"40px", "padding":"8px"});
					newImageButton.flattenEndCapWithData("isButton", true);
					newImageButton.flattenEndCapWithData("file",fileData);
					newImageButton.jq.css("white-space","nowrap")
					$(this).append(newImageButton.jq);
					})
					.row()
						.class("formstyles-linkstyle add-edit-description")
						.html("Add/Edit description")
						.data("upload_row", this)
					._()
				._()
				.box().style("width","100%")

					._if(base64ImageData)

						// .img()
						// .src(base64ImageData)
						// .attr("style","height:60px; width:60px; margin-left:10px; margin-right:10px;")
						// ._()
						.box()
						.attr("style","height:60px; width:60px; margin-left:10px; margin-right:10px; background:#CCCCCC;")
							.div()
							.class("img-wrap-h-center")
								.img()
								.src(base64ImageData)
								.class("box")
								._()
							._()

						._()


					._else()

						.box()
						.attr("style","height:60px; width:60px; margin-left:10px; margin-right:10px; background:#CCCCCC;")
							.div()
							.class("img-wrap-h-center")
								.img()
								.src(imgURL)
								.class("box")
								._()
							._()

						._()

					._end()

				._()

			._()

		._()
		.box("description-box")
			.style("width","100%")
			.html(description)
		._()
	._()

.cacheEnd();

var hgroup = $(el);








/*

var h = HTMLHelper.i();

var hgroup = h.hgroup();
var box1 = h.box();
var box2 = h.box();
box2.html(description);


	box2.css("padding-left","10px");

	var boxWrapperForUI = h.box();
	boxWrapperForUI.css("white-space","nowrap");

		var buttonBox = h.box();

		var fileNameWithEllipsis = (file.length > 30) ? file.substr(0,30)+'...' : file;

		var newImageButton = new EndCapButton2(fileNameWithEllipsis, true, "formstyles-x-4-white", "grey", {"end_cap_width":"40px", "padding":"8px"});
		newImageButton.flattenEndCapWithData("isButton", true);
		newImageButton.flattenEndCapWithData("file",fileData);

		var addEditDescription = h.row("formstyles-linkstyle add-edit-description");
		addEditDescription.html("Add/Edit description");
		addEditDescription.data("upload_row", this);

		buttonBox.append(newImageButton.jq);
		buttonBox.append(addEditDescription);

	boxWrapperForUI.append(buttonBox);

		//append either the base64 data or the image
		if(base64ImageData) {
			var b64Img = $(document.createElement("img"));
			b64Img.attr("style","max-height:60px; margin-left:10px;");
			b64Img.attr("src",base64ImageData);

		boxWrapperForUI.append(b64Img);
		} else
		if(imgURL) {

		//See debug-img-fills-css-demo-2/ for details
		var img = $(document.createElement('img'));

		var imgDomNode = img.get(0);
	    var ctx = this;
		imgDomNode.onload = null;
		imgDomNode.onload = function() {ctx.imgLoaded(this);}

		img.attr("src",imgURL);
		img.attr("class", "box img-fill-h-center");

		var imgBox = HTMLHelper.i().box();
		imgBox.attr("style","height:60px;");
		imgBox.append(img);

		imgBox.css("margin-left","10px");
		boxWrapperForUI.append(imgBox);
		}

box1.append(boxWrapperForUI);

hgroup.append(box1);
hgroup.append(box2);

*/



this.jq = hgroup;
//this.descriptionBox = box2;
this.descriptionBox = $(HTML.i().retrieve("description-box"));
//this.uiBox = box1;
//this.uiBoxInnerWrapper = boxWrapperForUI;

this.jq.data("file", fileData);
this.jq.data("upload_row", this);

}


_proto.imgLoaded = function(img) {
// var offsetWidth = this.uiBoxInnerWrapper.get(0).offsetWidth+"px";
// this.uiBox.css("width",offsetWidth);
// this.descriptionBox.css("width","calc(100% - "+offsetWidth+")");
}


_proto.addedToDOM = function() {
// var offsetWidth = this.uiBoxInnerWrapper.get(0).offsetWidth+"px";
// this.uiBox.css("width",offsetWidth);
// this.descriptionBox.css("width","calc(100% - "+offsetWidth+")");
}


_proto.setDescription = function(description) {
this._description = description;
this.descriptionBox.html(description);
}


_proto.topBorderAndPadding = function() {
this.jq.css("margin-top","10px");
this.jq.css("padding-top","15px");
this.jq.css("border-top","1px solid #999999");
}




});
