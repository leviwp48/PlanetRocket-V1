/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

BlueBox.compose('formkit.table.prefabs.JoinRequestsTable', function(_class, _proto, _super) {

var Table           = BlueBox.port("formkit.table.Table");
var HTMLHelper      = BlueBox.port("util.HTMLHelper");
var HTML            = BlueBox.port("util.HTML");
var LightBox        = BlueBox.port("ui.LightBox");



_proto._build = function(containerID, projectID, app) {

var ctx = this;

this._app = app;

var tableContainer = $('#'+containerID);

this._respondToJoinRequestLightBox = new LightBox();

this._lightboxIsOpen = false;

this._table = Table
.startTable()

	.setRowsPerPage(10)

	.setInitialPage(0)

	.setDefaultSortField("sender_id")

	.setDefaultSortDirection("DESC") //"ASC"

	.setDataContainerRenderer(function(container){
	container.css("max-height","400px");
	container.css("padding-top","5px");
	container.css("overflow-y","scroll");
	})

	// //make a nice message that pops up when the table comes back empty.
	.setEmptyDataTableRenderer(function(rowContainer) {

		var r = HTML.i()
		.cacheStart()
			.row()
				.style("height","150px")
				.class("formstyles-repeat-stripe-light-grey")
		
				.div()
					.class("center")
					.attr("style", "width:50%; padding:10px; background:#EEEEEE")

					.row()
						.class("formstyles-button")
						//.box()
							.style("text-align","center")
							.style("background","#AAAAAA")
							.style("cursor","auto")
							.html("No requests right now!")

						//._()
					._()
				._()
			._()
		.cacheTo(rowContainer);
		

	})

	.setTitleRow()
		.setRowRenderer(function(row) {
			row.attr("style","font-weight:bold; padding-top:7px; padding-bottom:0px; border-bottom:3px solid #CCCCCC;");
			})
		.setRowWasClicked(function(e, table) {

			//get the target. get the field and the direction. toggle the direction.
			//call the render function on the table.
			var target =    $(e.target);
			var field =     target.data("data");

				if(field != "id") {
				var toggleDir = target.data("toggleDir");
				var direction = toggleDir ? "ASC" : "DESC";

					if(!toggleDir) {
					target.data("toggleDir", true);
					} else {
					target.data("toggleDir", false);	
					}
				
				table.renderWithSort(field, direction);
				}

			})
		.endConfigure()

	.setTitleCell()
		.setCellRenderer(function(cell){
		cell.css("padding","3px");
		})
	.endConfigure()

	.setDataRow()
		.setRowRenderer(function(row, rowNumber, numberOfRows){
			if(rowNumber < numberOfRows-1) {
			row.attr("style","border-bottom:1px solid #CCCCCC; padding:0px;");
			}
		})
	.endConfigure()

	.setDataCell()
		.setCellRenderer(function(cell){
		cell.css("vertical-align","middle");
		cell.css("padding","3px");
		})
	.endConfigure()

	.setServerInterface('JoinRequestToServer')
		.setDataService(window["_APP_BASE"]+'/join-requests/join-request-table-service')
		.setMethod('POST')
		.setProjectID(projectID)
	.endConfigure()


	.setColumn()
		.setField("sender_name")
		.setTitle("Name")
		.setWidthPx(100)
		//.setWidthPx(200)
	.endConfigure()

	.setColumn()
		.setField("needs")
		.setTitle("Capabilities")
		.setWidthPx(150)
		//.setWidthClass("sortable_table_desc_column_width")
		.setCellFormatter(function(display, dataRecord) {
			if(dataRecord) {
			return "";
			}
		return display;
		})
		.setCellRenderer(function(cell, column, row, dataRecord) {
		 //the title has an undefined data-row.
		 	if(dataRecord) {
		 	var needs = $.parseJSON(dataRecord["needs"]);

		 	var needRow = HTML.i()
		 		.cacheStart()
		 		.row()
		 			.loop(needs, function(el,i,len) {

		 				if(el) {
						 	var split = el.split("-");
						 	split.pop();
							var needText = split.join("-"); 
							var marginRight = (i==len-1) ? "" : "margin-right:4px";

			 				this.box()
			 					.attr("style","padding:4px; padding-left:6px; padding-right:6px;  color:white; background:#AAAAAA; border-radius:3px; "+marginRight)
			 					.html(needText)
			 				._();
		 				}
		 				
		 			})
		 		._()
		 		.cacheEnd();

		 	cell.append($(needRow));
		 	} 	

		 })
	.endConfigure()

	//handle the id column specially. we want buttons in here.
	.setColumn()
		.setField("id")
		.setTitle("")
		.setCellFormatter(function(display) {
		return "";
		})
		.setCellRenderer(function(cell, column, row, dataRecord){

			if(row > -1) {
			var respondButton = HTMLHelper.i().row("formstyles-button respond-to-join-request-button");

			respondButton.html("Respond");
			respondButton.attr("style","padding:7px; text-align:center;");
			cell.append(respondButton);
			respondButton.data("data-record", dataRecord);
			}
		})
		.setWidthPx(80)
		//.setWidthClass("sortable_table_id_column_width")
	.endConfigure()

	.setPagination()
		.setRadius(3)
		.setEllipsisRenderer(function(box) {
			box.html("...");
			box.attr("class", "box formstyles-pagination-ellipsis");
			box.css("display","inline-block");
		})
		.setPageNumberRenderer(function(box, pageNumber) {
			box.html(pageNumber);
			box.attr("class", "box formstyles-pagination-number");
			box.css("display","inline-block");
		})
		.setHighlightRenderer(function(box){
			box.attr("class", "box formstyles-pagination-highlight");
			box.css("display","inline-block");
		})
		.setEmptyRenderer(function(box){
			box.attr("class", "box");
			box.css("display","none");
		})
		.setPrevNextRenderer(function(box, isPrev, active) {

			if(isPrev) {
				if(active) {
				box.attr("class","box formstyles-leftarrow-4-grey");
				} else {
				box.attr("class","box formstyles-leftarrow-4-lightgrey");
				}
			} else {
				if(active) {
				box.attr("class","box formstyles-rightarrow-4-grey");
				} else {
				box.attr("class","box formstyles-rightarrow-4-lightgrey");
				}
			}

		})
	.endConfigure()

.endTable();

HTML.i()
.cacheStart()
	.row()
	.style("margin-top","35px")
		.h3()
		.html("Requests to join your project")
		._()
	._()
.cacheTo(tableContainer);

tableContainer.append(this._table.jq);


}

	_proto.init = function() {

	var ctx = this;

	this._table.jq.on("click", ".respond-to-join-request-button", function() { 
		var dataRecord = $(this).data("data-record");
		console.log(dataRecord);
		ctx.openUpResponsePanel(dataRecord);
		});

	this._table.init();
	}


	/**
	 * make use of some ad-hoc table functions if the user-request was rejected.
	 *
	 */
	_proto.removeRejectedRowsFromTable = function(joinRequestRecord) {
	var idToRemove = joinRequestRecord["id"];

	var matchingRows = this._table.adhocGetDisplayedRowsWithSimpleCondition(
		function(dataRecord) {
			if(dataRecord["id"] == idToRemove) {
			return true;
			}
		return false;
		});

		for(var i=0; i<matchingRows.length; i++) {
		var matchingRow = matchingRows[i];
		matchingRow.remove();
		}

	this._table.adhocPaintEmptyMessageIfTableIsEmpty();
	}


	/**
	 * open up the repsonse panel, and give the user a chance to review the join-request.
	 *
	 */
	_proto.openUpResponsePanel = function(joinRequestRecord) {

		if(!this._lightboxIsOpen) {
		this._lightboxIsOpen = true;

		var ctx = this;
		var lightbox = this._respondToJoinRequestLightBox;

		var requestPanelElements = this.getRequestPanel(
			joinRequestRecord["project_name"], 
			joinRequestRecord["sender_name"], 
			joinRequestRecord["message"], 
			joinRequestRecord["email"],
			$.parseJSON(joinRequestRecord["needs"]));

		var jq = requestPanelElements['panel'];
		var textarea = requestPanelElements['textarea'];

		lightbox.open({"height":"90%"});
		lightbox.stage().append(requestPanelElements["panel"]);

			lightbox.stage().on("click", ".request-granted", function() {
			ctx._app.respondToJoinRequest(joinRequestRecord, true, textarea.val());	
			ctx.removeRejectedRowsFromTable(joinRequestRecord);			
			});
			lightbox.stage().on("click", ".request-rejected", function() {
			ctx._app.respondToJoinRequest(joinRequestRecord, false, textarea.val());
			ctx.removeRejectedRowsFromTable(joinRequestRecord);	
			});


		var resizer = null;

			if(BlueBox.isIE9 || BlueBox.isIE10) {
			//if(false) {

			var vBox1 = jq.find("[id='vertical-box-1']");
			var vBox2 = jq.find("[id='vertical-box-2']");
			var inner1 = vBox1.children().eq(0);
			var inner2 = vBox2.children().eq(0);

				resizer = this._app.addResizer(function(){

					inner1.detach();
					inner2.detach();

				vBox1.css("height","auto");
				vBox2.css("height","auto");

					vBox1.append(inner1);
					vBox2.append(inner2);

				var offsetHeight1 = vBox1.get(0).offsetHeight;
				var offsetHeight2 = vBox2.get(0).offsetHeight;

				inner1.css("height",offsetHeight1);
				inner2.css("height",offsetHeight2);
				})

			}
		

			lightbox.beforeClose(function(){
				if(resizer) {
				resizer.remove();
				}
			lightbox.stage().off("click");
			lightbox.stage().off("click");
			ctx._lightboxIsOpen = false;
			});

		}

	}


//window["_APP_BASE"]+
	// _proto.getLoadingPanel = function() {
	// var n = HTML.i()
	// 	.cacheStart()
	// 		.abox()
	// 			.attr("style","width:100%; height:100%; background:#FFFFFF;")
	// 			.abox()
	// 				.style("width","200px")
	// 				.style("height","200px")
	// 				.style("background","url('/images/Spinner-0.6s-200px.gif')")
	// 				.style("border","2px solid #DDDDDD")
	// 				.style("left","50%")
	// 				.style("top","50%")
	// 				.style("transform","translateX(-50%) translateY(-50%)")
	// 				.style("-me-transform","translateX(-50%) translateY(-50%)")
	// 			._()
	// 		._()
	// 	.cacheEnd()

	// return $(n);
	// }

	_proto.getRequestPanel = function(projectName, requesterName, requesterDescription, requesterEmail, requesterCapabilities) {

	//this one works in IE11, firefox and chrome, but not IE9 or 10.
	var n = HTML.i()
		.cacheStart()
			.vgroup()
				.vinner()
					.box()
						.row()
						.class("formstyles-repeat-stripe-light-grey")
							.h2()
								.attr("style","text-align:center; padding:10px;")
								.html(requesterName+' wants to join "'+projectName+'"')
							._()
						._()
					._()
				._()

				.vinner()
					.box()
						.row().style("padding","10px").style("padding-bottom","0px") 
							.html("<b>"+requesterName+"'s email address: "+requesterEmail+"</b>")
						._()
					._()
				._()

				.vinner()
					.box()
						.row().style("padding","10px")
								
								.hgroup().style("height","100%")
									.box().style("width","70%")
										.html("<h4>"+requesterName+"'s introduction</h4>")
									._()
									.box().style("width","30%").style("padding-left","10px")
										.html("<h4>"+requesterName+"'s capabilities</h4>")
									._()
								._()



						._()
					._()
				._()

				.vinner()
					.box()
					.style("height","100%")
						
						.vgroup()
							.vinner()
								.box().style("height","calc(60% - 30px)").id("vertical-box-1")//.style("padding","10px") this can't have padding either

									.hgroup().style("height","100%")
										.box().attr("style", "width:70%; height:100%;") //this cant have padding

											.vgroup().style("border","1px solid white") //there needs to be a border here for some reason!
										
												//.abox().attr("style","box-sizing:border-box; width:100%; height:100%; overflow-y:scroll; padding:10px;")
												.abox().attr("style","box-sizing:border-box; top:0px; left:10px; right:10px; bottom:0px; border:1px solid #CCCCCC; overflow-y:scroll; padding:10px;")
													.html(requesterDescription)
												._()
											._()


										._()
										.box().style("width","30%").style("height","100%")

											.vgroup().style("border","1px solid white") //there needs to be a border here for some reason!
										
												.abox().attr("style","box-sizing:border-box; top:0px; left:0px; right:10px; bottom:0px; border:1px solid #CCCCCC; overflow-y:scroll; padding:10px;")
																						
													.loop(requesterCapabilities, function(el,i,len) {

														if(el) {
															var split1 = el.split("-");
															split1.pop()
															var capability = split1.join('-');
											 
											 				this.row()
											 					.attr("style","background:#999999; color:#FFFFFF; padding:10px; padding-top:5px; padding-bottom:5px; border-radius:4px; margin-bottom:5px;")
											 					.html(capability)
											 				._();
										 				}
										 
										 			})


												._()
											._()


										._()
									._()



								._()
							._()
							.vinner()
								.box().style("height","60px")
								
									.abox()
									.attr("style","width:100%; top:auto; bottom:0px; font-size:0.9em; box-sizing:border-box; padding:10px; padding-bottom:0px;")
										.html("(Optional) Below you can include a note in your reply. If you decide that "+requesterName+" is not a good fit for the project, you can deny the request without sending this person a note.")
									._()
									
								._()
							._()
							.vinner()
								.box().style("height","calc(40% - 30px)").id("vertical-box-2")

									.vgroup().style("border","1px solid white")
										.abox()
										.attr("style","box-sizing:border-box; width:100%; height:100%; padding:10px; padding-top:0px;")
											.form()
											.attr("style","height:100%; width:100%;")
												.textarea("message-to-user")
												.attr("style","height:100%; width:100%; overflow-y:scroll; resize:none;")
													.class("box formstyles-text-input")
												._()
											._()
										._()
									._()


								._()
							._()

						._()


					._()
				._()

				.vinner()
					.box()
					.style("padding","10px")

						.hgroup()

							.box()
							.style("width","50%")
								.row().style("margin-right","5px").style("text-align","center")
								.class("formstyles-button request-granted")
								.html("Add "+requesterName+" to your project!")
								._()
							._()

							.box()
							.style("width","50%")
								.row().style("margin-left","5px").style("text-align","center")
								.class("formstyles-button request-rejected")
								.html("Not a good fit for this project.")
								._()
							._()

						._()


					._()
				._()


			._()
		.cacheEnd();


	var messageToUser = HTML.i().retrieve("message-to-user");

	var jq = $(n);

	return {"panel":jq, "textarea":$(messageToUser)};		

	}











});


