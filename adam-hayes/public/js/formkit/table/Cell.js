BlueBox.compose("formkit.table.Cell", function(_class, _proto) {

var HTMLHelper  = BlueBox.port("util.HTMLHelper");

_proto._build = function(owner) {

this._owner = owner;

this._cellRenderer = null;

}


/**
 * Configure the cell renderer
 * arguments: 
 *   cell object from getCell
 *   column-number i, row-number j.
 *
 */
_proto.setCellRenderer = function(rendererFunction) {
this._cellRenderer = rendererFunction;
return this;
}


/**
 * get the cell object with a column definition.
 *
 */
_proto.getCell = function(column, calc) {
var cell = HTMLHelper.i().box();
var widthCSSClass = column._widthCSSClass;

	if(widthCSSClass) {
	cell.addClass(widthCSSClass);
	} else {

		if(!column._inPx) {
		var width = calc > 0 ? "calc("+column._width+"%-"+calc+"px)" : column._width;
		cell.css("width",width);
		} else {
		var width = column._width;
		cell.css("width",width);
		}

	}

return cell;
}


/**
 * apply things to the cell when we're in the render-loop. 
 * These functions are called in this order. The renderer always comes last
 *
 */
_proto.applyDisplayString = function(cell, displayString) {
cell.html(displayString);
} 
_proto.applyData = function(cell, data) {
cell.data('data',data);
}
_proto.applyCellRenderer = function(cell, columnNumber, rowNumber) {
	if(this._cellRenderer) {
	this._cellRenderer.call(this, cell, columnNumber, rowNumber);
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
