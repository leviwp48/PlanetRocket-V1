BlueBox.compose("util.hyperzone.HyperData", function(_class, _proto) {

var HyperZone  = BlueBox.port("util.hyperzone.HyperZone");

_class.numInst = 0;


	_proto._build = function(data) {
	this._data = data;

	this._currentHyperZone;

	this._zonesKVP = {};
	this._zones = [];

	_class.numInst++;

	this.uid = _class.numInst+'37dsb';
	this.deleteFlag = this.uid+'8';

	this._inBatchDelete = false;

	}


	/**
	 * bind the hyper-object to the data-object. 
	 * All of the hyper-objects are in a dictionary, each keyed to 
	 * its hyperzone's uid. The dictionary is keyed to the hyper-data's uid.
	 *
	 */
	// _proto.bindHyperObj = function(dataObj, hyperObj, hyperzone) {
	// var dUID = this.uid;
	// var hUID = hyperzone.uid;

	// var hArr = dataObj[dUID];

	// 	if(!hArr) {
	// 	hArr = {};
	// 	dataObj[dUID] = hArr;
	// 	}

	// hArr[hUID] = hyperObj;
	// hyperObj.setDataObj(dataObj);
	// }
	// _proto.unbindHyperObj = function(dataObj, hyperObj, hyperzone) {
	// var dUID = this.uid;
	// var hUID = hyperzone.uid;

	// var hArr = dataObj[dUID];

	// 	if(hArr) {
	// 	hArr[hUID] = null;
	// 	}

	// hyperObj.setDataObj(null);
	// }
	// _proto.bindHyperObj = function(dataObj, hyperObj, hyperzone) {
	// var dUID = this.uid;
	// var hUID = hyperzone.uid;

	// var hArr = dataObj[dUID];

	// 	if(!hArr) {
	// 	hArr = {};
	// 	dataObj[dUID] = hArr;
	// 	}

	// hArr[hUID] = hyperObj;
	// hyperObj.setDataObj(dataObj);
	// }
	// _proto.unbindHyperObj = function(dataObj, hyperObj, hyperzone) {
	// var dUID = this.uid;
	// var hUID = hyperzone.uid;

	// var hArr = dataObj[dUID];

	// 	if(hArr) {
	// 	hArr[hUID] = null;
	// 	}

	// hyperObj.setDataObj(null);
	// }

	_proto.getHyperObjectFromData = function(dataObj, hyperzone) {
	var hArr = dataObj[this.uid];
		if(hArr) {
		return hArr[hyperzone.uid];
		}
	}


	_proto.loopZonesHandleAppendedData = function(dataObj) {
	var zones = this._zones;
	var deleteFlag = this.deleteFlag;
	var i=0;
	var len = zones.length;
	var zone;

	dataObj[deleteFlag] = false;

		for(i=0; i<len; i++) {
		zone = zones[i];
		zone.handleAppendedData(dataObj);
		}
	}
	_proto.loopZonesHandleDeletedData = function(dataObj) {
	var zones = this._zones;
	var i=0;
	var len = zones.length;
	var zone;

		for(i=0; i<len; i++) {
		zone = zones[i];
		zone.handleDeletedData(dataObj);
		}

	}
	_proto.loopZonesHandleEditedData = function(dataObj) {
	var zones = this._zones;
	var i=0;
	var len = zones.length;
	var zone;

		for(i=0; i<len; i++) {
		zone = zones[i];
		zone.handleEditedData(dataObj);
		}

	}


	_proto.removeDeletedData = function() {
	var data = this._data;
	var deleteFlag = this.deleteFlag;
	var i=0;
	var len = data.length;

		for(i=0; i<len; i++) {
		var d = data[i];
			if(d[deleteFlag]) {
			data.splice(i,1);
			this.loopZonesHandleDeletedData(d);
			len--;
			}

		}

	}



	/////////////
	//         //
	//  A P I  //
	//         //
	/////////////




	/**
	 * push a new data-element to the array. 
	 * this will loop through the active zones and tell them to make hyper-objects.
	 *
	 */
	_proto.append = function(dataObj) {
		if(!dataObj) {
		throw new Error("append: dataObj is null: "+dataObj);
		}
	this._data.push(dataObj);
	this.loopZonesHandleAppendedData(dataObj);
	}

	/**
	 * if you edit data, then this will handle the editing everywhere.
	 *
	 */
	_proto.edit = function(dataObj) {
	this.loopZonesHandleEditedData(dataObj);	
	}

	/**
	 * you don't delete data directly, you delete hyper-objects. For instance, you click a close icon on a row,
	 * and you want it to delete the row. Well you don't do that directly, you pass the hyper-object into the delete
	 * function and that will take care of everything.
	 *
	 */
	_proto.startBatchDelete = function() {
	this._inBatchDelete = true;
	}

	_proto.deleteUI = function(uiObj, hyperZoneID) {
	var zonesKVP = this._zonesKVP;
	var hZone = zonesKVP[hyperZoneID];

		if(!hZone) {
		throw new Error("deleteUI: no hyperzone found for id: "+hyperZoneID);
		}
	var dataObj = hZone._retriever.call(this,uiObj);
	this.delete(dataObj);
	}

	_proto.delete = function(dataObj) {
	var deleteFlag = this.deleteFlag;
	dataObj[deleteFlag] = true;	

		if(!this._inBatchDelete) {
		this.removeDeletedData();
		}	

	}

	_proto.endBatchDelete = function() {
	this._inBatchDelete = false;

		if(!this._inBatchDelete) {
		this.removeDeletedData();
		}	
	}

	_proto.zoneOn = function(key) {
	var zonesKVP = this._zonesKVP;
	var zone = zonesKVP[key];

		if(!zone) {
		throw new Error("no zone for key: "+key);
		}

	zone.zoneOn();
	}
	_proto.zoneOff = function(key) {
	var zonesKVP = this._zonesKVP;
	var zone = zonesKVP[key];

		if(!zone) {
		throw new Error("no zone for key: "+key);
		}

	zone.zoneOff();
	}


	/**
	 * for read only. don't mutate it from here. 
	 *
	 */
	_proto.getDataReadOnly = function() {
	return this._data;
	}


	/////////////////////
	//                 //
	//  Configuration  //
	//                 //
	/////////////////////


	_class.start = function(data) {
	return new _class(data);
	}
	_proto.end = function() {
	return this;
	}
	_proto.startHyperZone = function(key) {
	var zonesKVP = this._zonesKVP;

		if(zonesKVP[key]) {
		throw new Error("startHyperZone: zone already exists for key: "+key);
		}

	var zone = new HyperZone(this, key);

	zonesKVP[key] = zone;
	this._zones.push(zone);

	return zone;
	}


});