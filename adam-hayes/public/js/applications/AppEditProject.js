/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
//  Main Page javascript application.                                          //
//  Handles all the bells and whistles, and feeds all the different modules    //
//  lifecycle delegate calls.                                                  //
//  Author- Alex Lowe                                                          //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////

BlueBox.compose('applications.AppBase', 'applications.AppEditProject', function(_class, _proto, _super) {

var StickyTopNav 	    = BlueBox.port("ui.StickyTopNav");
var SideBarNav 	    	= BlueBox.port("ui.SideBarNav");
var Ajax                = BlueBox.port("ajax.Ajax");
var XHR                 = BlueBox.port("ajax.XHR");
var JoinRequestsTable   = BlueBox.port("formkit.table.prefabs.JoinRequestsTable");
var LightBox            = BlueBox.port("ui.LightBox");
var HTML                = BlueBox.port("util.HTML");
var VerticalGroup       = BlueBox.port("util.resizers.VerticalGroup");

_class.bootstrap = function() {
	if(_class._INSTANCE_) {
	return;
	}
_class._INSTANCE_ = new _class();
_class._INSTANCE_.init();
_class._INSTANCE_.bootstrap();
}
_class.getInstance = function() {

	if(!_class._INSTANCE_) {
	throw new Error("App instance wasn't started. App.bootstrap must be called first.");
	}

return _class._INSTANCE_;
}

_proto.initModules = function() {

var ctx = this;

this.newModule('sticky-top-nav', StickyTopNav);

//this.newModule('sidebar-nav', SideBarNav);

var existingData = window["project"];

Ajax.bootstrap(existingData);

var projectID = this.getProjectID();

this._joinRequestsTable = new JoinRequestsTable("join-requests-table", projectID, this);
this._joinRequestsTable.init();

var uID = this.getURLParameter("u");
var requestJoinID = this.getURLParameter("j");

//console.log("uID: "+uID+" requestJoinID:"+requestJoinID);
//console.log("projectID: "+this.getProjectID());
//uID: join-request-7 requestJoinID:7
//ok that works.
// var projectID = this.getProjectID();//'18020'; //this.getProjectID()
//console.log("projectID: "+projectID);
//if an h-box passes a certain width, it's going to have to turn into rows. So the h-box wrapper will turn into a row,
// and the each of the boxes will


//Demonstrates an h-group where the group switches to vertically-stacking rows at the critical width.
// HTML.i()
//     .cacheStart()
//         .hgroup().class("switch-to-rows")
//             .box().style("width","50px").style("background","#FF0000")
//                 .html("??")
//             ._()
//             .box().style("width","50px").style("background","#00FF00")
//                 .html("??")
//             ._()
//             .box().style("width","100%").style("background","#0000FF")
//                 .html("??")
//             ._()
//         ._()
//     .cacheTo($("#alex-layout-test"));


//This demonstrates that one of the h-conserved elements will actually switch to its own h-group
//at the critical width, and you can even give it a helper max-width class "switch-mw" which will
//give that h-group its own max-width when the switch occurs.

// HTML.i()
//     .cacheStart()
//         .hgroup().class("switch-to-rows")
//             .box().style("width","50px").style("background","#FF0000")
//                 .html("??")
//             ._()

//                 .box().class("switch-to-hgroup switch-mw-100px")
//                 //.style("width","100px")
//                 .style("width","calc(50% - 100px)")

//                     .box()
//                         .style("width","50%").style("background","#0066CC")
//                         .html("e")
//                     ._()
//                     .box()
//                         .style("width","50%").style("background","#CC0066")
//                         .html("e")
//                     ._()

//                 ._()


//             .box().style("width","50px").style("background","#00FF00")
//                 .html("??")
//             ._()
//             //.box().style("width", "calc(100% - 200px").style("background","#0000FF")
//             .box().style("width", "calc(50% - 100px").style("background","#0000FF")
//                 .html("??")
//             ._()
//         ._()
//     .cacheTo($("#alex-layout-test"));



///Testing a new vertical-conservation solution for more acrobatic scenarios like
//lighboxes. The vgroup vinner thing works for only very simple things like basic page-layout i.e. the "holy-grail" layout.
//everywhere else it's much more advisable to use somethng like this.


// var lb = new LightBox();
// lb.open({"height":"80%"});

//     var e = HTML.i()
//         .cacheStart()
//             .div().class("row fill")
//             .attr("style","padding:10px; background:#0066CC")
//                 .row()
//                 .attr("style","padding:10px; background:#0099AA")
//                 .html("hey yo")
//                 ._()
//                 .row()
//                 .attr("style","padding:10px; background:#FF0000; height:100%;")
//                     .html("testing123")
//                 ._()
//                 .row()
//                 .attr("style","padding:10px; background:#0099AA; height:100px;")
//                 .html("hey yo!")
//                 ._()
//             ._()
//         .cacheEnd();
//     var e2 = $(e);

// lb.stage().append(e2);

// this.addResizer(new VerticalGroup(e2));



/*
this.addResizer(function() {

var greedy;
var totalOffset = 0;

    e2.children().each(function() {
    var child = $(this);
        if(child.attr("greedy")) {
        greedy = child;
        } else {
        totalOffset += this.offsetHeight;
        }
    });

greedy.css("height","calc(100% - "+totalOffset+"px)");

});

*/




    if(uID && requestJoinID) {
            XHR.postRequest()
            .url(window["_APP_BASE"]+"/join-requests/get-join-request")
            .addData("_token", $('meta[name="csrf-token"]').attr('content'))
            .addData("join_request_id", requestJoinID)
            .onSuccess(function(responseText) {

                var joinRequestRecord = $.parseJSON(responseText);
                ctx._joinRequestsTable.openUpResponsePanel(joinRequestRecord);

            })
            .onError(function(xhr, status, error) {
            //ctx.showXHRError(status, error);
            })
            .send();
    }


}

_proto.getProjectID = function() {
var url = window.location.href;
var split = url.split("/");
var idAndParamString = split[split.length-1];
var idAndParams = idAndParamString.split("?");
return idAndParams[0]
}


_proto.getURLParameter = function(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


_proto.respondToJoinRequest = function(joinRequestRecord, requestWasAccepted, messageToUser) {
var ctx = this;

var loadingLB = new LightBox();
loadingLB.open({"height":"70%"});
loadingLB.mandatory(true);

messageToUser = messageToUser.trim();
messageToUser = (!messageToUser) ? "" : messageToUser;

var projectName = joinRequestRecord["project_name"];

var requesterName = joinRequestRecord["sender_name"];

HTML.i()
    .cacheStart()
        .prefab("big-loading-panel")._()
    .cacheTo(loadingLB.stage());

this._userNavWidget.removeNotificationWithUID("join-request-"+joinRequestRecord["id"]);

    XHR.postRequest()
    .url(window["_APP_BASE"]+"/join-requests/respond-to-join-request")
    .addData("_token", $('meta[name="csrf-token"]').attr('content'))
    .addData("join_request_id", joinRequestRecord["id"])
    .addData("message_to_user", messageToUser)
    .addData("granted", requestWasAccepted ? "yes" : "no")
    .onSuccess(function(responseText) {

    var messageLB = new LightBox();
    messageLB.open({"height":"70%"});

        HTML.i()
            .cacheStart()
                .abox()
                .attr("style","width:100%; height:100%; background:#FFFFFF;")
                    .box()
                    .attr("style", "width:100%; top:50%; transform:translateY(-50%); -ms-transform:translateY(-50%);")
                        .row()
                        .style("padding","15px")
                        .style("font-size","1.2em")
                        .style("font-weight","bold")
                        .style("text-align","center")

                            ._if(requestWasAccepted)
                                .style("color","white")
                                .style("background","url('"+window["_APP_BASE"]+"/images/stripe-green2.png') repeat")
                                .html(requesterName+" was added to project '"+projectName+"'")
                            ._else()
                                .style("color","#444444")
                                .style("background","url('"+window["_APP_BASE"]+"/images/stripe-light-grey.png') repeat")
                                .html(requesterName+" was not added to project '"+projectName+"'")
                            ._end()

                        ._()
                        .row()
                            .attr("style","text-align:center; margin-top:15px; padding-left:30px; padding-right:30px")

                            ._if(requestWasAccepted)

                                ._if(messageToUser != "")
                                    .html(requesterName+" will be notified that he/she is now included in your project, and we'll also send along your message!")
                                ._else()
                                    .html(requesterName+" will be notified that he/she is now included in your project!")
                                ._end()

                            ._else()

                                ._if(messageToUser != "")
                                    .html("Since you've included a message to "+requesterName+", we'll send it along.")
                                ._else()
                                    .html(requesterName+" will not be notified")
                                ._end()

                            ._end()

                        ._()

                    ._()

                ._()
            .cacheTo(messageLB.stage());






    })
    .onError(function(xhr, status, error) {
    ctx.showXHRError(error, xhr);
    })
    .send();
}



});
