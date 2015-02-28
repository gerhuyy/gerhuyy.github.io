var Input = function(id){
    this.elem = document.getElementById(id);
    
    this.state = false; // detect if a touch event is started
    this.x = 0;
    this.y = 0;
    this.cachedX = 0;
    this.cachedY = 0;
    var obj = this;
    //setting the events listeners
    this.elem.addEventListener("touchstart", function(e){obj.start(e)});
    this.elem.addEventListener("mousedown", function(e){obj.start(e)});

    this.elem.addEventListener("touchmove", function(e){obj.move(e)});
    this.elem.addEventListener("mousemove", function(e){obj.move(e)});
    
    this.elem.addEventListener("touchend", function(e){obj.end(e)});
    this.elem.addEventListener("mouseup", function(e){obj.end(e)});
    this.elem.addEventListener("touchcancel", function(e){obj.end(e)});
    
}
Input.prototype = {
    start: function (e){
        e.preventDefault();
        this.touch = e.targetTouches instanceof Array;
        var pointer = this.getPointerEvent(e);
        // caching the current x
        this.cachedX = this.x = pointer.pageX;
        // caching the current y
        this.cachedY = this.y = pointer.pageY;
        // a touch event is detected      
        this.state = true;
        // detecting if after 200ms the finger is still in the same position
        setTimeout(function (){
            if ((this.cachedX === this.x) && !this.touchStarted && (this.cachedY === this.y)) {
                //this.ontap()
            }
        },200);
    },
    move: function (e){
        e.preventDefault();
        this.touch = e.targetTouches instanceof Array;
        var pointer = this.getPointerEvent(e);
        this.x = pointer.pageX;
        this.y = pointer.pageY;
        if(this.state) {
             this.onmove()
        }
    },
    end: function (e){
        e.preventDefault();
        this.touch = typeof e.targetTouches === typeof [];
        this.state = false;
        this.onup();
    },
    getPointerEvent: function(event) {
        return event.targetTouches ? event.targetTouches[0] : event;
    },
    ontap: function(){},
    ondown: function(){},
    onmove: function(){},
    onup: function(){},
    
};