BlueBox.compose("formkit.table.Column", function(_class, _proto) {

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
//  A Column object for the sortable table. Contains formatters, renderers  //
//  as well as handling the "orthogonal" data settings                      //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////


_proto._build = function(owner) {
this._owner = owner;

this._dataField = '';
this._sortField = '';
this._displayField = '';
this._hidden = false;

this._widthCSSClass = null;

this._cellFormatterFunction = null;
this._cellRendererFunction = null;

this._titleFormatter = null;
this._titleRenderer = null;

this._title = '';
this._sort = '';

this._width = 0;
this._inPx = true;
}


/**
 * set the fields. This what datatables calls orthogonal data.
 *
 */
_proto.setDataField = function(fieldName) {
this._dataField = fieldName;
return this;
}
_proto.setSortField = function(fieldName) {
this._sortField = fieldName;
return this;
}
_proto.setDisplayField = function(fieldName) {
this._displayField = fieldName;
return this;
}
_proto.setField = function(fieldName) {
this._dataField = this._sortField = this._displayField = fieldName;
return this;
}
_proto.setHidden = function() {
this._hidden = true;
return this;
}


/**
 * the cell render and the string formatter for the content.
 *
 */
_proto.setCellFormatter = function(formatterFunction) {
this._cellFormatterFunction = formatterFunction;
return this;
}


/**
 * the renderer function takes these arguments:
 * cell, rowNumber, columnNumber
 *
 */
_proto.setCellRenderer = function(rendererFunction) {
this._cellRendererFunction = rendererFunction;
return this;
}


/**
 * set the title, and the string formatter and the cell renderer.
 *
 */
_proto.setTitle = function(title) {
this._title = title;
return this;
}
_proto.setTitleFormatter = function(formatterFunction) {
this._titleFormatter = formatterFunction;
return this;
}
_proto.setTitleRenderer = function(rendererFunction) {
this._titleRenderer = rendererFunction;
return this;
}


/**
 * set the with in px or %
 * you can also set a class to handle the width and this will have the advantage that you can
 * get all funky and responsive. but be warned if you set one column with a class, you have to
 * do it for ALL of the columns or you'll get unpredicatble layout problems.
 *
 */
_proto.setWidthPx = function(widthPx) {
this._width = widthPx;
this._inPx = true
return this;
}
_proto.setWidthPct = function(widthPct) {
this._width = widthPct;
this._inPx = false;
return this;
}
_proto.setWidthClass = function(className) {
this._widthCSSClass = className;
return this;
}


/**
 * end the configurations.
 *
 */
_proto.endConfigure = function() {
this._owner.columnDefEnded();
return this._owner;
}



/**
 * apply the formatters
 *
 */
_proto.applyCellFormatter = function(string, dataRow) {
	if(this._cellFormatterFunction) {	
	return this._cellFormatterFunction.call(this, string, dataRow);
	} else {
	return string;
	}
}
_proto.applyCellRenderer = function(cell, rowNumber, columnNumber, dataRow) {
	if(this._cellRendererFunction) {	
	this._cellRendererFunction.call(this, cell, rowNumber, columnNumber, dataRow);
	} 
}



});