function _FileLoader(){

    if (!window.XMLHttpRequest && 'ActiveXObject' in window) {
        window.XMLHttpRequest= function() {
            return new ActiveXObject('MSXML2.XMLHttp');
        };
    }

this._queueFinishedResponder = null;

this._queue = [];

this._homeDirectory = '';

this._authHeader = null;

this._versionString = '';

this._localLoad = (window.location.href.substr(0,4) == "file");

var ctx = this;

this._loaders = {

    "js":
        function(url, responder) {
        var node = document.createElement('script');
        ctx.listenForLoad(node, url);
        node.type = 'text/javascript';
        node.async = true;
        node.src = url;
        //ctx.listenForLoad(node, url);
        (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(node);
        },

    "css":
        function(url, responder) {
        var node = document.createElement('link');
        ctx.listenForLoad(node, url);
        node.rel = 'stylesheet';
        node.async = true;
        node.href = url;
        //ctx.listenForLoad(node, url);
        document.getElementsByTagName('head')[0].appendChild(node);
        },

    "text":
        function(url, responder) {

            var xhr= new XMLHttpRequest();
            xhr.open('POST', url, true);

                //just set it to plain text and hope for the best.
                if(xhr.overrideMimeType) {
                xhr.overrideMimeType("text/plain");
                }

            //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
            //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/HTML_in_XMLHttpRequest
            //xhr.responseType = "document";

                //https://stackoverflow.com/questions/5507234/how-to-use-basic-auth-with-jquery-and-ajax
                if(ctx._authHeader) {
                xhr.setRequestHeader("Authorization", ctx._authHeader);
                }

            xhr.onreadystatechange= function() {

                //           console.log(this);

                if(this.readyState != 4) {
                return;
                }
                if (this.status!==200) {
                //console.log(this);
                throw new Error("Can't load: "+url+" status: "+this.status+' responseText: '+this.responseText);
                }
                if(responder) {
                responder(this.responseText);
                }

            ctx.loadNextURL();

            };
            xhr.send();

        }

    }


}


_FileLoader.prototype.listenForLoad = function(node, url) {
var ctx = this;
var loadNext = function(e) {ctx.loadNextURL()};

    if (node.addEventListener) {
    node.addEventListener("load", loadNext, false);
    node.addEventListener("error",
        function(e){
        throw new Error("Can't load: "+url+" "+e.message);
        });
    } else
    if (node.attachEvent) {
    node.attachEvent("onload", loadNext);
    node.attachEvent("onerror",
        function(){
        throw new Error("Can't load: "+url);
        });
    } else {
    node['onload'] = loadNext;
    node['onerror'] = function(e) {
        throw new Error("Can't load: "+url);
        }
    }
}


_FileLoader.prototype.loadNextURL = function() {
    if(this._queue.length == 0) {
        if(this._queueFinishedResponder) {
        this._queueFinishedResponder.call(this);
        }
    return;
    }

var versionString = this._versionString;
var loadObj = this._queue.pop();
var url = loadObj["url"];
var fileTypeOverride = loadObj["file_type_override"];
var responder = loadObj["responder"];
var urlLen = url.length;
var last3 =url.substr(urlLen-3);
var type;

var first4 = url.substr(0,4);

    if(last3 == ".js") {
    type = "js";
    } else
    if(last3 == "css") {
    type = "css";
    }
    else
    if(last3 == "son") {
    type = "text";
    }
    else
    if(last3 == "xml") {
    type = "text";
    }
    else
    if(last3 == "txt") {
    type = "text";
    }
    //ah hell just load html as plain text.
    else
    if(last3 == "tml") {
    type = "text";
    }

    if(fileTypeOverride) {
    type = fileTypeOverride;
    }

//console.log(first4+" "+last3+" "+url);

var loadThisURL = (first4 == "http") ? url : this._homeDirectory + url;

loadThisURL = (versionString != '') ? loadThisURL+'?v='+versionString : loadThisURL;

this._loaders[type](loadThisURL, responder);
}


_FileLoader.prototype.enqueue = function(url, responder, fileTypeOverride) {
this._queue.push({"url":url, "responder":responder, "file_type_override":fileTypeOverride});
}
_FileLoader.prototype.resolveQueue = function(queueFinished) {
this._queueFinishedResponder = queueFinished;
this._queue.reverse();
this.loadNextURL();
}
_FileLoader.prototype.homeDirectory = function(homeDirectory) {
this._homeDirectory = homeDirectory;
}
_FileLoader.prototype.basicAuth = function(username, password) {
this._authHeader =  "Basic " + btoa(username + ":" + password);
}

_FileLoader.prototype.setVersion = function(version) {
this._versionString = version;
}





//list all of the dependencies in order. You have to figure this out yourself.
//the queue for the main page. jquery and the external script.
var mainPageLoader = new _FileLoader();

var user = window['user'];
var useAlexDebug = false;

    if(user) {
        if(user['email'] == 'alexjameslowe@gmail.com') {
        useAlexDebug = true;
        }
    }

mainPageLoader.homeDirectory(window["_APP_BASE"]);
mainPageLoader.setVersion("1.1");


    mainPageLoader.enqueue("/css/form-styles.css");
    mainPageLoader.enqueue("/css/dropzone.css");

    mainPageLoader.enqueue("/js/lib/jquery-3.2.1.min.js");
    mainPageLoader.enqueue("/js/lib/BlueBox.js");
    mainPageLoader.enqueue("/js/lib/dropzone.js");
    mainPageLoader.enqueue("/js/lib/jquery-extend-with-stringify.js");

    mainPageLoader.enqueue("/js/util/HTMLHelper.js");

    mainPageLoader.enqueue("/js/formkit/EndCapButton.js");
    mainPageLoader.enqueue("/js/formkit/EndCapButton2.js");

    mainPageLoader.enqueue("/js/util/HTML.js");
    mainPageLoader.enqueue("/js/util/Helper.js");
    mainPageLoader.enqueue("/js/util/resizers/ResizeHandler.js");
    mainPageLoader.enqueue("/js/util/resizers/VerticalGroup.js");

        //if(useAlexDebug) {
        mainPageLoader.enqueue("/js/util/LinkedList.js");
        mainPageLoader.enqueue("/js/util/hyperzone/HyperZone.js");
        mainPageLoader.enqueue("/js/util/hyperzone/HyperData.js");
      //  }

    mainPageLoader.enqueue("/js/ui/StickyTopNav.js");
    mainPageLoader.enqueue("/js/ui/sidebar/SideBar.js");
    mainPageLoader.enqueue("/js/ui/sidebar/content/SideBarBaseContent.js");
    mainPageLoader.enqueue("/js/ui/sidebar/content/CollapsibleMenu.js");
    mainPageLoader.enqueue("/js/ui/LightBox.js");



        // if(useAlexDebug) {
        // mainPageLoader.enqueue("/js/ui/TreeDisplayPanel-alex.js");
        // mainPageLoader.enqueue("/js/ui/TreeDisplay-alex.js");
        // } else {
        mainPageLoader.enqueue("/js/ui/TreeDisplayPanel.js");
        mainPageLoader.enqueue("/js/ui/TreeDisplay.js");
        //}

    mainPageLoader.enqueue("/js/applications/AppBase.js");

    mainPageLoader.enqueue("/js/formkit/FormError.js");

    mainPageLoader.enqueue("/js/ajax/Ajax.js");
    mainPageLoader.enqueue("/js/ajax/XHRWrapper.js");
    mainPageLoader.enqueue("/js/ajax/XHR.js");
    mainPageLoader.enqueue("/js/ajax/inputs/BaseInputInterface.js");
    mainPageLoader.enqueue("/js/ajax/inputs/LaravelTextInput.js");


        // if(useAlexDebug) {
        // mainPageLoader.enqueue("/js/ajax/inputs/LaravelNeedInput-alex.js");
        // } else  {
        mainPageLoader.enqueue("/js/ajax/inputs/LaravelNeedInput.js");
        //}


    mainPageLoader.enqueue("/js/ajax/inputs/laravel-image-upload-panel/LaravelImageUploadPanel.js");
    mainPageLoader.enqueue("/js/ajax/inputs/laravel-image-upload-panel/ImageUploadRow.js");

    mainPageLoader.enqueue("/js/ui/UserNavWidget.js");

    mainPageLoader.enqueue("/js/ajax/inputs/LaravelSubmitButton.js");
    mainPageLoader.enqueue("/js/ajax/clients/BaseClientInterface.js");
    mainPageLoader.enqueue("/js/ajax/clients/LaravelClient.js");
    mainPageLoader.enqueue("/js/ajax/clients/EditProject.js");
    mainPageLoader.enqueue("/js/ajax/servers/BaseServerInterface.js");

    mainPageLoader.enqueue("/js/ajax/servers/LaravelServer.js");

    mainPageLoader.enqueue("/js/formkit/table/pagination/Pagination.js");
    mainPageLoader.enqueue("/js/formkit/table/Cell.js");
    mainPageLoader.enqueue("/js/formkit/table/Row.js");
    mainPageLoader.enqueue("/js/formkit/table/Column.js");
    mainPageLoader.enqueue("/js/formkit/table/servers/BaseServerInterface.js");
    mainPageLoader.enqueue("/js/formkit/table/servers/JoinRequestToServer.js");
    mainPageLoader.enqueue("/js/formkit/table/Table.js");
    mainPageLoader.enqueue("/js/formkit/table/prefabs/JoinRequestsTable.js");

    mainPageLoader.enqueue("/js/applications/AppEditProject.js");



//load up the queue
mainPageLoader.resolveQueue(
    function(){
    $(document).ready(blue.applications.AppEditProject.bootstrap());
    });
