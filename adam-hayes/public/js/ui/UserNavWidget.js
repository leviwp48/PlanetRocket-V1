///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////

BlueBox.compose('ui.UserNavWidget', function(_class, _proto) {

var XHR             = BlueBox.port("ajax.XHR");
var HTML            = BlueBox.port("util.HTML");
var LightBox        = BlueBox.port("ui.LightBox");

	_proto._build = function(isLoggedIn, app) {

	var ctx = this;

	this._app = app;

	this._dropDownContainer = $('#user-widget-dropdown-container');
	this._sideNavContainer = $('#side-nav-notifications-container');

	this._userNavWidget  = $('#user-nav-widget');
	this._userNavWidgetNameContainer = $('#user-nav-widget-name-container');
	this._hamburgerIcon  = $('#hamburger_menu_icon');

	var initialNotificationsArray = null;

		if(window["user"] && isLoggedIn) {
		notificationString = window['user']['notifications'];
			if(notificationString) {
				if(notificationString.trim() != "") {
				initialNotificationsArray  = $.parseJSON(notificationString);
				}
			}
		}


	this._removedNotificationUID = {};

	this._takeActionKVP = {
	"join_request_incoming":true,
	"join_request_outgoing":false,
	"request_to_join_rejected_with_message":true,
	"request_to_join_accepted":true
	};

	this._currentBadgeCount = 0;

	this._dropDownContainer.on("click", ".click-to-remove", function() {
		var uid = $(this).data("uid");
			if(uid) {
			ctx.removeNotification($(this), uid);
			}
		});
	this._sideNavContainer.on("click", ".click-to-remove", function() {
		var uid = $(this).data("uid");
			if(uid) {
			ctx.removeNotification($(this), uid);
			}
		});
	this._dropDownContainer.on("click", ".click-to-take-action", function() {
		var uid = $(this).data("uid");
			if(uid) {
			ctx.takeAction($(this));
			}
		});
	this._sideNavContainer.on("click", ".click-to-take-action", function() {
		var uid = $(this).data("uid");
			if(uid) {
			ctx.takeAction($(this));
			}
		});

	//define a message prefabrication
	HTML.i()
		.definePrefabStart("drop-down-notification")
			.li().style('cursor','pointer')

				._if(HTML.param("take-action-on-click"))
					.class("row dropdown-nav-menu-item click-to-take-action")
				._else()
					.class("row dropdown-nav-menu-item click-to-remove")
				._end()

				.style("max-width","300px")
				.data("uid", HTML.param("uid"))
				.data("notification", HTML.param("notification"))
				.abox().class("left-decorator")
				._()
				.row()
					.attr("style","white-space:nowrap; height:0px; overflow:hidden; padding-left:20px;")
					.html(HTML.param("notification_text"))
				._()

				._if(HTML.param("take-action-on-click"))

					.row()
						.attr("style","white-space:normal; text-transform:none; font-size:0.9em; color:#444444;")
						.html(HTML.param("notification_text"))
					._()

				._else()

					.row()
						.attr("style","white-space:normal; text-transform:none; font-size:0.9em; color:#444444; padding-left:20px;")
						.html(HTML.param("notification_text"))
						.abox()
							.class("formstyles-x-5-grey")
							.style("top","3px")
						._()
					._()

				._end()

			._()
		.definePrefabEnd();


	HTML.i()
		.definePrefabStart("side-bar-notification")
			.li()
				.data("uid", HTML.param("uid"))
				.data("notification", HTML.param("notification"))
				.class("row")
				.row()

					._if(HTML.param("take-action-on-click"))
						.class("styled_sidebar_item click-to-take-action")
					._else()
						.class("styled_sidebar_item click-to-remove")
					._end()

					.style("font-size","1em")
					.style("padding","15px")
					.html(HTML.param("notification_text"))
				._()
			._()
		.definePrefabEnd();



	HTML.i()
		.definePrefabStart("red-badge")

			.abox()
				.attr("style","border-radius:50%; text-align:center; background:#e2184e; color:#FFFFFF; font-weight:bold; padding:2.5px; min-width:25px")
				.style("transform","translateX(-50%) translateY(-50%)")

					._if(HTML.param("for-top-nav"))
						.style("top","-8px")
						.style("left","-8px")
					._end()

				.html(HTML.param("badgeCount"))
			._()

		.definePrefabEnd();


//message, uid, pName, senderName, granted

	HTML.i()
		.definePrefabStart("join-request-response")
	        .vgroup()
		        .vinner()
		        	.box().style("width","100%")
		        		.row()
		                .style("padding","15px")
		                .style("font-size","1.2em")
		                .style("font-weight","bold")
		                .style("text-align","center")

		                	._if(HTML.param("granted"))
		                	.style("color","white")
		                	.style("background","url('"+window["_APP_BASE"]+"/images/stripe-green.png') repeat")
		                	._else()
		                	.style("background","url('"+window["_APP_BASE"]+"/images/stripe-light-grey.png') repeat")
		                	._end()

		               	.html(HTML.param("title"))
		        		._()
		        	._()
		        ._()
		        .vinner()
		        	.box()
		        	.attr("style","height:100%; width:100%;")
		        		//.abox()
	                	//.attr("style","width:100%; height:100%; background:#FFFFFF;")

				        			.row()
				        			.attr("style","top:50%; transform:translateY(-50%); -ms-transform:translateY(-50%);")

				        				.row()
				        				.style("font-size","1.2em").style("text-align","center")
				        					.html(HTML.param("sub-title"))
				        				._()
				        				._if(HTML.param("message") != "")
					        				.row()
					        				.attr("style","padding:15px; padding-right:30px; padding-left:30px; text-align:center; max-height:200px; overflow-y:auto;")
					        					.html(HTML.param("message"))
					        				._()
				        				._end()
							        	._if(HTML.param("granted"))

							        		.row()
							        			.class("formstyles-button click-to-see-project-page")
							        			.style("text-align","center")
							        			.style("margin","20px")
							        			.html("Go to the project page")
							        		._()

							        	._end()


				        			._()

				        //._()




		        	._()
	        	._()
	        ._()
		.definePrefabEnd();


		// var lb = new LightBox();
		// lb.open({"height":"80%"});

		// HTML.i()
		// 	.cacheStart()
		// 		.prefab("join-request-response")
		// 			.fparam("title","testing")
		// 			.fparam("sub-title","testing123")
		// 			.fparam("granted",true)
		// 			.fparam("message", "testing 1 2 3 euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler  euler cauchy riman dirac euler "
		// 				+" euler cauchy riman dirac euler  euler cauchy riman dirac euler ")
		// 		._()
		// 	.cacheTo(lb.stage());


		if(isLoggedIn) {
		this.pollNotifications();
		}
		if(initialNotificationsArray) {
		ctx.handleNotifications(initialNotificationsArray);
		}

	}


	/**
	 * ping the server every 10 seconds and see if there's any notifications to get.
	 *
	 */
	_proto.pollNotifications = function() {
	var ctx = this;

		setTimeout(function(){

	    XHR.postRequest()
	        .url(window["_APP_BASE"]+"/user/get-notifications")
	        .addData("_token", $('meta[name="csrf-token"]').attr('content'))
	        .onSuccess(function(responseText) {
	            ctx.pollNotifications();
	            var notifications = $.parseJSON(responseText);
	            ctx.handleNotifications(notifications);
	        })
	        .onError(function(xhr, status, error) {
	        //ctx._app.showXHRError(error, xhr);
	        })
	        .send();

	    },10000);

	}



	/**
	 * fires from the polling callback.
	 * run an add-edit-remove loop and deal with all of the notifications that have to be added or removed.
	 *
	 */
	_proto.handleNotifications = function(notifications) {

	//get the current notifications
	var currentNotifications = [];

	var i=0;
	this._dropDownContainer.children().each(function(){
			if(i > 2) {
			currentNotifications.push($(this));
			}
		i++;
		});

	//call this rectify function to get the add-edit-remove lists.
	var rectify = this.getAddDeleteEdit(notifications, currentNotifications,
			function(newEl, oldEl) {
			return (newEl["uid"] == oldEl.data("uid"))
			});

	//we're interested in the add and edit ones.
	var addThese = rectify["add"];
	var deleteThese = rectify["delete"];

		//add the new ones
		for(var i=0; i<addThese.length; i++) {
		var addThis = addThese[i];
		var uid = addThis["uid"];

		var dropDownNotificationPrefabName = 'drop-down-notification';
		var sideNavNotificationPrefabName = 'side-bar-notification';
	    var takeActionOrRemove = this._takeActionKVP[addThis["type"]];

			//don't display it if it was one of the ones that was removed. the poll might send it back one more time.
			//this is the nature of asynchronous programming.
			if(!this._removedNotificationUID[uid]) {

			var dropdownNotification  = this.createNotification(uid, addThis["message"], "drop-down-notification", addThis,   takeActionOrRemove);
			var sideBarNotification   = this.createNotification(uid, addThis["message"], "side-bar-notification",  addThis,   takeActionOrRemove);

			dropdownNotification.data("side-bar-notification", sideBarNotification);
			sideBarNotification.data("drop-down-notification", dropdownNotification);

			this._dropDownContainer.append(dropdownNotification);
			this._sideNavContainer.append(sideBarNotification);

			this._currentBadgeCount++;
			}
		}

		//delete the old ones.
		for(var i=0; i<deleteThese.length; i++) {
		var deleteThis = deleteThese[i];
		deleteThis.remove();

		var sideNotification = deleteThis.data("side-bar-notification");
		sideNotification.remove();
		}

		if(this._currentBadgeCount > 0) {
		this.displayBadgeNumber(this._currentBadgeCount);
		}

	}



	/**
	 * create a notication with a few datafields and return it.
	 *
	 */
	_proto.createNotification = function(uid, message, prefabName, notificationObject, takeActionOnClick) {

	var not = HTML.i()
		.cacheStart()

			.prefab(prefabName)
				.fparam("notification_text", message)
				.fparam("take-action-on-click", takeActionOnClick)
				.fparam("uid",uid)
				.fparam("notification", notificationObject)
			._()

		.cacheEnd();

	return $(not);

	}


	/**
	 * this is called from the outside world to remove a notificaion by uID.
	 *
	 */
	_proto.removeNotificationWithUID = function(uID) {
	var ctx = this;;
	var i=0;
	this._dropDownContainer.children().each(function(){
			if(i > 2) {
			var nObj = $(this);
				if(nObj.data("uid") == uID) {
				ctx.removeNotification(nObj, uID);
				return;
				}

			}
		i++;
		});

	}



	/**
	 * when a click-to-remove notification is clicked, this will fire.
	 *
	 */
	_proto.removeNotification = function(notification, uid) {

		if(!this._removedNotificationUID[uid]) {

		this._removedNotificationUID[uid] = true;

		this._currentBadgeCount--;

		this.displayBadgeNumber(this._currentBadgeCount);

		var sideBarNotification = notification.data("side-bar-notification");
		var dropDownNotification = notification.data("drop-down-notification");

			if(sideBarNotification) {
			sideBarNotification.remove();
			}
			if(dropDownNotification) {
			dropDownNotification.remove();
			}

		notification.remove();

		    XHR.postRequest()
		        .url(window["_APP_BASE"]+"/user/remove-notification-for-id")
		        .addData("_token", $('meta[name="csrf-token"]').attr('content'))
		        .addData("notification_uid", uid)
		        .onSuccess(function(responseText) {
		        })
		        .onError(function(xhr, status, error) {
		        })
		        .send();
	    }
	}


	/**
	 * if we're suppised to take action, when a notification is clicked, the this will do that.
	 *
	 */
	_proto.takeAction = function(notification) {
	var notificationObject = notification.data("notification");

	//if the sidebar is open, then this will close it, for all of these guys.
	this._app._sidebar.closeIfOpen();

	nType = notificationObject["type"];

		//if the notification is a incoming join request, i.e. the user is seeing someone
		//requesting to join a project that the user owns, then we're going to link over there
		//and send along these values here so that the project page can take action.
		if(notificationObject["type"] == "join_request_incoming") {
		var projectID = notificationObject["project"];
		var joinRequestID = notificationObject["id"];
		var uID = notificationObject["uid"];
		var url = window["_APP_BASE"]+"/user/edit-project/"+projectID+"?u="+uID+"&j="+joinRequestID;
		window.location.href = url;
		}

		//if the notification is a response to a join request, then we're going to
		//pop open a lightbox. when the lightbox is closed, we're going to remove the notification and also send a
		//message to the server that it can get rid of the join request because the lifecycle of the object is over.
		else
		if(nType == "request_to_join_rejected_with_message" || nType == "request_to_join_accepted") {

		//var lb = new lightbox()
		var message = notificationObject["message"];
		var uid = notificationObject["uid"];
		var pName = notificationObject["project_name"];
		var senderName = notificationObject["sender_name"];
		var granted = (nType == "request_to_join_accepted")
		var joinRequestID = notificationObject["id"];
		var projectID = notificationObject["project"];

		// console.log("fuck me- notificationObject");
		// console.log(notificationObject);
		//[{"uid":"join-request-20","project":"18020","message":"You just requested to join the project \"quia\"","type":"join_request_outgoing","id":20},{"uid":"join-request-","project":18020,"project_name":"quia","sender_name":"Gandalf","message":"Gandalf has sent you a message!","type":"request_to_join_accepted","id":null}]

		this.showUserJoinRequestResponse(uid, pName, senderName, granted, joinRequestID, projectID);
		}

	}


	/**
	 * this is a function to show the user the response to
	 *
	 */
	_proto.showUserJoinRequestResponse = function(uid, pName, senderName, granted, joinRequestID, projectID) {
	var ctx = this;

	this._app.showXHRLoadingPanel();

		//fire off the request to delete the join-request
		 XHR.postRequest()
	    .url(window["_APP_BASE"]+"/join-requests/join-request-is-finished")
	    .addData("_token", $('meta[name="csrf-token"]').attr('content'))
	    .addData("join_request_id", joinRequestID)
	    .onSuccess(function(responseText) {

	    	var deletedJoinRequest = $.parseJSON(responseText);

			var lb = new LightBox();
			lb.open({"height":"50%"});

			var subtitle = (granted) ? senderName+" has added you to the project '"+pName+"'" : senderName+" has given the following response: ";
			var title = (granted) ? "Welecome to '"+pName+"'" : "Response from "+pName;

			HTML.i()
			.cacheStart()
				.prefab("join-request-response")
					.fparam("granted",granted)
					.fparam("sub-title",subtitle)
					.fparam("title",title)
					.fparam("message",deletedJoinRequest["message"])
				._()
			.cacheTo(lb.stage())

				if(granted) {
				lb.stage().on("click", ".click-to-see-project-page", function() {
					lb.close();
					window.location.href = window["_APP_BASE"]+"/user/edit-project/"+projectID;
					});
				}

				lb.beforeClose(function(){
				lb.stage().off("click");
				});




	    })
	    .onError(function(xhr, status, error) {
	    })
	    .send();

	//remove this notification.
	this.removeNotificationWithUID(uid);



	}


	/**
	 * the number of notifications changed, so show the badge number.
	 *
	 */
	_proto.displayBadgeNumber = function(badgeCount) {

	this._currentBadgeCount = badgeCount;

		if(!this._redBadge) {
		var r = HTML.i()
			.cacheStart()
				.prefab("red-badge")
					.fparam("badgeCount",badgeCount)
					.fparam("for-top-nav", true)
				._()
			.cacheEnd();

		var r2 = HTML.i()
			.cacheStart()
				.prefab("red-badge")
					.fparam("badgeCount",badgeCount)
				._()
			.cacheEnd();

		this._redBadge = $(r);

		this._redBadge2 = $(r2);

		this._userNavWidgetNameContainer.append(this._redBadge);
		this._hamburgerIcon.append(this._redBadge2);
		}

		if(badgeCount == 0) {
		this._redBadge.remove();
		this._redBadge2.remove();
		this._redBadge = null;
		this._redBadge2 = null;
		} else {
		this._redBadge.html(badgeCount);
		this._redBadge2.html(badgeCount);
		}

	}


	/**
	 * get the lists to rectify the old notifications with the new notifications.
	 *
	 */
	_proto.getAddDeleteEdit = function(news, olds, evaluateEquality) {

	newToAdd    = [];
	oldToDelete = [];
	editThese   = [];

	var i=0;
	var j=0;
	var newEl;
	var old;
	var old2;
	var oldWasFoundInNew = false;


		for(i=0; i<news.length; i++) {
		newEl = news[i];
		newWasFoundInOld = false;

		j=0;

			for(j=0; j<olds.length; j++) {
			old = olds[j];

				if(evaluateEquality(newEl, old)) {
				newWasFoundInOld = true;
				editThese.push({"old":old, "new":newEl});
				}

			}

			if(!newWasFoundInOld) {
			newToAdd.push(newEl);
			}

		}


		for(i=0; i<olds.length; i++) {
		old2 = olds[i];
		oldWasFoundInNew = false;

			for(j=0; j<news.length; j++) {
			newEl = news[j];

				if(evaluateEquality(newEl, old2)) {
				oldWasFoundInNew = true;
				}

			}

			if(!oldWasFoundInNew) {
			oldToDelete.push(old2);
			}

		}

	return {"add":newToAdd, "delete":oldToDelete, "edit":editThese};
	}


});
