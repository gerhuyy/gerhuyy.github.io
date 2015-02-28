var Input = function(id){
    this.elem = document.getElementById(id);
    
    this.touchStarted = false; // detect if a touch event is sarted
    this.currX = 0;
    this.currY = 0;
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
        var pointer = this.getPointerEvent(e);
        // caching the current x
        this.cachedX = this.currX = pointer.pageX;
        // caching the current y
        this.cachedY = this.currY = pointer.pageY;
        // a touch event is detected      
        this.touchStarted = true;
        // detecting if after 200ms the finger is still in the same position
        setTimeout(function (){
            if ((this.cachedX === this.currX) && !this.touchStarted && (this.cachedY === this.currY)) {
                // Here you get the Tap event
            }
        },200);
    },
    move: function (e){
        e.preventDefault();
        var pointer = this.getPointerEvent(e);
        this.currX = pointer.pageX;
        this.currY = pointer.pageY;
        if(this.touchStarted) {
             console.log("swiper no swiping")
        }
    },
    end: function (e){
        e.preventDefault();
        // here we can consider finished the touch event
        this.touchStarted = false;
    },
    getPointerEvent: function(event) {
        return event.targetTouches ? event.targetTouches[0] : event;
    },
    ondown: function(){},
    onmove: function(){},
    
};