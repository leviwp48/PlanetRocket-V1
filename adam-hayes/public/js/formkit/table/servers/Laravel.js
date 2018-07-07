BlueBox.compose("formkit.table.servers.BaseServerInterface", "formkit.table.servers.Laravel", function(_class, _proto, _super) {


_proto._build = function(owner) {
_super._build.call(this, owner);

this._projectsSpecificToUser = false;
this._projectUserRelation    = "all";
}


/**
 * functions to handle inserting data into the request. Send along all of the sorting and pagination along with the 
 * prefernces for the user and also the csrf token.
 *
 */
_proto.appendResultsPerPageToData = function(xhr, resultsPerPage) {
xhr.addData("rows_per_page", resultsPerPage);
}
_proto.appendPageNumberToData = function(xhr, pageNumber) {
xhr.addData("which_page", pageNumber);
}
_proto.appendSortingFieldToData = function(xhr, sortingField) {
xhr.addData("sort_field", sortingField);
}
_proto.appendSortingDirectionToData = function(xhr, sortDirection) {
sortDirection = sortDirection.toUpperCase();
	if(sortDirection != "ASC" && sortDirection != "DESC") {
	throw new Error("Expecing either asc or desc for the sorting direction. Upper or lower case.");
	}
xhr.addData("sort_dir", sortDirection);
}
_proto.appendAdditionalData = function(xhr) {
xhr.addData("user_specific",  this._projectsSpecificToUser ? "true" : "false");
xhr.addData("user_relation",  this._projectUserRelation)
xhr.addData("_token", $('meta[name="csrf-token"]').attr('content'))
}


/**
 * functions to 
 *
 */
_proto.resultFromServerGetDataRows = function(serverObject) {
return serverObject["data"];
}
_proto.resultFromServerGetTotalNumber = function(serverObject) {
return serverObject["count"];
}
_proto.resultFromServerGetNumberOfPages = function(serverResponse) {
//return the number of pages as a single number.
}


/////////////
//         //
//  A P I  //
//         //
/////////////


_proto.setSpecificToThisUser = function(trueOrFalse) {
this._projectsSpecificToUser = trueOrFalse;
return this;
}
//user_owns, user_doesnt_own, all
_proto.setProjectUserRelation = function(relation) {
	if(relation == "user_owns" || relation == "user_doesnt_own" || relation == "all") {
	this._projectUserRelation = relation;
	} else {
	throw new Error("setProjectUserRelation: relation must be 'user_owns', 'user_doesnt_own' or 'all'");
	}

return this;
}


});