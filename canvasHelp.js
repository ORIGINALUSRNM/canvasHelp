(function(){

	var canvasHelp;

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
	}

	canvasHelp = {
		getContext : getContext,
		drawLine : drawLine, 
		Point : Point, 
		Line : Line
	};

	window.canvasHelp = $can = canvasHelp;

})();