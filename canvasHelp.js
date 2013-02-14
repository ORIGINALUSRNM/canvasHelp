(function(){

	var canvasHelp;

	var getContext = function(canvasId) {
		var canvas = document.getElementById(canvasId);
		return canvas.getContext('2d');
	};
	var drawLine = function( ctx, line ) { 
		ctx.beginPath();
		ctx.moveTo(line.start.x, line.start.y);
		ctx.lineTo(line.end.x, line.end.y);
		//set options properties
		for(prop in line.options){
			//only set properties defined natively on canvas context
			if(ctx[prop]){
				ctx[prop] = line.options[prop];
			}
		}
		ctx.stroke();
		ctx.closePath();
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
			this.options = {};
			for(prop in options){
				if(options.hasOwnProperty(prop)){
					this.options[prop] = options[prop];
				}
			}

		}

		this.start = start;
		this.end = end;
	}

	canvasHelp = {
		getContext : getContext,
		drawLine : drawLine, 
		Point : Point, 
		Line : Line
	};

	window.canvasHelp = $can = canvasHelp;

})();