/* To draw filled Mandelbrot sets.

[cx,cy] = centre of the region to display in real coordinates.
r = real number.

The the region displayed in real coordinates is [cx-r,cx+r]x[cy-r,cy+r].
*/

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
	    setValueElement("c_real",x)
	    setValueElement("c_img",y)
	    setValueElement("julia_nbr",50)
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

function drawPixel(x, y, r, g, b, a, dim, cnvs_data) {
    var index = (x + y*dim)*4;
    
    cnvs_data.data[index + 0] = r;
    cnvs_data.data[index + 1] = g;
    cnvs_data.data[index + 2] = b;
    cnvs_data.data[index + 3] = a;
}

function clearCanvas(name) {
    var cnvs = document.getElementById(name);
    if ( cnvs != null ) {
	var ctx = cnvs.getContext("2d");
	ctx.clearRect(0,0,cnvs.width,cnvs.height);
    }
}
