/* To draw filled Julia sets */
function julia() {
    var cnvs = document.getElementById("julia");
    var width = cnvs.width;
    var height = cnvs.height;
    var dim = Math.min(height,width);
    var mid = Math.floor(dim/2);
    
    var ctxt = cnvs.getContext("2d");
    ctxt.clearRect(0,0, cnvs.width, cnvs.height);

    var cnvs_data = ctxt.getImageData(0, 0, dim, dim);
    
    var rc = Number( document.getElementById("c_real").value );
    var ic = Number( document.getElementById("c_img").value );
    var nbr = Number( document.getElementById("julia_nbr").value );

    if ( isNaN(nbr) )
	nbr = 50;

    var r = Math.max(Math.sqrt(rc**2+ic**2),2);
    var r2 = r**2;

    var flag = 0;
    for ( var i=1 ; i<dim ; ++i ) {
	for ( var j=1 ; j<dim ; ++j ) {
	    var x = r*(i - mid)/(mid);
	    var y = r*(mid - j)/(mid);
	    var x1, y1;

	    for ( var k = 1 ; k < nbr ; ++k ) {
		x1 = x**2 - y**2 + rc;
		y1 = 2*x*y + ic;

		if ( x1**2 + y1**2 > r2 ) {
		    flag = 1;
		    break;
		}
		x = x1;
		y = y1;
	    }
	    if ( flag != 1 ) {
		drawPixel(i, j, 0, 0, 0, 255, dim, cnvs_data);
	    }
	    flag = 0;
	}
    }
    ctxt.putImageData(cnvs_data, 0, 0);
}

/* To draw the mandelbrot set */
function mandelbrot(cx, cy, r) {
    var cnvs = document.getElementById("mandelbrot");
    var width = cnvs.width;
    var height = cnvs.height;
    var dim = Math.min(height,width);
    var mid = Math.floor(dim/2);
    var ctxt = cnvs.getContext("2d");

    /* Remove the previous event listener if any */
    cnvs.removeEventListener('click', mandelbrot, false);

    /* The center of the box.  The default is the origin. */
    if ( isNaN(cx) )
	cx = 0;
    if ( isNaN(cy) )
	cy = 0;

    /* cx -r < x < cx + r  and cy - r < y < cy + r */
    if ( isNaN(r) )
	r = 2;

    /* Number of iterations */
    var nbr = Number( document.getElementById("mandelbrot_nbr").value );
    if ( isNaN(nbr) )
	nbr = 200;

    draw_mandelbrot(cnvs, ctxt, dim, mid, cx, cy, r, nbr);

    cnvs.onclick = function(event) {
	var cnvs = event.target;

	/* Pixel coordinates on the canvas */
	var rect = cnvs.getBoundingClientRect();
	var px = event.clientX - rect.left;
	var py = event.clientY - rect.top;

	/* Real coordinates */
    	var x = r*(px - mid)/mid + cx;
	var y = r*(mid - py)/mid + cy;

	if ( event.altKey ) {
	    document.getElementById("c_real").value  = x;
	    document.getElementById("c_img").value = y;
	    document.getElementById("julia_nbr").value = 100;
	    julia();
	}
	else {
	    mandelbrot(x,y,r/2);
	}
    }
}

/* To draw the mandelbrot set */
function draw_mandelbrot(cnvs, ctxt, dim, mid, cx, cy, r, nbr) {	
    ctxt.clearRect(0,0, cnvs.width, cnvs.height);

    var cnvs_data = ctxt.getImageData(0, 0, dim, dim);
    var flag = 0;
    var R2 = 4;
    for ( var i=1 ; i<dim ; ++i ) {
	for ( var j=1 ; j<dim ; ++ j ) {
	    var x = r*(i - mid)/mid + cx;
	    var y = r*(mid - j)/mid + cy;
	    var x1 = x;
	    var y1 = y;
	    for ( k = 1 ; k < nbr ; ++k ) {
		var x2 = x1**2 - y1**2 + x;
		var y2 = 2*x1*y1 + y;
		if ( x2**2 + y2**2 > R2 ) {
		    flag = 1;
		    break;
		}
		x1 = x2;
		y1 = y2;
	    }
	    if ( flag != 1 ) {
		drawPixel(i, j, 0, 0, 0, 255, dim, cnvs_data);
	    }
	    flag = 0;
	}
    }
    ctxt.putImageData(cnvs_data, 0, 0);
}

function clearDDS(name) {
    var cnvs = document.getElementById(name);
    if ( cnvs != null ) {
	var ctx = cnvs.getContext("2d");
	ctx.clearRect(0,0,cnvs.width,cnvs.height);
    }
}

function drawPixel(x, y, r, g, b, a, dim, cnvs_data) {
    var index = (x + y*dim)*4;
    
    cnvs_data.data[index + 0] = r;
    cnvs_data.data[index + 1] = g;
    cnvs_data.data[index + 2] = b;
    cnvs_data.data[index + 3] = a;
}

/* *********************************************************** */
/* Work in progress */
/*
  ctxt.beginPath();
  ctxt.font = 'italic 400 18px/2 Unknown Font, sans-serif';
  ctxt.fillText("Work in progress", Math.floor(dim/6), Math.floor(dim/2)
  - 20);
  ctxt.fillText("Travail en cours", Math.floor(dim/6), Math.floor(dim/2)
  + 20);
  ctxt.strokeStyle = 'black';
  ctxt.stroke();
  ctxt.closePath();

  return;
*/
    
/* The frames when zooming in */
/*
var frames = new Array();

function Frame(x, y, r) {
    this.tx = x;
    this.ty = y;
    this.tr = r;
}

var totalNbrOfFrames = 15;
var frameNbr = 0;
*/

/* To draw the mandelbrot set */
/*
function mandelbrot(cx, cy, r) {
    var cnvs = document.getElementById("mandelbrot");
    var width = cnvs.width;
    var height = cnvs.height;
    var dim = Math.min(height,width);
    var mid = Math.floor(dim/2);
    var ctxt = cnvs.getContext("2d");

    /* Remove the previous event listener if any */
/*    cnvs.removeEventListener('click', mandelbrot, false);

    /* The center of the box.  The default is the origin. */
/*    if ( isNaN(cx) )
	cx = 0;
    if ( isNaN(cy) )
	cy = 0;

    /* cx -r < x < cx + r  and cy - r < y < cy + r */
/*    if ( isNaN(r) )
	r = 2;

    /* Number of iterations */
/*  var nbr = Number( document.getElementById("mandelbrot_nbr").value );
    if ( isNaN(nbr) )
	nbr = 200;

    draw_mandelbrot(cnvs, ctxt, dim, mid, cx, cy, r, nbr);

    cnvs.onclick = function(event) {
	var cnvs = event.target;

	/* Pixel coordinates on the canvas */
/*	var rect = cnvs.getBoundingClientRect();
	var px = event.clientX - rect.left;
	var py = event.clientY - rect.top;

	/* Real coordinates */
/*    	var x = r*(px - mid)/mid + cx;
	var y = r*(mid - py)/mid + cy;

	var r2 = r/2;
	for ( var j = 1 ; j <= totalNbrOfFrames ; ++j ) {
	    var t = j/totalNbrOfFrames;
	    var frame
		= new Frame(t*x + (1-t)*cx, t*y + (1-t)*cy, t^r2 + (1-t)*r);
	    frames.push(frame);
	}
	requestAnimationFrame(draw_frames);

	/*
	if ( j < 25 ) {
	    setTimeout(function(){
		    draw_mandelbrot(cnvs, ctxt, dim, mid, tx, ty, tr, nbr);
		}, j*40);
	}
	else {
	    setTimeout(function(){mandelbrot(x,y,r/2);}, j*40);
	}
	*/
/*	
	mandelbrot(x,y,r/2);
    }
}

var nbr = 200;

/*
function draw_frames() {
    var cnvs = document.getElementById("mandelbrot");
    var width = cnvs.width;
    var height = cnvs.height;
    var dim = Math.min(height,width);
    var mid = Math.floor(dim/2);
    var ctxt = cnvs.getContext("2d");

    draw_mandelbrot(cnvs, ctxt, dim, mid, frames[frameNbr].cx,
		    frames[frameNbr].cy, frames[frameNbr].cr, nbr);
    ++frameNbr;

    if ( frameNbr < totalNbrOfFrames ) {
	setTimeout(function() {	requestAnimationFrame(draw_frames); },
		   1000/totalNbrOfFrames );
    }
    else {
	frameNbr = 0;
	//	mandelbrot(x,y,r/2);
    }
}
*/
