/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
//  Main Page javascript application.                                          //
//  Handles all the bells and whistles, and feeds all the different modules    //
//  lifecycle delegate calls.                                                  //
//  Author- Alex Lowe                                                          //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////

BlueBox.compose('applications.AppBase', 'applications.AppProjects', function(_class, _proto, _super) {

var StickyTopNav 		 = BlueBox.port("ui.StickyTopNav");
var SideBarNav 			 = BlueBox.port("ui.SideBarNav");
var Table         		 = BlueBox.port("formkit.table.Table");
var XHR            		 = BlueBox.port("ajax.XHR");
var HTMLHelper     		 = BlueBox.port("util.HTMLHelper");
var UserProjectsTable    = BlueBox.port("formkit.table.prefabs.UserProjectsTable");


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

this.newModule('sticky-top-nav', StickyTopNav);

var table1 = new UserProjectsTable('user_projects', true, "user_owns",         UserProjectsTable.USER_PROJECTS());

var table2 = new UserProjectsTable('user_projects2', true, "user_doesnt_own",  UserProjectsTable.USER_PROJECTS());

table1.init();

table2.init();



/*
var tableContainer = $('#user_projects');


var table = Table
.startTable()

	//.setInitialData(window["userProjects"])

	.setRowsPerPage(10)

	.setInitialPage(0)

	.setDefaultSortField("id")

	.setDefaultSortDirection("DESC") //"ASC"

	.setTitleRow()
		.setRowRenderer(function(row) {
			row.attr("style","background:#F2F2F2; font-weight:bold; padding:8px; border-bottom:5px solid #3075e5;");
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
		cell.css("padding","5px");
		})
	.endConfigure()

	.setDataRow()
		.setRowRenderer(function(row){
			row.attr("style","border-bottom:1px solid #666666; padding:8px;");
		})
	.endConfigure()

	.setDataCell()
		.setCellRenderer(function(cell){
		cell.css("vertical-align","middle");
		cell.css("padding","5px");
		})
	.endConfigure()

	.setServerInterface('Laravel')
		.setDataService(window["_APP_BASE"]+'//user/projects-table-service')
		.setMethod('POST')
		.setSpecificToThisUser(true)
		.setProjectUserRelation("user_owns") 		//user_owns, user_doesnt_own, all
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
			editButton.attr("style","padding:10px; margin:5px; text-align:center");
			cell.append(editButton);
			var id = cell.data("data");
			editButton.data("id",id);
			}

		})
		.setWidthPx(80)
	.endConfigure()

	.setColumn()
		.setField("name")
		.setTitle("Name")
		.setWidthPx(250)
	.endConfigure()

	.setColumn()
		.setField("description")
		.setTitle("Description")
		.setWidthPct(100)
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

tableContainer.append(table.jq);

table.init();


//when the edit button is clicked, sed
table.jq.on("click", ".view-project-button", function() { 
	var id = $(this).data("id");
	window.location.href = window["_APP_BASE"]+"/user/edit-project/"+id;
	});

*/


}

});


