
BlueBox.compose(
	"ajax.inputs.BaseInputInterface", 
    "ajax.inputs.CheckBoxGroup", 

function(_class, _proto, _super) {

	_proto._build = function(buttonContainer) {

	_super._build.call(this, buttonContainer);

	this._siblings = [];

    buttonContainer.children().each(function(){

    		if (this.type == 'checkbox')   {
    			if(this.getAttribute("checked") == "checked") {
    			this.checked = true;
    			} else {
    			this.checked = false;
    			}
    		}

		});

	}


	_proto.getValue = function() {
	var checkedOptions = [];

		this._jq.children().each(function(){

			if (this.type == 'checkbox') {

    			if(this.checked) {
    			this.checked = true;
    			checkedOptions.push(this.value);
    			} 

    		}
    	
		});

	return checkedOptions;
	}
	_proto.setValue = function(values) {

		if(!values.constructor === Array) {
		throw new Error("CheckBoxGroup: setValue: the value must be an array");
		}

		this._jq.children().each(function(){

			if (this.type == 'checkbox') {
			var checkboxValue = this.value;
			this.checked = false;

				for(var i=0; i<values.length; i++) {
				var val = values[i];
					if(checkboxValue+'' == val+'') {
					this.checked = true;
					break;
					}

				}

			}

		});

	}

	/**
	 * a special setter here. this sets the value in the context of the initial request that fetches the data for the form.
	 *
	 */
	_proto.setValueEditModeInitialRequest = function(val) {
	this.setValue(val);
	}


	/**
	 * checkboxes are weird. We have to append the other ones to this first one.
	 * this all goes back to the fact that checkboxes all share the same name in html.
	 *
	 */
	_proto.addSibling = function(checkboxGroup) {
	this._siblings.push(checkboxGroup);
	}


	_proto.getNameAndValueFromThisCheckbox = function() {
	var nameForRequest = null;
	var valueForRequest = null;

		this._jq.children().each(function(){

			if (this.type == 'checkbox') {

    			if(this.checked) {
    			this.checked = true;
    			valueForRequest = this.value;
    			} 

    			if(!nameForRequest) {
    			nameForRequest = this.getAttribute("name");
    			}

    		}
    	
		});

	var nameAndValue = {};

	nameAndValue["name"] = nameForRequest;
	nameAndValue["value"] = valueForRequest;

	return nameAndValue;
	}


	/**
	 * return the serialized data from this input element.
	 *
	 */
	// _proto.serialize = function() {
	// //var inputValue = this._inputNode.value;
	// //var serializeValue = inputValue;//(inputValue == placeholder) ? "" : inputValue;
	// //return encodeURIComponent(this._inputNode.name) + "=" + encodeURIComponent(serializeValue);
	
	// var checkedOptions = [];
	// var nameForRequest = null;

	// 	this._jq.children().each(function(){

	// 		if (this.type == 'checkbox') {

 //    			if(this.checked) {
 //    			this.checked = true;
 //    			checkedOptions.push(this.value);
 //    			} 

 //    			if(!nameForRequest) {
 //    			nameForRequest = this.getAttribute("name");
 //    			}

 //    		}
    	
	// 	});

	// var stringFromArray = $.stringify(checkedOptions);
	// return encodeURIComponent(nameForRequest) + "=" + encodeURIComponent(stringFromArray);

	// }

	/**
	 * serialize. get the serialization from all of the siblings and return the array.
	 *
	 */
	_proto.serialize = function() {
	var checkedOptions = [];
	var nameForRequest = null;
	var siblings = this._siblings;

	var thisNameValue = this.getNameAndValueFromThisCheckbox();

	var thisName = thisNameValue["name"];
	var thisValue = thisNameValue["value"];

	checkedOptions.push(thisValue);


		for(var i=0; i<siblings.length; i++) {
		var sib = siblings[i];
		var nameValue = sib.getNameAndValueFromThisCheckbox();
		var value = nameValue["value"];
			if(value) {
			checkedOptions.push(value);	
			}
		}

	var stringFromArray = $.stringify(checkedOptions);
	return encodeURIComponent(thisName) + "=" + encodeURIComponent(stringFromArray);
	}


});