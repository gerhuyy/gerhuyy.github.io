var Down = function(x, y, care){
    this.start = [x, y];
    this.add(x, y);
    if(care){
        this.care = care;
    };
};
Down.prototype = {
    all: [],
    state: true,
    add: function(x, y){
        if(!this.state)return;
        if(this.care.all)         this.all.push([x, y]);
        if(this.care.recent)      this.recent = [x, y];
                                  var dx = this.recent[0] - this.start[0],
                                      dy = this.recent[1] - this.start[1];
        if(this.care.angle)       this.angle = Math.tan2(dy, dx);
        if(this.care.displacement)this.displacement = Math.pow((Math.pow(dx, 2) + Math.pow(dy, 2)), 0.5);
    },
    end: function(){
        this.state = false;
    },
    care: {
        all: true, 
        angle: true, 
        displacement: true, 
        recent: true
    },
}
var Input = function(id, care){
    this.elem = document.getElementById(id);
    this.care = care;
    this.state = false;
    this.x = 0;
    this.y = 0;
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
    downs: [],
    start: function (e){
        var pointers = this.getPointerEvent(e);
        this.downs = [].map.call(pointers, function(obj){
            return Down(obj.pageX, obj.pageY, this.care);
        });
        if(pointer.length === 1){
            this.down = this.downs[0];
        }else{
            this.down = null;
        };
    },
    move: function (e){
        var pointers = this.getPointerEvent(e);
        for(var i = 0; i<Math.min(pointers.length, this.downs.length); i++){
            this.down.add(pointers[i].pageX, pointers[i].pageY);
        }
    },
    end: function (e){
        console.log(e);
        this.state = false;
    },
    getPointerEvent: function(event) {
        return event.targetTouches ? event.targetTouches : [event];
    },
    ontap: function(){},
    ondown: function(){},
    onmove: function(){},
    onup: function(){},
    
};