BlueBox.compose("formkit.table.Row", function(_class, _proto) {

var HTMLHelper  = BlueBox.port("util.HTMLHelper");

_proto._build = function(owner) {

this._owner = owner;

this._rowRenderer = null;

this._onRowClickCallback = null;

}


/**
 * Configure the row renderer
 * arguments:
 *   row object from getRow
 *   row number i
 * 
 */
_proto.setRowRenderer = function(rendererFunction) {
this._rowRenderer = rendererFunction;
return this;
}

/**
 * the on click has a reference to the e passed by jquery and also
 * a reference to the table. it will be responsible for calling renderWithSort.
 *
 */
_proto.setRowWasClicked = function(onClickCallback) {
this._onRowClickCallback = onClickCallback;
return this;
}


/**
 * get the row and the cell.
 *
 */
_proto.getRow = function() {
return HTMLHelper.i().hgroup();
}


/**
 * add a cell to a row.
 *
 */
_proto.addCellToRow = function(cell, row) {
row.append(cell);
}


/**
 * apply the renderer function
 *
 */
_proto.applyRowRenderer = function(row, rowNumber, numberOfRows) {
	if(this._rowRenderer) {
	this._rowRenderer.call(this, row, rowNumber, numberOfRows);
	}
}

/**
 * apply the click behavior
 *
 */
_proto.applyRowWasClicked = function(row) {
var callback = this._onRowClickCallback;

	if(callback) {
	var table = this._owner;

	row.on("click", function(e) {
	 	callback.call(this, e, table);
		});
	}
}

/**
 * end the configurations.
 *
 */
_proto.endConfigure = function() {
return this._owner;
}



});
