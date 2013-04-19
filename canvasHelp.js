(function(){

	var canvasHelp;

	var windowToCanvas = function(canvas, x, y) {
		var bbox = canvas.getBoundingClientRect(); 
		return { x: x - bbox.left * (canvas.width / bbox.width),
				 y: y - bbox.top * (canvas.height / bbox.height)
			   };
	};

	var getContext = function(canvasId) {
		var canvas = document.getElementById(canvasId);
		////////////////////////////////////////////////////////////////////////////
		//if width and height are not set on element, set them to default 300x150 //
		//to ensure canvas dimensions and drawing surface dimensions are the same.//
		//ignore css settings, they are confusing and unnecessary.                // 
		////////////////////////////////////////////////////////////////////////////
		if(!$(canvas).attr('width')){
			$(canvas).attr('width', 300);
			$(canvas).css('width', 300);
		}
		if(!$(canvas).attr('height')){
			$(canvas).attr('height', 150);
			$(canvas).css('height', 150);
		}
		return canvas.getContext('2d');
	};

	var inherit = function( Child, Parent ){
		Child.prototype = new Parent();
	};

	var drawLine = function( ctx, line ) { 
		ctx.beginPath();
		ctx.moveTo(line.start.x, line.start.y);
		ctx.lineTo(line.end.x, line.end.y);
		ctx.lineWidth = line.lineWidth || 1;
		ctx.lineCap = line.lineCap || "butt";
		ctx.strokeStyle = line.strokeStyle || '#000000';
		ctx.stroke();
		ctx.closePath();
	};

	var Trajectory = function ( object, dX, dY){

		this.object = object;
		this.dX = dX;
		this.dY = dY;
		this.vX = this.object.x < dX ? 5 : -5;
		this.vY = this.object.y < dY ? 5 : -5;

		return this;
	};

	var Shape = function () {

		Shape.prototype.updateTrajectory = function(){
			var t = this.trajectory;
			var nextX_Inc = this.x + t.vX;
			var nextY_Inc = this.y + t.vY;
			var xDone;  
			var yDone;

			//update x
			if(t.vX < 0){//moving left
				if( nextX_Inc < t.dX ){
					this.x =  t.dX;

				}else if(this.x > t.dX){
					this.x += t.vX;
				}
				 
			}else{//moving right
				if( nextX_Inc > t.dX ){
					this.x = t.dX;
				}else if( nextX_Inc < t.dX ){
					this.x += t.vX;
				}
			}

			//update y
			if(t.vY < 0){//moving up
				if( nextY_Inc < t.dY ){
					this.y = t.dY;
				}else if( nextY_Inc > t.dY ){
					this.y += t.dY;
				}
			}else{//moving down
				if( nextY_Inc > t.dY ){
					this.y = t.dY;
				}else if( nextY_Inc < t.dY){
					this.y += t.dY;
				}
			}

			xDone = t.dX == this.x ? true : false;
			yDone = t.dY == this.y ? true : false;

			if(xDone && yDone){
				t = false;
			}

		};
	};

	var Point = function( x, y ) {
		if(!(this instanceof Point)){
			return new canvasHelp.Point( x, y ); 
		}
		this.x = x;
		this.y = y;
	};

	var Line = function( start, end, options ) {
		if(!(this instanceof Line)){
			return new canvasHelp.Line( start, end, options);
		}

		if(options){
			for(prop in options){
				if(options.hasOwnProperty(prop)){
					this[prop] = options[prop];
				}
			}

		}

		this.start = start;
		this.end = end;
	};

	var Circle =  function( x, y, radius, fillStyle ){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.fillStyle = fillStyle;
		this.trajectory = false;

		this.addTrajectory = function(trajectory){
			this.trajectory = trajectory;
		};

		return this;
	};

	inherit(Circle, Shape);

	canvasHelp = {
		getContext : getContext,
		windowToCanvas : windowToCanvas,
		drawLine : drawLine, 
		Point : Point, 
		Line : Line, 
		Circle : Circle,
		Trajectory : Trajectory
	};

	window.canvasHelp = $can = canvasHelp;

})();