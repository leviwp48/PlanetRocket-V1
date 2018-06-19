
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //      
//  A table to display the user's projects                                                                     //                                                                                              //
//  Injection-based code here, so everything is loosely coupled. Future things:                                //
//                                                                                                             //
//  	- the order of functions such as setDisplay and applyRenderer                                          //
//  	- row or column-based. Right now it's row-based, which means that we're dealing with row objects       //
//      - an abstract ajax service. Right now, XHR                                                             //
//      - an abstract html service. Right now, out helper code as well as jquery                               //
//      - also, I'm bunting here on the issue of whether or not the server returns index-arrays or kvp-arrays  //
//      - also, I'm bunting here on the reque                                                                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

BlueBox.compose("formkit.table.Table", function(_class, _proto) {


var HTMLHelper  = BlueBox.port("util.HTMLHelper");
var HTML        = BlueBox.port("util.HTML");
var Column      = BlueBox.port("formkit.table.Column");
var Row         = BlueBox.port("formkit.table.Row");
var Cell        = BlueBox.port("formkit.table.Cell");
var Pagination  = BlueBox.port("formkit.table.pagination.Pagination");
var XHR         = BlueBox.port("ajax.XHR");



_proto._build = function() {

this.jq = HTMLHelper.i().row();

this._titleContainer = HTMLHelper.i().row();
this._dataContainer = HTMLHelper.i().row();


var pagRow = HTMLHelper.i().row();
var pagBox = HTMLHelper.i().div("pagination_box")
pagRow.append(pagBox);
this._paginationContainer = pagBox;


this.jq.append(pagRow);
this.jq.append(this._titleContainer);
this.jq.append(this._dataContainer);

this._initialData = null;

this._colDefsByDataField = {};
this._colDefsInOrder = [];


this._totalPxWidth = 0;
this._numberOfPctCols = 0;
this._def = null;

this._calc = 0;
this._columnWidthHandledWithCSSClasses = false;

this._rowsPerPage = 0;
this._pageNumber = 0;
this._recordsCount = 0;

this._sortField = '';
this._sortDirection = '';

this._dataRowFactory = null;
this._dataCellFactory = null;

this._titleRowFactory = null;
this._titleCellFactory = null;

this._dataContainerRenderer = null;
this._emptyDataTableRenderer = null;
this._onRenderCallback = null;


this._pagination = null;

}


/**
 * render the title for the sortable table
 *
 */
_proto.renderTitle = function() {
var defs = this._colDefsInOrder;
var defsLen = defs.length;

//get references to the factories
var titleFactory = this._titleRowFactory;
var rowFactory = this._dataRowFactory;
var titleCellFactory = this._titleCellFactory;
var rowCellFactory = this._dataCellFactory;


var title = titleFactory.getRow();

	for(var i=0; i<defsLen; i++) {
	var column = defs[i];

		if(!column._hidden) {



		var cell = titleCellFactory.getCell(column, this._calc);
		var formattedDisplay = column.applyCellFormatter(column._title);

		//in a future implementation, the order of these functions will be configurable
		//here, we're setting the strings and then calling the renderers. the column
		//gets the last "crack" at the cell
		titleCellFactory.applyDisplayString(cell, formattedDisplay);
		titleCellFactory.applyData(cell, column._dataField);
		titleCellFactory.applyCellRenderer(cell, i, -1); //-1 for the title row
		column.applyCellRenderer(cell, i, -1);

		//add the cell to the title
		titleFactory.addCellToRow(cell, title);
		}

	}

//apply whatever event listeners this row is configured for.
titleFactory.applyRowWasClicked(title);

//this function called before or after the loop? that should be configurable
titleFactory.applyRowRenderer(title, 0, 1);

//this.jq.append(title);
this._titleContainer.append(title);

}


/**
 * render all of the data-rows for the sortable table.
 *
 */
_proto.renderData = function(fullDataObject) {

var server = this._server;


//console.log(fullDataObject);

var dataRecordsArray = server.resultFromServerGetDataRows(fullDataObject);
this._recordsCount = server.resultFromServerGetTotalNumber(fullDataObject);

this.applyOnRenderCallback();

	if(this._recordsCount == 0) {
	this.applyEmptyDataTableRenderer();
	}

var pagination = this._pagination;
var pContainer = this._paginationContainer;

	//handle the pagination. we're also removing it from the dom before we render it 
	//to save some expensive dom-thrashing.
	if(pagination) {
	pagination.init(this._recordsCount, this._rowsPerPage, this._pageNumber, this._paginationContainer);

		if(pagination._addedToContainer) {
		pagination.jq.detach();
		}

	pagination.paginationLogic();

	pContainer.append(pagination.jq);
	pagination._addedToContainer = true;
	}


var defs = this._colDefsInOrder;
var defsLen = defs.length;

//get references to the factories
var titleFactory = this._titleRowFactory;
var rowFactory = this._dataRowFactory;
var titleCellFactory = this._titleCellFactory;
var rowCellFactory = this._dataCellFactory;

var dataLen = dataRecordsArray.length;

	for(var j=0; j<dataLen; j++) {
	var dataRow = dataRecordsArray[j];
	var tableRow = rowFactory.getRow();

	//we're just going to glue this on here.
	tableRow.data("data-record",dataRow);

		for(var i=0; i<defsLen; i++) {
		var column = defs[i];

			if(!column._hidden) {

			var dataField = column._dataField;
			var displayField = column._displayField;
			var data = dataRow[dataField];
			var display = dataRow[displayField];

			//get the cell
			var cell = rowCellFactory.getCell(column, this._calc);

			//get the formatted display string
			var formattedDisplay = column.applyCellFormatter(display, dataRow);

			//in a future implementation, the order of these functions will be configurable
			//here, we're setting the strings and then calling the renderers. the column
			//gets the last "crack" at the cell
			rowCellFactory.applyDisplayString(cell, formattedDisplay);
			rowCellFactory.applyData(cell, data);
			rowCellFactory.applyCellRenderer(cell, i, j);
			column.applyCellRenderer(cell, i, j, dataRow);

			//add the cell to the row
			rowFactory.addCellToRow(cell, tableRow);

			}

		}

	//apply whatever event listeners this row is configured for.
	rowFactory.applyRowWasClicked(tableRow);

	//this function called before or after the loop? that should be configurable
	rowFactory.applyRowRenderer(tableRow, j, dataLen);

	//this.jq.append(tableRow);
	this._dataContainer.append(tableRow);
	}

}


/**
 * some adhoc hooks here. query the current rows in the table.
 * also, refresh the table and if the table is empty we're going to show the empty message.
 *
 */
_proto.adhocGetDisplayedRowsWithSimpleCondition = function(condition) {
var returnRows = [];

	this._dataContainer.children().each(function(){

	var row = $(this);
	var dataRecord = row.data("data-record");

		if(condition.call(this, dataRecord)) {
		returnRows.push(row);
		}

	});

return returnRows;
} 
_proto.adhocPaintEmptyMessageIfTableIsEmpty = function() {
	if(this._dataContainer.children().length == 0) {
	this.applyEmptyDataTableRenderer();
	}
}


/**
 * this alerts us whenever a column-definition has ended
 * and it's time to add it to the array
 *
 */
_proto.columnDefEnded = function() {
var def = this._def;
this._colDefsInOrder.push(def);
this._colDefsByDataField[def._dataField] = def;
}


/**
 * ajax has succeeded so we're going to refresh the data.
 * empty out the container and re-render it.
 *
 */
_proto.refreshPageWithData = function(newData) {
this._dataContainer.empty();
this.renderData(newData);
}

/**
 * apply the on-render callbacl
 *
 */
_proto.applyOnRenderCallback = function() {
	if(this._onRenderCallback) {
	this._onRenderCallback.call(this, this);
	}
}


/**
 * apply the callback for the case where there's no data.
 *
 */
_proto.applyEmptyDataTableRenderer = function() {
	if(this._emptyDataTableRenderer) {
	this._emptyDataTableRenderer.call(this, this._dataContainer);
	}
}


/**
 * call the ajax. coodinate with the server interface to get the request in the shape
 * that the server is expecting.
 *
 */
_proto.callAJAX = function() {

var server = this._server;
var ctx = this;


	var xhr = server._ajaxMethod == "POST" ? XHR.postRequest() : XHR.getRequest();
	
	xhr.url(server._ajaxDataServiceURL);
	
	server.appendResultsPerPageToData(xhr, this._rowsPerPage);
	
	server.appendPageNumberToData(xhr, this._pageNumber);
	
	server.appendSortingFieldToData(xhr, this._sortField);
	
	server.appendSortingDirectionToData(xhr, this._sortDirection);
	
	server.appendAdditionalData(xhr);

	xhr.onSuccess(function(responseText) {
		var newData = $.parseJSON(responseText);
		ctx.refreshPageWithData(newData);
	})
	xhr.onError(function(xhr, status, error) {
		//need to do something with the error here. 
		//console.log("table ajax error: "+status+" "+error);
	})
	xhr.send();


}


/////////////
//         //
//  A P I  //
//         //
/////////////


/**
 * start and end the table
 *
 */
_class.startTable = function() {
return new _class;
}
_proto.endTable = function() {
var cols = this._colDefsInOrder;

var numberOfPctCols = 0;
var totalPxWidth = 0;

	for(var i=0; i<cols.length; i++) {
	var col = cols[i];

		if(col._widthCSSClass) {
		this._columnWidthHandledWithCSSClasses = true;
		break;
		}

		if(!col._hidden) {
			if(col._inPx) {
	        totalPxWidth += col._width;
			} else {
			numberOfPctCols++;	
			}
		}
	}

	if(this._columnWidthHandledWithCSSClasses) {
	this._calc = 0;
	} else {
	this._calc = numberOfPctCols > 0 ? totalPxWidth/numberOfPctCols : 0;
	}

	if(this._dataContainerRenderer) {
	this._dataContainerRenderer.call(this, this._dataContainer);
	}

return this;
}




/**
 * these are callable to make the sortable table sort or display a certain page.
 *
 */
_proto.renderWithSort = function(sortField, sortDirection) {
this._sortField = sortField;
this._sortDirection = sortDirection;
this.callAJAX();
}
_proto.renderWithPage = function(whichPage) {
this._pageNumber = whichPage;
this.callAJAX();
} 



_proto.log = function(string) {
console.log(string);
return this;
}


/**
 * set the initial data and the pagination
 *
 */
_proto.setInitialData = function(arrayOfRows) {
this._initialData = arrayOfRows;
return this;
}
_proto.setRowsPerPage = function(rowsPerPage) {
this._rowsPerPage = rowsPerPage;
return this;
}
_proto.setInitialPage = function(whichPage) {
this._pageNumber = whichPage;
return this;
} 

_proto.setDefaultSortField = function(sortField) {
this._sortField = sortField;
return this;
}

_proto.setDefaultSortDirection = function(sortDirection) {
	if(sortDirection != "ASC" && sortDirection != "DESC") {
	throw new Error("Table: setDefaultSortDirection: sortDirection must be either ASC or DESC. You entered "+sortDirection);
	}
this._sortDirection = sortDirection;
return this;
}

_proto.setDataContainerRenderer = function(callback) {
this._dataContainerRenderer = callback;
return this;
}
/*

this._dataContainer.css("max-height","400px");
this._dataContainer.css("padding-left","10px");
this._dataContainer.css("padding-right","20px");
this._dataContainer.css("overflow-y","scroll");

*/


// _proto.setMaxHeight = function(maxHeight) {
// this._dataContainer.css("max-height",maxHeight);
// this._dataContainer.css("overflow-y","scroll");
// return this;
// }


/**
 * set the pagination.
 *
 */
_proto.setPagination = function() {
this._pagination = new Pagination(this);
return this._pagination;
}


/**
 * set the data row and cell factories
 *
 */
_proto.setDataRow = function() {
this._dataRowFactory = new Row(this);
return this._dataRowFactory;
}
_proto.setDataCell = function() {
this._dataCellFactory = new Cell(this);
return this._dataCellFactory;
}


/**
 * set the title row and cell factories
 *
 */
_proto.setTitleRow = function() {
this._titleRowFactory = new Row(this);
return this._titleRowFactory;
}
_proto.setTitleCell = function() {
this._titleCellFactory = new Cell(this);
return this._titleCellFactory;
}


/**
 * set a callback for render events
 *
 */
_proto.setOnRender = function(callback) {
this._onRenderCallback = callback;
return this;
}

/**
 * set the callback for what to do with the data-container when
 * the data comes back empty.
 * 
 * the callback takes the _dataContainer as the sole argument.
 */
_proto.setEmptyDataTableRenderer = function(callback) {
this._emptyDataTableRenderer = callback;
return this;
}


/**
 * set a column defintion
 *
 */
_proto.setColumn = function() {
this._def = new Column(this);
return this._def; 
}


/**
 * set the server interface, which is responsible for crafting
 * a request with all of the pagination and sorting and tokens that the server will understand
 *
 */
_proto.setServerInterface = function(interfaceClassName) {
this._server = new blue.formkit.table.servers[interfaceClassName](this);
	if(!this._server) {
	throw new Error("setServerInterface: server-interface "+interfaceClassName+" not found.");
	}
return this._server;
}


/**
 * fetch the number of records total
 *
 */
_proto.getRecordsCount = function() {
return this._recordsCount;
}


/**
 * call this at the end of all the setup with the table.
 *
 */
_proto.init = function() {

this.renderTitle();

	//if we have initial data, then render it immediately.
	if(this._initialData) {
	this.renderData(this._initialData);
	} 

	//else, call AJAX
	else {
	this.callAJAX();
	}

}





});