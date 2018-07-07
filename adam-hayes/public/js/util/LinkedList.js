
BlueBox.compose('util.Chain', function(_class, _proto) {

   _proto._build = function() {

   this._first = null;
   this._last = null;
   this._empty = true;
   this._numChildren = 0;

   this._loopIteration = null;
   }


   _proto._reassignFirst = function(link) {
   var first = this._first;
      if(first) {
      first._setIsFirst(false);
      }
      if(link) {
      link._setIsFirst(true);
      }
   this._first = link;  
   }
   _proto._reassignLast = function(link) {
   var last = this._last;
      if(last) {
      last._setIsLast(false);
      }
      if(link) {
      link._setIsLast(true);
      }
   this._last = link;   
   }



   _proto.append = function(link) {
      
      if(!this._first) {
      this._first = link;
      this._last = link;
      link._isFirst = true;
      link._isLast = true;
      } else {

      var last = this._last;
      last._setNext(link);
      link._setPrev(last);

      this._reassignLast(link);
      }
      
   link._isAdded = true;
   }
   _proto.prepend = function(link) {
      if(!this._first) {
      this._first = link;
      this._last = link;
      } 

      var first = this._first;
      first._setPrev(link);
      link._setNext(first);

      this._reassignFirst(link);
      
   link._isAdded = true;
   }
   _proto.insertAfter = function(link, after) {
   after._setNext(link);
   link._setPrev(after);

      if(after.getIsLast()) {
      this._reassignLast(link);
      }

   link._isAdded = true;
   }

   _proto.insertBefore = function(link, before) {
   before._setPrev(link);
   link._setNext(before);

      if(before.getIsFirst()) {
      this._reassignFirst(link);
      }

   link._isAdded = true;
   }


   _proto.seekToStart = function() {
   //this._loopIteration = this._first;
   this._loopIteration = null;
   }
   _proto.seekToEnd = function() {
   this._loopIteration = this._last;
   }

   _proto.getNext = function() {
      if(!this._loopIteration) {
      this._loopIteration = this._first;
      return this._loopIteration;
      } else {
      var next = this._loopIteration.getNext();
      this._loopIteration = next;
      return next;
      }
   }
   _proto.getPrev = function() {
      if(!this._loopIteration) {
      this._loopIteration = this._last;
      return this._loopIteration;
      } else {
      var next = this._loopIteration.getPrev();
      this._loopIteration = next;
      return next;
      }
   }



   _proto.remove = function(link) {
   var next = link.getNext();
   var prev = link.getPrev();

      if(link.getIsFirst()) {
      this._reassignFirst(next);
      }
      if(link.getIsLast()) {  
      this._reassignLast(prev);
      }

      if(prev) {
      prev._setNext(next);
      }
      if(next) {
      next._setPrev(prev);
      }
 
   link._setNext(null);
   link._setPrev(null);

   link._isAdded = false;
   }



   _proto.isEmpty = function() {
   return (!this._first && !this._last);
   }


   _proto.empty = function() {
   var link = null;
   this.seekToStart();

      while(this._first) {
      this.remove(this._first);
      }

      if(!this.isEmpty()) {
      throw new Error("Chain: empty: not empty");
      }

   }

});




BlueBox.compose('util.Link', function(_class, _proto) {

   _proto._build = function() {
   this._next = null;
   this._prev = null;
   this._isFirst = false;
   this._isLast = false;
   this._isAdded = false;
   }  

   _proto.isAdded = function() {
   return this._isAdded;
   }

   _proto._setIsFirst = function(bool) {
   this._isFirst = bool;
   }
   _proto._setIsLast = function(bool) {
   this._isLast = bool;
   }
   _proto._setNext = function(link) {
   this._next = link;
   }
   _proto._setPrev = function(link) {
   this._prev = link;
   }


   _proto.getNext = function() {
   return this._next;
   }
   _proto.getPrev = function() {
   return this._prev;
   }

   _proto.getIsFirst = function() {
   return this._isFirst;
   }
   _proto.getIsLast = function() {
   return this._isLast;
   }

});
