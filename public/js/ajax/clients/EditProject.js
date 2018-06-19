
/////////////////////////////////////////////////////////////
//                                                         //
//                                                         //
/////////////////////////////////////////////////////////////

BlueBox.compose(
	"ajax.clients.LaravelClient",  
	"ajax.clients.EditProject", function(_class, _proto, _super) {

	var HTMLHelper = BlueBox.port("util.HTMLHelper");
	var LightBox   = BlueBox.port("ui.LightBox");

	/**
	 * lifecycle function. the form succeeded
	 *
	 */
	_proto.formSucceeded = function() {
	//console.log(this.jsonData());

		if(!this._formSucceededLightBox) {
		this._formSucceededLightBox = new LightBox();
		}

	var recordID = this.getAJAX().editModeGetRecordID();
	var projectName = this.getAJAX().getClient().getInput("name").getValue();

	var lightbox = this._formSucceededLightBox;
	lightbox.open();

	var vgroup = HTMLHelper.i().vgroup();

	var v1 = HTMLHelper.i().vinner();
	var v2 = HTMLHelper.i().vinner();

	var b1 = HTMLHelper.i().box();
	var b2 = HTMLHelper.i().box();
	b1.css("padding","10px");
	b2.css("padding","10px");
	b2.css("height","100%");
	b2.css("vertical-align","middle");

	v1.append(b1);
	v2.append(b2);

	var titleRow = HTMLHelper.i().row("formstyles-success-big");
	titleRow.css("text-align","center");
	titleRow.html("Success!");

	var detailsRow1 = HTMLHelper.i().row();
	detailsRow1.css("text-align","center");
	detailsRow1.html('<h2>You changed your project: "'+projectName+'"</h2>');

	var detailsRow2 = HTMLHelper.i().row();
	detailsRow2.css("text-align","center");
	detailsRow2.css("margin-top","20px");
	detailsRow2.html('<h3><span id="lightbox-continue-editing" class="formstyles-linkstyle">Continue Editing</span>, or <a href="'+window["_APP_BASE"]+'/user/projects">See all your projects</a></h3>');

	b1.append(titleRow);
	b2.append(detailsRow1);
	b2.append(detailsRow2);

	vgroup.append(v1);
	vgroup.append(v2);

	lightbox.stage().append(vgroup);

		lightbox.beforeClose(function(){
		$('#lightbox-continue-editing').off('click');
		});

		$('#lightbox-continue-editing').on('click', function(e) {
		lightbox.close();
		});

	}





});