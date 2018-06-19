BlueBox.compose("formkit.table.servers.BaseServerInterface", function(_class, _proto) {

//var XHR = BlueBox.port("ajax.XHR");


_proto._build = function(owner) {
this._owner = owner;

this._ajaxDataServiceURL = '';
this._ajaxMethod = '';
}

/**
 * configuration functions.
 *
 */
_proto.setDataService = function(dataService) {
this._ajaxDataServiceURL = dataService;
return this;
}
_proto.setMethod = function(method) {
this._ajaxMethod = method;
return this;
}
_proto.endConfigure = function() {
return this._owner;
}



/**
 * functions to handle inserting data into the request
 *
 */
_proto.appendResultsPerPageToData = function(xhr, resultsPerPage) {

}
_proto.appendPageNumberToData = function(xhr, pageNumber) {

}
_proto.appendSortingFieldToData = function(xhr, sortingField) {

}
_proto.appendSortingDirectionToData = function(xhr, sortDirection) {

}
_proto.appendAdditionalData = function(xhr) {

}


/**
 * functions to 
 *
 */
_proto.resultFromServerGetDataRows = function(serverResponse) {
//return rows as an array of json objects
}
_proto.resultFromServerGetTotalNumber = function(serverResponse) {
//return the total number of rows as a single number.
}
_proto.resultFromServerGetNumberOfPages = function(serverResponse) {
//return the number of pages as a single number.
}



});