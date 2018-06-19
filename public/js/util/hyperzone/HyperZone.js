BlueBox.compose("util.hyperzone.HyperZone", function(_class, _proto) {

var Link = BlueBox.port("util.Link");
var Chain = BlueBox.port("util.Chain");

_class.numInst = 0;

	_proto._build = function(hyperData, name) {
	this._hyperData = hyperData;

	this._name = name;

	this._cacheWhenInactive = true;

	this._createHyperActive = null;

	this._retrieveBindingContext = null;

	this._active = false;

	this._binder = null;

	this._retriever = null;

	_class.numInst++;

	this.uid = hyperData.uid+'38h'+_class.numInst;
	this.linkName = this.uid+'0';

	this._cache = new Chain();
	}



	_proto.getLink = function(dataObj) {
	var linkName = this.linkName;
	var link = dataObj[linkName];
		if(!link) {
		link = new Link();
		dataObj[linkName] = link;

		link['data_object'] = dataObj;
		}
	return link;
	}

	_proto.cache = function(dataObj, cachedAction) {
		if(!dataObj) {
		throw new Error("cache dataObj is null");
		}


	var link = this.getLink(dataObj);

	link["cached_action"] = cachedAction;

		if(!link.isAdded()) {
		this._cache.append(link);
		}

	}

	_proto.resolveCache = function() {
	var cache = this._cache;
	var link = null;
	cache.seekToStart();

		while(link = cache.getNext()) {

		var cachedAction = link["cached_action"];
		var dataObj = link["data_object"];

			if(cachedAction == "add") {
			this.handleAppendedData(dataObj);
			} else 
			if(cachedAction == "edit") {
			this.handleEditedData(dataObj);
			} else 
			if(cachedAction == "remove") {
			this.handleDeletedData(dataObj);
			} else {
			throw new Error("unrecognized cached action: "+cachedAction);
			}

		}

	this._cache.empty();
	}

	_proto.bindHyperObj = function(dataObj, hyperObj) {
	var hyperData = this._hyperData;
	var dUID = hyperData.uid;
	var hUID = this.uid;

	var hArr = dataObj[dUID];

		if(!hArr) {
		hArr = {};
		dataObj[dUID] = hArr;
		}

	hArr[hUID] = hyperObj;
	
	this._binder.call(this, dataObj, hyperObj);
	}
	_proto.unbindHyperObj = function(dataObj, hyperObj) {
	var hyperData = this._hyperData;
	var dUID = hyperData.uid;
	var hUID = this.uid;

	var hArr = dataObj[dUID];

		if(hArr) {
		hArr[hUID] = null;
		}

	this._binder.call(this, null, hyperObj);
	}


	_proto.handleDeletedData = function(dataObj) {
	var hyperData = this._hyperData;
	var dUID = hyperData.uid;

		//hyper-object, bind the data to it, and then tell the zone to remove it right now.
		if(this.isActive()) {
		var hyperObj = hyperData.getHyperObjectFromData(dataObj, this);

			//we have a little riddle where a cached instruction changes from add to remove. in that case
			//the ui "hyper" object was never bound in the first place, so the above function call will
			//return null if that's the case. So if that returns null, then just skip this.
			if(hyperObj) {
			this.unbindHyperObj(dataObj, hyperObj);
			this._removeHyperObj.call(this, dataObj, hyperObj);	
			}
		} 

		//else, cache a deletion.
		else {
		this.cache(dataObj, "remove");
		}
	}
	_proto.handleAppendedData = function(dataObj) {
	var hyperData = this._hyperData;

		//hyper-object, bind the data to it, and then tell the zone to add it right now.
		if(this.isActive()) {
		var hyperObj = this._createHyperObj.call(this, dataObj);
		this.bindHyperObj(dataObj, hyperObj);
		this._addHyperObj.call(this, dataObj, hyperObj);
		} 

		//else, cache an addition.
		else {
		this.cache(dataObj, "add");
		}

	}
	_proto.handleEditedData = function(dataObj) {
	var hyperData = this._hyperData;
		
		//hyper-object, bind the data to it, and then tell the zone to add it right now.
		if(this.isActive()) {
		var hyperObj = hyperData.getHyperObjectFromData(dataObj, this);
		this._editHyperObj.call(this, dataObj, hyperObj);	
		} 

		//else, cache an addition.
		else {
		this.cache(hyperObj, "edit");
		}
	}

	_proto.isActive = function() {
	return this._active;
	}



	/////////////
	//         //
	//  A P I  //
	//         //
	/////////////



	/**
	 * bring the zone to life and resolve the cache. So everything that 
	 * happened while this zone was dormant will run on this zone and bring
	 * it up to date.
	 *
	 */
	_proto.zoneOn = function() {
		if(!this.isActive()) {
		this._active = true;
		this._hyperZoneOn.call(this);
		this.resolveCache();
		}
	}

	/**
	 * turn the zone off. everything that happens to the data will now go to the cache.
	 *
	 */
	_proto.zoneOff = function() {
		if(this.isActive()) {
		this._active = false;
		this._hyperZoneOff.call(this);
		}
	}


	/////////////////
	//             //
	//  Configure  //
    //             //
    /////////////////

	_proto.onZoneOn = function(callback) {
	this._hyperZoneOn = callback;
	return this;
	}
	_proto.onZoneOff = function(callback) {
	this._hyperZoneOff = callback;
	return this;
	}
	_proto.onCreate = function(callback) {	
	this._createHyperObj = callback;
	return this;
	}
	_proto.onAdd = function(callback) {
	this._addHyperObj = callback;
	return this;
	}
	_proto.onEdit = function(callback) {
	this._editHyperObj = callback;
	return this;
	}
	_proto.onRemove = function(callback) {
	this._removeHyperObj = callback;
	return this;
	}
	_proto.setBind = function(callback) {
	this._binder = callback;
	return this;
	}
	_proto.setRetrieve = function(callback) {
	this._retriever = callback;
	return this;
	}
	_proto.endHyperZone = function() {
	return this._hyperData;
	}





});