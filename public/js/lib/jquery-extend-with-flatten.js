/**
 "Flat" capability. Get a structure of dom-nodes to act like a single element
 for event listening purposes. The only limitation here is that you can't put
 a flattened structure inside another flattened structure.

So for some complex dom structure, we can do this:

    $('#my-complex-dom-structure').flatten("testing", "123");

    $('#my-complex-dom-structure').on("click", function(e) {
    var d = $(e.target).getFlat("testing"); 
    var d2 = $(e.target).getFlat(); 

    console.log(d);  //logs out "123"
    console.log(d2.get(0)); //logs out the y-complex-dom-structure dom node
    });

*/
jQuery.fn.extend({

    //Helper function. get a unique string which is the flag for flattened nodes
    //which hopefully won't collide with other such strings in the system. the
    //chances are remote.
    _getFlatUniqueBase: function() {
    return "fncnxjw826";
    },

    //API. flatten an element. the key,value are optional parameters. 
    //if you want to assign some flat data to this element, then include the key-value
    //pair in here.
    flatten: function(key, value) {
    var u = this._getFlatUniqueBase();
    this.data(u, this); 

        if(key) {
        this.data(key, value);
        }
    },

    //API. Get the flattened node or the flattened data. If you include the key,
    //then it will attempt to retrieve the corresponding value from the flat-instance.
    //otherwise, it will return the flat instance itself.
    getFlat: function(key) {
    var u = this._getFlatUniqueBase();
    var el = this;
    var flatInst = el.data(u);

        while(!flatInst) {
        el = el.parent();

            if(!el) {
            return null;
            } else {
            flatInst = el.data(u);

                if(flatInst) {
                this.data(u, flatInst);
                }
            }

        }

        if(key) {
        return flatInst.data(key);
        } else {
        return flatInst;
        }

    }

});