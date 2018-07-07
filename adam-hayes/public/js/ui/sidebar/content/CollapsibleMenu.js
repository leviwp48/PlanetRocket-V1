////////////////////////////////////////////////////////////////////
//                                                                //
//  Collapsible menu. This is meant handle the common use-case    //
//  of a side-menu of collpsible options                          //
//                                                                //
////////////////////////////////////////////////////////////////////

BlueBox.compose("ui.sidebar.content.SideBarBaseContent", "ui.sidebar.content.CollapsibleMenu",
function(_class, _proto, _super) {

_class._CONTENT_;
_class._BACK_;

	_proto._build = function() {
	var ctx = this;

		//pull the content off of the dom and cache it.
		if(!_class._CONTENT_) {
		var contentPane = $('#nav_sidebar_content');
		contentPane.detach();

		_class._CONTENT_ = contentPane;
		_class._BACK_ = contentPane.find("[id='sidenav_header']");

		contentPane.attr("class","row");
		contentPane.attr("style","");

		}

	this._content = _class._CONTENT_;
	this._back = _class._BACK_;

	this._sideNavUserNameElement = this._content.find("[id='sidebar_nav_widget_name']");

	$('#hamburger_menu_icon').on("click",function(){
		ctx.owner().toggleAnimateSideBar();
		});



	}

	/**
	 * gets called when the screen has a new size
	 *
	 */
	_proto.resize = function(size) {}


	/**
	 * return either a jquery or dom-node from this function for the content that you want to show
	 *
	 */
	_proto.provideContent = function() {
	return this._content;
	}


	/**
	 * lifecycle function. the animation-in started
	 *
	 */
	_proto.animateInStart = function() {}


	/**
	 * lifecycle function. the animation-in ended
	 *
	 */
	_proto.animateInEnd = function() {
	var ctx = this;
	this.collapsableSideNavBehaviorOn();

	this._back.on("click", function(){
		ctx.owner().toggleAnimateSideBar();
		});

	}
	
	/**
	 * lifecycle function. the animation-out started
	 *
	 */
	_proto.animateOutStart = function() {
	this.collapsableSideNavBehaviorOff();

	this._back.off("click");
	}
	

	/**
	 * lifecycle function. the animation-out ended
	 *
	 */
	_proto.animateOutEnd = function() {}


	/**
	 * turn the collapsible behavior on or off.
	 *
	 */
	_proto.collapsableSideNavBehaviorOn = function() {
	var ctx = this;

	  $('.mobile_ul').on('click.SideBarNav_click', function(e){
	  var target = $(e.target);

	  var expandTarget = target.next();

	    if(expandTarget.length != 0) {
	    var animationData = expandTarget.data('animation');

	      if(!animationData) {
	      animationData = {"transit":false, "closed":true};
	      expandTarget.data('animation',animationData);
	      }

	    ctx.toggleExpand(expandTarget);

	    }

	  });

	this._sideNavUserNameElement.trigger("click.SideBarNav_click");

	}
	_proto.collapsableSideNavBehaviorOff = function() {
	this._sideNavUserNameElement.trigger("click.SideBarNav_click");
	$('.mobile_ul').off('click.SideBarNav_click');
	}



	_proto.toggleExpand = function(jEl, skipAnimation) {
	var data = jEl.data('animation');
	var duration = skipAnimation ? 0 : 250;

		if(data.transit == false) {

		  if(data.transit) {
		  return;
		  }

		  if(data.closed) {

		  data.closed = false;
		  data.transit = true;

		  jEl.css('height','auto');
		  var offsetHeight =  jEl.get(0).offsetHeight+'px';
		  jEl.css('height','0px');


		    jEl.animate(
		      {'height':offsetHeight},
		      {duration:duration, complete:
		        function() {
		        data.transit = false;
		        jEl.css('height','auto');
		        }
		      });

		  } else {
		  data.closed = true;
		  data.transit = true;

		      jEl.animate(
		      {'height':'0px'},
		      {duration:duration, complete:
		        function() {
		        data.transit = false;
		        }
		      });

		  }

		}

	}


	_proto.destroy = function() {
	$('#hamburger_menu_icon').off("click");
	this._back.off("click");
	this._content = null;
	this._back = null;
	}



});