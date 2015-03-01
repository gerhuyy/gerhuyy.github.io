mainCanvas = {};
mainCanvas.canvas = document.getElementById("h");
mainCanvas.canvas.style.width = document.body.clientWidth-20;
mainCanvas.canvas.style.height = innerHeight-50;
addEventListener("resize", function(e){
    mainCanvas.canvas.style.width = document.body.clientWidth-20;
    mainCanvas.canvas.style.height = innerHeight-50;
});

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
        if(this.care.angle)       this.angle = Math.atan2(dy, dx);
        if(this.care.displacement)this.displacement = Math.pow((Math.pow(dx, 2) + Math.pow(dy, 2)), 0.5);
    },
    end: function(){
        this.state = false;
    },
    care: {
        all: true, 
        angle: true, 
        displacement: true, 
        recent: true,
    },
    str: function(){
        return this.recent[0]+", "+this.recent[1];
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
    function listen(event){
        return obj.elem.addEventListener(event, function(e){return obj[event](e)});
    }
    listen("touchstart");
    listen("mousedown");
    
    listen("touchmove");
    listen("mousemove");
    
    listen("touchend");
    listen("touchcancel");
    listen("mouseup");
}
Input.prototype = {
    x: 0,
    y: 0,
    state: false,
    downs: [],
    touchstart: function(e){
        var pointers = this.getTouches(e);
        this.downs = [];
        for(var i = 0; i<pointers.length; i++){
            this.downs[pointers[i].identifier] = Down(pointers[i].pageX, pointers[i].pageY, this.care);
        };
        this.down = this.downs[pointers[0].identifier];
        return false;
    },
    mousedown: function(e){
        this.state = true;
        this.x = e.pageX;
        this.y = e.pageY;
        this.down = Down(e.pageX, e.pageY, this.care);
        return false;
    },
    start: function(e){
        if(e.touches){
            var pointers = this.getPointerEvent(e);
            this.downs = [];
            for(var i = 0; i<pointers.length; i++){
                this.downs[pointers[i].identifier] = Down(pointers[i].pageX, pointers[i].pageY, this.care);
            };
            this.down = this.downs[pointers[0].identifier];
        }else{
            this.down = new Down(e.pageX, e.pageY, this.care);
        }
        return false;
    },
    touchmove: function(e){
        var pointers = this.getTouches(e);
        for(var i = 0; i<pointers.length; i++){
            this.downs[pointers[i].identifier].add(pointers[i].pageX, pointers[i].pageY);
        };
        return false;
    },
    mousemove: function(e){
        this.x = e.pageX;
        this.y = e.pageY;
        this.down.add(e.pageX, e.pageY);
        return false;
    },
    move: function(e){
        e.preventDefault();
        var pointers = this.getPointerEvent(e);
        console.log(e.changedTouches);
        for(var i = 0; i<Math.min(pointers.length, this.downs.length); i++){
            this.downs[i].add(pointers[i].pageX, pointers[i].pageY);
        }
        return false;
    },
    touchend: function(e){
        var pointers = this.getTouches(e);
        for(var i = 0; i<pointers.length; i++){
            this.downs[pointers[i].identifier].end();
        }
        return false;
    },
    touchcancel: function(e){
       var pointers = this.getTouches(e);
        for(var i = 0; i<pointers.length; i++){
            delete this.downs[pointers[i].identifier];
        }
        return false;
    },
    mouseup: function(e){
        this.state = false;
        this.x = e.pageX;
        this.y = e.pageY;
        this.down.end()
        return false;
    },
    end: function(e){
        console.log(e);
        this.state = false;
        return false;
    },
    getTouches: function(e) {
        return e.targetTouches;
    },
};
