///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
//  AppViewProjectReadOnly                                                       //
//  For logged-in and non-logged in users. The view for seeing and joining       //
//  a project that comes up when you click a button from the all-projects tabls  //
//  Author- Alex Lowe                                                            //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////

BlueBox.compose('applications.AppBase', 'applications.AppViewProjectReadOnly', function(_class, _proto, _super) {

var StickyTopNav 	    			= BlueBox.port("ui.StickyTopNav");
var SideBarNav 		    			= BlueBox.port("ui.SideBarNav");
var XHR                 			= BlueBox.port("ajax.XHR");
var HTMLHelper          			= BlueBox.port("util.HTMLHelper");
var HTML                			= BlueBox.port("util.HTML");
var LightBox            			= BlueBox.port("ui.LightBox");
var Ajax                			= BlueBox.port("ajax.Ajax");
var RequestJoinProject  			= BlueBox.port("ajax.clients.RequestJoinProject");
var GreedyVerticalImageContainer 	= BlueBox.port("util.resizers.GreedyVerticalImageContainer");
var VerticalGroup       			= BlueBox.port("util.resizers.VerticalGroup");



_class.bootstrap = function() {

	if(_class._INSTANCE_) {
	return;
	}
_class._INSTANCE_ = new _class();
_class._INSTANCE_.init();
_class._INSTANCE_.bootstrap();
}
_class.getInstance = function() {

	if(!_class._INSTANCE_) {
	throw new Error("App instance wasn't started. App.bootstrap must be called first.");
	}

return _class._INSTANCE_;
}

_proto.initModules = function() {

var ctx = this;

this.newModule('sticky-top-nav', StickyTopNav);

//this.newModule('sidebar-nav', SideBarNav);

this._imgDescriptionLightBox = new LightBox();

var projectData = window["project_info"];

var coverImages = projectData["cover_images"];

var didSendJoinRequest = projectData["did_send_join_request"];

var projectContainer = $('#project_container');
this._projectContainer = projectContainer;

var isLoggedIn = projectData["logged_in"];
var involvement = projectData["user_project_role"];

var rsvp = projectData["rsvp"];


/*
HTML.i()
	.definePrefabStart("image-lightbox-content")

		.vgroup()
			.vinner()
				.box()
				.style("height","100%")
				.class("ie-shiv")

					// .box()
					// .class("img-fill-vertical-greedy-wrapper")

					// 	.img()
					// 		.class("box img-fill-wxh-center")
					// 		.src(HTML.param("src"))
					// 	._()

					// ._()
					.box()
					.class("img-wrap-h-center")

						.img()
							.class("box")
							.src(HTML.param("src"))
						._()

					._()



				._()
			._()
			.vinner()
				.box()
					.style("padding","5px")
					.html(HTML.param("description"))
				._()
			._()
		._()

	.definePrefabEnd()
*/


HTML.i()
	.definePrefabStart("image-lightbox-content")
	    .div().class("row fill")
	        .row()
	        .style("height","100%")
			.class("img-wrap-h-center")

				.img()
					.class("box")
					.src(HTML.param("src"))
				._()

			._()
	        .row()
	        .style("padding", "5px")
	        .html(HTML.param("description"))
	        ._()
	    ._()
	.definePrefabEnd()
//     var e2 = $(e);

// lb.stage().append(e2);




HTML.i()
	.definePrefabStart("content-row-title-and-body")

		.row()
			._if(HTML.param("hasMarginTop"))
				.style("margin-top","20px")
			._end()
			.h2()
				.html(HTML.param("title"))
			._()
		._()
		._if(HTML.param("body"))
			.row()
				.html(HTML.param("body"))
			._()
		._end()

	.definePrefabEnd();


HTML.i()
.containStart(projectContainer)

	.row()
		.attr("style","text-align:center; margin-top:10px; margin-bottom:10px;")
			.h1()
			.html(projectData["name"])
			._()
	._()

	.row()
		.attr("style","text-align:center; margin-top:10px; margin-bottom:10px;")
			.h2()
			.html(projectData["start_time"])
			._()
	._()
	
	._if(projectData["reoccur_string"] != null)	
		.row()
		.attr("style","text-align:center; margin-top:10px; margin-bottom:10px;")
			.h2()
			.html(projectData['reoccur_string'])
			._()
	._()
	._end()


	.row("image-row")
		.style("text-align","center")
		.style("margin-top","20px")

		._if(coverImages.length > 0)
			.box()
				.abox()
				.html("(click to photos enlarge)")
					.attr("style", "top:-20px; font-size:0.8em; white-space:nowrap")
				._()
			._()
		._end()

		.loop(coverImages, function(el,i,len) {

			this.box()
				.style("height","200px")
				.box()
					.class("img-wrap-h-center")
					.img()
						.src(window["_APP_BASE"]+"/storage/project-cover-images/"+el["url"])
						.data("cover-image-data", el)
						.class("box click-for-data")
					._()
				._()

			._();

		})

	._()

	.prefab("content-row-title-and-body")
		.fparam("title","Our Project")
		.fparam("body", projectData["short_description"])
		.fparam("hasMarginTop", false)
	._()


	.prefab("content-row-title-and-body")
		.fparam("title","In Depth")
		.fparam("body", projectData["description"])
		.fparam("hasMarginTop", true)
	._()


    ._if(involvement != "owner")

		.prefab("content-row-title-and-body")
			.fparam("title","Owned By: "+projectData["owner"]["name"])
			.fparam("hasMarginTop",true)
		._()

	._else()

		.prefab("content-row-title-and-body")
			.fparam("title","Owned By You!")
			.fparam("hasMarginTop",true)
		._()
		.a()
			.href(window["_APP_BASE"]+"/user/projects")
			.class("box formstyles-button")
			.html("Click to see your other projects!")
		._()

	._end()


	.prefab("content-row-title-and-body")
		.fparam("title", "What we need:")
		.fparam("hasMarginTop",true)
	._()


	.row().style("margin-top","15px")
		.loop(projectData["needs"], function(el,i,len){


			this.hgroup().style("margin-bottom","10px")
				.box().attr("style","padding:10px; background:#F2F2F2; border:1px solid #EEEEEE; border-radius:3px; margin-top:10px; margin-right:10px; white-space:nowrap;")
					.html(el["name"])
				._()
				.box().style("width","100%")
					.row()
						.style("margin-left","20px").style("margin-top","5px")
						.html(el["user_description"])
					._()
				._()

			._()

			// this.box()
			// 	.attr("style","padding:10px; background:#F2F2F2; border:1px solid #EEEEEE; border-radius:3px; margin-top:10px; margin-right:10px;")
			// 	.html(el["name"])
			// ._();

		})
	._()


	._if(isLoggedIn)

		._if(involvement == "involved")

			.prefab("content-row-title-and-body")
				.fparam("title", "You're involved!")
				//Needs a body or we get a silent error
				//.fparam("body", "    ")
				.fparam("body", "The email for this project is: <b>"+projectData["owner"]['email']+'.</b> Use this email to coordinate with the project leader.')
				.fparam("hasMarginTop",true)
			._()

			// .prefab("content-row-title-and-body")
			// 	.fparam("title", "Project Email")
			// 	.fparam("body", projectData["owner"]['email'])
			// 	.fparam("hasMarginTop",true)
			// ._()

			.a()
				.class("box formstyles-button")
				.style("margin-top","30px")
				.href(window["_APP_BASE"]+"/user/projects")
				.html("Click to see your other projects")
			._()


		._elseif(involvement == "none")

			//if the user hasn't already sent a join request.
			//then show them the form
			._if(!didSendJoinRequest)

				.row()
					.id("user_join_request_container")

					.prefab("content-row-title-and-body")
						.fparam("title", "Join this project!")
						.fparam("body", "In the space below, introduce yourself, and select at least of the project requirements that you can contribute. Then send the request and the project owner will see if you're a good match!")
						.fparam("hasMarginTop",true)
					._()


					//We need to be able to put this stuff right in here. not really a good way to do that.
					.context(function() {

						//request_join_project_form
						var requestJoinFormContainer = $('#request_join_project_form');
						requestJoinFormContainer.detach();

						//projectContainer.append(requestJoinFormContainer);
						$(this).append(requestJoinFormContainer);
						requestJoinFormContainer.css("display", "block");

					})

				._()
					/*.prefab("content-row-title-and-body")
						.fparam("title", "RSVP!")
						.fparam("body", "Don't want to help set up? Let "+ projectData["owner"]["name"]+ " know that you would like to partake in the event!")
						.fparam("hasMarginTop",true)
					._()*/


			//else, the user DID show a join request, so
			//we're going to just show them a friendly message instead.
			._else()

				.prefab("content-row-title-and-body")
					.fparam("title", "You've requested to join this project!")
					.fparam("hasMarginTop",true)
				._()

			._end()

		._end()

	._else()

		.row()
		.style("margin-top","20px")
			.a()
				.class("box formstyles-button")
				.href(window["_APP_BASE"]+"/login")
				.html("Login or Register to join this project!")
			._()
		._()

	._end()

.containEnd();

Ajax.bootstrap();
	if(RequestJoinProject.getInstance()) {
	RequestJoinProject.getInstance().setApp(this);
	}


//retrieve the images-row
var imagesRow = $(HTML.i().retrieve("image-row"));

//add the event listener
imagesRow.on("click", ".click-for-data", function(e) {
	var projectImgData = $(e.target).data("cover-image-data");

		if(projectImgData) {
		ctx.selectProjectImage(projectImgData);
		}

	});

}


_proto.contentRowTitle = function(string, marginTop) {
	if(!marginTop) {
	marginTop = "20px";
	}

var row = HTMLHelper.i().row();
row.html("<h2>"+string+"<b2>");
row.css("margin-top",marginTop);
this._projectContainer.append(row);
}
_proto.contentRowBody = function(string) {
var row = HTMLHelper.i().row();
row.html(string);
this._projectContainer.append(row);
}




_proto.selectProjectImage = function(projectCoverImage) {

var description = projectCoverImage["description"];

	if(!description) description = "";

var imgAndDesc = HTML.i()
	.cacheStart()

		.prefab("image-lightbox-content")
			.fparam("src", window["_APP_BASE"]+"/storage/project-cover-images/"+projectCoverImage["url"])
			.fparam("description", description)
		._()

	.cacheEnd();

var lightbox = this._imgDescriptionLightBox;
lightbox.open({"height":"80%"});
lightbox.stage().append($(imgAndDesc));

var resizer = this.addResizer(new VerticalGroup($(imgAndDesc)));

	lightbox.beforeClose(function() {
	resizer.remove();
	});


	// if(BlueBox.isIE9 || BlueBox.isIE10) {
	// var resizer = new GreedyVerticalImageContainer(lightbox.stage());

	// this.addResizer(resizer);

	// 	lightbox.beforeClose(function() {
	// 	resizer.remove();
	// 	});

	// }

}




});
