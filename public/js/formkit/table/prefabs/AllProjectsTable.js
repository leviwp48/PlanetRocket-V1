/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

BlueBox.compose('formkit.table.prefabs.AllProjectsTable', function(_class, _proto, _super) {

var Table           = BlueBox.port("formkit.table.Table");
var HTMLHelper      = BlueBox.port("util.HTMLHelper");

_class.USER_PROJECTS = function() { return "user_projects";}
_class.ALL_PROJECTS  = function() { return "all_projects";}


_proto._build = function(containerID, userSpecific, userRelation, tableType) {

	if(!userRelation) {
	userRelation = "user_owns";
	}

var ctx = this;

this._tableType = tableType;

var tableContainer = $('#'+containerID);

this._table = Table
.startTable()

	.setRowsPerPage(10)

	.setInitialPage(0)

	.setDefaultSortField("id")

	.setDefaultSortDirection("DESC") //"ASC"

	.setDataContainerRenderer(function(container){
	container.css("max-height","800px");
	container.css("padding-top","5px");
	container.css("padding-left","10px");
	container.css("padding-right","20px");
	container.css("overflow-y","scroll");
	})

	//.setMaxHeight("400px")

	//make a nice message that pops up when the table comes back empty.
	.setEmptyDataTableRenderer(function(rowContainer) {

		if(userSpecific && userRelation == "user_owns" || userRelation == "user_doesnt_own") {

		var message = userRelation == "user_owns" ? "Create a project!" : "Get involved with a project!"
		var url = userRelation == "user_owns" ? window["_APP_BASE"]+"/user/new-project" : window["_APP_BASE"]+"/projects/all";
		var r = HTMLHelper.i().row();
		r.css("height","250px");
		r.addClass("formstyles-repeat-stripe-light-grey");

		var center = HTMLHelper.i().div("center");
		center.attr("style", "width:50%; padding:10px; background:#EEEEEE");

		var link = $(document.createElement("a"));
		link.attr("href",url);

		var box = HTMLHelper.i().row("formstyles-button");
		box.css("text-align","center");
		box.html("Nothing here!<br/>"+message);

		link.append(box);

		center.append(link);
		r.append(center);
		rowContainer.append(r);
		}

	})


	.setTitleRow()
		// .setRowRenderer(function(row) {
		// 	row.attr("style","background:#F2F2F2; font-weight:bold; padding-top:7px; padding-bottom:7px; border-bottom:5px solid #3075e5;");
		// 	})
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
		.setRowRenderer(function(row){
			//row.attr("style","border-bottom:1px solid #CCCCCC; padding:0px;");
			//row.attr("style","padding:10px; background:#FFFFFF; box-shadow: 2px 2px 15px #888888; margin-bottom:18px;")
			row.attr("style","padding:10px; background:#FFFFFF; box-shadow: 2px 2px 10px #AAAAAA; margin-bottom:18px;");
		})
	.endConfigure()

	.setDataCell()
		.setCellRenderer(function(cell){
		cell.css("vertical-align","middle");
		cell.css("padding","3px");
		})
	.endConfigure()

	.setServerInterface('Laravel')
		.setDataService(window["_APP_BASE"]+'/user/projects-table-service')
		.setMethod('POST')
		.setSpecificToThisUser(userSpecific)
		.setProjectUserRelation(userRelation) 		//user_owns, user_doesnt_own, all
	.endConfigure()

	//handle the id column specially. we want buttons in here.
	.setColumn()
		.setField("id")
		.setTitle("  ")
		.setCellFormatter(function(display) {
		return "";
		})
		.setCellRenderer(function(cell, column, row){

			if(row > -1) {
			var editButton = HTMLHelper.i().row("formstyles-button view-project-button");
			editButton.html("View");
			editButton.attr("style","padding:7px; margin:2px; margin-left:5px; margin-right:5px; text-align:center");
			cell.append(editButton);
			var id = cell.data("data");
			editButton.data("id",id);
			}

		})
		.setWidthPx(80)
		//.setWidthClass("sortable_table_id_column_width")
	.endConfigure()

	// .setColumn()
	// 	.setField("name")
	// 	.setTitle("Name")
	// 	.setWidthPx(250)
	// .endConfigure()

	.setColumn()
		.setField("short_description")
		.setTitle("")
		.setWidthPct(100)
		//.setWidthClass("sortable_table_desc_column_width")
		.setCellFormatter(function(string, dataRow) {
			//the title has an undefined data-row.
			if(dataRow) {
			return "<b>"+dataRow["name"]+"</b> "+string;
			} 
		return string;
		})
	.endConfigure()

	.setPagination()
		//.setRadius(3)
		.setRadius(2)
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

tableContainer.append(this._table.jq);


}

_proto.init = function() {

var url = '';

	if(this._tableType == _class.ALL_PROJECTS()) {
	url = window["_APP_BASE"]+"/projects/view-project/";
	} else {
	url = window["_APP_BASE"]+"/user/edit-project/";
	}

//when the edit button is clicked, sed
this._table.jq.on("click", ".view-project-button", function() { 
	var id = $(this).data("id");
	window.location.href = url+id;
	});

this._table.init();
}

});


