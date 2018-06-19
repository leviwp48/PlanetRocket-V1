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

/*

    XHR.postRequest()
        .url(window["_APP_BASE"]+"/user/test-ajax-hook")
        .data({"test":"starwars"})
        .addData("_token", $('meta[name="csrf-token"]').attr('content'))
        .onSuccess(function(responseText) {
            logArea.html("success: "+responseText);
        })
        .onError(function(xhr, status, error) {
            logArea.html("error: "+status);
        })
        .send();

*/


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


BlueBox.compose("ajax.XHR", function(_class, _proto) {

_class.XHRObjects = [];

var XHRWrapper = BlueBox.port("ajax.XHRWrapper");

_proto._build = function(method) {
this._method = method;
this._opened = false;
this._xhr = this.getXHR();
this._xhr.setMethod(method);
}

_proto.getXHR = function() {

var existingObjs = _class.XHRObjects;
var existingObj;
var len = existingObjs.length;

	//loop through and see if there's any that we might use.
	for(var i=0; i<len; i++) {
	existingObj = existingObjs[i];
		if(existingObj.available) {
		return existingObj;
		}
	}

var xhr = new XHRWrapper();

return xhr;
}



// implement JSON.stringify serialization
//https://www.sitepoint.com/javascript-json-serialization/
//https://gist.github.com/chicagoworks/754454
_proto.stringify = function(obj) {         
        if ("JSON" in window) {
            return JSON.stringify(obj);
        }

        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj.replace(/"/g,'\\\"') + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") {
                        v = '"' + v.replace(/"/g,'\\\"') + '"';
                    } else if (t == "object" && v !== null){
                        v = jQuery.stringify(v);
                    }
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }

            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }


_proto.serializeJSON2Post = function(obj) {
var encoded = [];

	if(obj.constructor === Array) {
	var i=0;
	var len = obj.length;
	var child;
		for(i=0; i<len; i++) {
		child = obj[i];
        var encodedChild = this.isSimplePrimitive(child) ? child+"" : this.stringify(child);
		var component = encodeURIComponent(i) + "=" + encodeURIComponent(encodedChild == null ? "" : encodedChild);
		encoded.push(component);
		}

	} else {
	var key;
	var child;
		for(key in obj) {
		child = obj[key];
        var encodedChild = this.isSimplePrimitive(child) ? child+"" : this.stringify(child);
		var component = encodeURIComponent(key) + "=" + encodeURIComponent(encodedChild == null ? "" : encodedChild);
		encoded.push(component);
		}

	}

return encoded.join('&');
}


_proto.isSimplePrimitive = function(obj, ignoreError) {
    if(obj === null) {
        if(!ignoreError) {
        throw new Error("isSimplePrimitive: obj cannot be null");
        }
    }
var typeOf = typeof obj; 
//var typeOf = typeof data; fails silently!!!
var simple = {"string":true, "number":true, "boolean":true};
return simple[typeOf] ? true : false;
}


/////////////
//         //
//  A P I  //
//         //
/////////////


_class.postRequest = function() {
return new _class("POST");
}
_class.getRequest = function() {
return new _class("GET");
}
_proto.url = function(url) {
this._xhr.setURL(url);
return this;
}
_proto.data = function(data) {

    if(this.isSimplePrimitive(data)) {

        if(typeof data === "string") {
        this._xhr.setData(data);
        } else {
        throw new Error("data must be either a serialized string of post data, or a json object.");
        }

    } else {
    var serialized = this.serializeJSON2Post(data);
    this._xhr.setData(serialized);   
    }

return this;
}
_proto.addData = function(key, value) {

    if(typeof key !== "string") {
    throw new Error("appendData: key must be string: key = "+key);
    }

var encodedValue = this.isSimplePrimitive(value) ? value+"" : this.stringify(value);

var component = encodeURIComponent(key) + "=" + encodeURIComponent(encodedValue == null ? "" : encodedValue);

var currentData = this._xhr.getData();

    if(currentData) {
    currentData += "&"+component;
    } else {
    currentData = component;
    }

this._xhr.setData(currentData);

return this;
}

_proto.onSuccess = function(onSuccess) {
this._xhr.setOnSuccess(onSuccess);
return this;
}
_proto.onError = function(onError) {
this._xhr.setOnError(onError);
return this;
}
_proto.requestHeader = function(key, value) {
	if(!this._opened) {
	this._opened = true;
	this._xhr.open();
	}
this._xhr.setRequestHeader(key,value);
return this;

}
_proto.send = function() {
	if(!this._opened) {
	this._opened = true;
	this._xhr.open();
	}

	if(this._method == "POST" && this._xhr._data) {
	this._xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	}

this._xhr.send();
}



});