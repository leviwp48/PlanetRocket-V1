/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
//  http://stackoverflow.com/questions/2557247/easiest-way-to-retrieve-cross-browser-xmlhttprequest        //
//  http://www.quirksmode.org/js/xmlhttp.html                                                              //
//  *** Excerpt from quirksmode.com ***                                                                    //
//  This function creates a new XMLHttpRequest object for every request you make.                          //
//  In simple cases such as this site, where every page fetches only three to five files,                  //
//  I don't mind creating three to five objects. In more complex sites, however, where any                 //
//  page can make an arbitrary amount of requests, it's probably better to write a function                //
//  that reuses existing XMLHttpRequest objects.                                                           //
//  *** ***                                                                                                //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
//  
// 0	UNSENT	Client has been created. open() not called yet.
// 1	OPENED	open() has been called.
// 2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
// 3	LOADING	Downloading; responseText holds partial data.
// 4	DONE	The operation is complete.
//

// status 304:
// https://stackoverflow.com/questions/5173656/how-to-check-if-jquery-ajax-request-header-status-is-304-not-modified

// status 200 everything is ok.
// status 404 not found

// status 0 responseText is empty. browsers will tend to do this if you're running the code locally on your browser
// which sometimes its handy to do.

BlueBox.compose("ajax.XHRWrapper", function(_class, _proto) {


	_proto._build = function(xhr) {
	this.available = true;
	this._type = "";
	this._url = "";
	this._method = "";
	this._onSuccess = null;
	this._onError = null;
	this._data = null;
	this._runLocally = false;


		if(window.XMLHttpRequest) {
		this.xhr = new XMLHttpRequest();
		this._type = "xmlhttp";
		} else 
		if(window.XDomainRequest) {
		this.xhr = new XDomainRequest();
		this._type = "xdomain";
		} else { 

		var badOld = [
		    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	    	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	    	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
			];

		var xhr = null;

		    for (var i=0; i<badOld.length; i++) {
		        try {
		        xhr = badOld[i]();
		        }
		        catch (e) {
		        continue;
		        }
		    break;
		    }

		this.xhr = xhr;
		this._type = "activex";
		}

		if(!this.xhr) {
		throw new Error("We did not find a compatible replacement for XMLHttpRequest");
		}

	}


	_proto.setURL = function(url) {
	this._url = url;
	}
	_proto.setOnSuccess = function(onSuccess) {
	this._onSuccess = onSuccess;
	}
	_proto.setOnError = function(onError) {
	this._onError = onError;
	}
	_proto.setData = function(data) {
	this._data = data;
	}
	_proto.getData = function() {
	return this._data;
	}
	_proto.setMethod = function(method) {
	this._method = method;
	}
	_proto.setRunLocally = function(runLocally) {
	this._runLocally = runLocally;
	}
	_proto.setRequestHeader = function(key,value) {
		if(this._type != "xdomain") {
		this.xhr.setRequestHeader(key,value);
		}
	}
	_proto.open = function() {
	this.xhr.open(this._method, this._url, true);
	}

	_proto.send = function() {	
	var xhr = this.xhr;
	var ctx = this;

	//console.log("send: this._type: "+this._type);

		//https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest/responseText
		//https://stackoverflow.com/questions/8559747/new-xmlhttprequest-in-ie9-causes-a-jscript-runtime-error-object-doesnt-support
		if(this._type == "xdomain") {

		//this ain't my first rodeo. I know the kind of shit MS always pulls.
		xhr.onload = null;
		xhr.onerror = null;

		 	xhr.onload = function() {
		 	ctx.available = true;
		    ctx._onSuccess.call(this, xhr.responseText);  
		    };
		    xhr.onerror = function() {
		    ctx.available = true;
		    ctx._onError.call(this, xhr, xhr.responseText, xhr.statusText);	
		    }
		    xhr.timeout = 0;

		    //http://perrymitchell.net/article/xdomainrequest-cors-ie9/
			xhr.onprogress = function() {}; // no aborting
			xhr.ontimeout = function() {}; // "

		} else {

		var successCode = (this._runLocally) ? 0 : 200;

		xhr.onreadystatechange=function() {
	     		if (xhr.readyState==4) {
	     		ctx.available = true;

	     			if(xhr.status==successCode) {
	          		ctx._onSuccess.call(this, xhr.responseText);
	          		} else {
	          		ctx._onError.call(this, xhr, xhr.responseText, xhr.statusText);
	          		}

	     		}
			};

		}

	this.available = false;
    xhr.send(this._data);
	}


});