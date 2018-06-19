BlueBox.compose("formkit.table.pagination.Pagination", function(_class, _proto) {

var HTMLHelper  = BlueBox.port("util.HTMLHelper");
var HTML        = BlueBox.port("util.HTML");


_proto._build = function(owner) {

this._owner = owner;

this._numberOfRecords = 0;
this._recordsPerPage  = 0;
this._whichPage       = 0;

this._pRadius         = 0;

this.jq               = null;

this._prevButton      = null;
this._nextButton      = null;

this._inited          = false;

this._addedToContainer = false;
}


/*
So what’s going to happen is that the first query will have the limits 1 and 10. 
It’s going to get the data back and then it will perform the first draw of the table. 
It’s going to get the number 42 and it’s going to say: Math.ceil(42/10) 10 is the radius and 
that’s going to give us 5 pages. then is will say 10 - (5*10 - 42) = 2 and that’s how many 
records will be on the last page. Ok- how many pagination buttons are going to get created. 
I should write this down in some notes. 

*/
_proto.init = function(numberOfRecords, recordsPerPage, whichPage) {

	//can only be inited once.
	if(this._inited) {
	return;
	}

this._inited = true;

this._numberOfRecords = numberOfRecords;
this._recordsPerPage  = recordsPerPage;
this._whichPage       = whichPage;

var pRadius = this._pRadius;
var table = this._owner;
var ctx = this;

this._buttons = [];

this._numberOfPages = Math.ceil(numberOfRecords/recordsPerPage);

this._paginationThreshold = (2*pRadius) + 1;

//2 groups of pRadius on each side, ellipsis, number in the middle, ellipsis, 
//and the two buttons, one on each side.
this._numberOfButtons = 2*pRadius + 3 + 2;

//create the row
this.jq = HTMLHelper.i().row();

// this.jq = $(HTML.i()
// 	.cacheStart()
// 				.hgroup()
// 					.box()
// 						.style("width","100%")
// 					._()
// 				._()	
// 	.cacheEnd());




	//if we just have one measly page, then just stop right here.
	//we're not going to do build any sort of structure.
	if(this._numberOfPages <= 1) {
	return;
	}

	//create the buttons
	for(var i=0; i<this._numberOfButtons; i++) {
	var box = HTMLHelper.i().box();
	this._buttons.push(box);
	this.jq.append(box);

		//designate the first and the last ones as the prev/next
		if(i==0) {
		this._prevButton = box;
		box.data("is_prev", true);
		box.data("active", true);
		}
		if(i==(this._numberOfButtons-1)) {
		this._nextButton = box;
		box.data("is_next", true);
		box.data("active", true);
		}

	}

	//listen for the click event.
	this.jq.on("click", function(e) {
	var box = $(e.target);
	var active = box.data("active");

		if(active) {

			if(box.data("is_prev")) {
			ctx._whichPage--;
			ctx.paginationLogic();
			} else
			if(box.data("is_next")) {
			ctx._whichPage++;
			ctx.paginationLogic();
			} else {
			ctx._whichPage = box.data("page");
			}

		table.renderWithPage(ctx._whichPage);
		}

	});


}


_proto.groups = function(groupObj) {
this._groups.push(groupObj);
}

_proto.paginationLogic = function() {
var numberOfPages = this._numberOfPages;
var pRadius = this._pRadius;

	//if we just have one measly page, then just stop right here.
	//we're not going to do build any sort of structure.
	if(numberOfPages <= 1) {
	return;
	}

//0-indexed!
//so page number goes from [0 , N-1] for N pages
var pageNumber = this._whichPage;

//1-indexed!
//[1 - N] for N pages
var pagesFromEnd = numberOfPages - pageNumber;


	//do the jazz with the prev-next buttons.
	if(pageNumber == 0) {
	this._prevNextRenderer.call(this, this._prevButton, true, false);
	this._prevButton.data("active", false);
	} else {
	this._prevNextRenderer.call(this, this._prevButton, true, true);
	this._prevButton.data("active", true);
	}

	if(pageNumber == numberOfPages-1) {
	this._prevNextRenderer.call(this, this._nextButton, false, false);
	this._nextButton.data("active", false);
	} else {
	this._prevNextRenderer.call(this, this._nextButton, false, true);
	this._nextButton.data("active", true);
	}

	var buttons = this._buttons;
	var start = 1;
	var end = buttons.length-1;
	//var i=0;
	var button;
	var whichPage = this._whichPage;
	var zeroIndexPage = 0;

	this._groups = null;
	this._groups = [];

    //for example: radius of 3 and less-than 7 pages.
    //So 1,2,3,4,5,6- just show the numbers plainly.
	if(numberOfPages < this._paginationThreshold) {

	this.groups({"start":0,         "length":numberOfPages,      "first_page":0, 		           "has_selected":true   });

	} else 

	//for example: radius of 3 and 7 pages.
	//so in other words there's only one ellipsis
	if(numberOfPages == this._paginationThreshold) {

		//in this state 1,2,3,4,5,6,7
		//where 4 is the pageNumber
		if(pageNumber == pRadius) {

		this.groups({"start":0,         "length":numberOfPages,      "first_page":0, 		           "has_selected":true   });

		} 

		//pRadius: 3
		//pagination:  1,2,3,...5,6,7 
		//page number: 0,1,2,   4,5,6
		//selected     ------   -----
		else {

		this.groups({"start":0,         "length":pRadius,      "first_page":0, 		    			"has_selected":true   });
		this.groups({"start":pRadius+1, "length":pRadius,      "first_page":numberOfPages-pRadius,  "has_selected":true   });

		}

	} 

	//else, we have two 
	else {
 
		//pRadius: 3
		//pagination:  1,2,3,4...7,8,9 where page-number
		//page number: 0,1,2,3   6,7,8
		//selected     -------
		if(pageNumber <= pRadius) {

		this.groups({"start":0,         "length":pRadius+1,    "first_page":0, 		    			"has_selected":true   });
		this.groups({"start":pRadius+3, "length":pRadius,      "first_page":numberOfPages-pRadius,  "has_selected":false  });

		} else


		//pagination:    1,2,3,...6,7,8,9
		//pages          0,1,2    5,6,7,8 
		//selected                -------
		//pages-from-end          4,3,2,1          
		if(pagesFromEnd <= pRadius+1) {

		this.groups({"start":0,         "length":pRadius,    "first_page":0, 		        		"has_selected":false });
		this.groups({"start":pRadius+1, "length":pRadius+1,  "first_page":numberOfPages-1-pRadius,  "has_selected":true  });

		} 


		//pagination   1,2,3...5...7,8,9
		//pages        0,1,2   4   6,7,8
		//selected             -
		else {

		this.groups({"start":0,         "length":pRadius,   "first_page":0, 			 		 	"has_selected":false });
		this.groups({"start":pRadius+1, "length":1,         "first_page":whichPage,      			"has_selected":true  });
		this.groups({"start":pRadius+3, "length":pRadius,   "first_page":numberOfPages-pRadius,	    "has_selected":false });
	
		}

	}



var groups = this._groups;
var numberOfGroups = groups.length;
var numberOfButtons = buttons.length;
var prevEllipsis = 0;

	for(var m=1; m<numberOfButtons-1; m++) {
	var button = buttons[m];

	//we need a zero-indexed number 
	//for the button groups.
	var j = m-1;

	//we're going to loop through the number groups and see which
	//one this button belongs to.
	var isNumber = false;
	var isHighlight = false;
	var isEmpty = false;
	var isEllipsis = false;
	var pageNumber = 0;

	var ellipsisScore = 0;

		//loop through groups
		for(var k=0; k<numberOfGroups; k++) {
		var group = groups[k];
		var gStart = group["start"];
		var gEnd = gStart+group["length"];
		var positionInGroup = j - gStart;
		var page = group["first_page"] + positionInGroup;

			//if this is in one of the groups of numbers
			if(j >= gStart && j < gEnd) {
			isNumber = true;
			pageNumber = page;

				//if the group has the selected page
				//then we
				if(group["has_selected"] && pageNumber == whichPage) {
				isHighlight = true;
				}
			}

			//else this is NOT one of the groups of numbers.
			//it may be an ellipsis, or just an empty one. how do we tell the difference?
			else {

				//if this is the first group, and this button precedes the group,
				//then this is outside the groups and ellipses entirely
				if(k == 0 && j < gStart) {
				isEmpty = true;
				} else

				//else, if this is the last group, and the button comes after it, then
				//this is also outside of the groups and ellipses
				if(k == numberOfGroups-1 && j >= gEnd) {
				isEmpty = true;
				} 

				//all of the groups must agree that this object is a possible ellipsis.
				//this is different from the two cases above where we can pin down specific groups
				//and also different from the isNumber case. If one group finds that the button
				//is in a number-group, then certainly it's a number. But they must all agree that
				//a button is an ellipsis.
				else {
				ellipsisScore++;
				}

			}

		}
		//end of the groups-loop

		//apply the information to the button.
		if(isEmpty) {
		this._emptyRenderer(button);
		button.data("active",false);
		} else 
		if(isNumber) {
		this._pageNumberRenderer(button, pageNumber+1);
		button.data("page",pageNumber);
		button.data("active",true);
		} 

		//if this button was found to be a possible ellipsis for
		//all the groups, then we're going to 
		else 
		if(ellipsisScore == numberOfGroups) {

			if(prevEllipsis == j-1) {
			this._emptyRenderer(button);
			button.data("active",false);
			} else {
			prevEllipsis = j;
		    this._ellipsisRenderer(button);
		    button.data("active",false);
			}

		}

		if(isHighlight) {
		this._highlightRenderer(button);
		}

	}
	//end of the button-loop

}





/////////////
//         //
//  A P I  //
//         //
/////////////


/** 
 * set how many buttons are on each side
 *
 */
_proto.setRadius = function(radius) {
this._pRadius = radius;
return this;
} 

/** 
 * set the position of the pagination.
 *
 */
// _proto.setPositionTop = function() {
// this._position = "top";
// return this;
// }
// _proto.setPositionBottom = function() {
// this._position = "bottom"
// return this;
// }

/**
 * Mandatory. the ellipsis state. the renderer takes the button as the input
 *
 */
_proto.setEllipsisRenderer = function(renderer) {
this._ellipsisRenderer = renderer;
return this;
}

/**
 * Mandatory. the page-number state. the renderer takes the button and page-number as the arguments
 *
 */
_proto.setPageNumberRenderer = function(renderer) {
this._pageNumberRenderer = renderer;
return this;
}

/**
 * Mandatory. the highlight state. the renderer takes the button as the argument
 *
 */
_proto.setHighlightRenderer = function(renderer) {
this._highlightRenderer = renderer;
return this;
}

/**
 * Mandatory. the empty state. the renderer takes the button as the argument.
 *
 */
_proto.setEmptyRenderer = function(renderer) {
this._emptyRenderer = renderer;
return this;
}

/**
 * Mandatory. the prev-next renderer. the renderer takes the button,
 * also, prevNext true if prev false otherwise. active true/false is the button active?
 *
 */
_proto.setPrevNextRenderer = function(renderer) {
this._prevNextRenderer = renderer;
return this;
}

/**
 * end the configuration
 *
 */
_proto.endConfigure = function() {
return this._owner;
}


});