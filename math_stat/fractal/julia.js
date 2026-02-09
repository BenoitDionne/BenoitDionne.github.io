/* To draw filled Julia sets.

Dim = [width of the canvas in pixels, height of the canvas in pixels].
Mid = [x index of the pixel in the middle of the canvas,
       y index of the pixel in the middle of the canvas].
RM = [real x coordinate for the center of the canvas,
      real y coordinate for the center of the canvas].
C = [real part of c. imaginary part of c].
R = [half of the real width of the domain,
     half of the real height of the domain].
K = lower bound to declare that an orbit converges to infinity.
nbr = number of iteration used to determine if an orbit converges to infinity.
*/

function julia(RM,R) {
    var cnvs = document.getElementById("julia");
    let Dim = [cnvs.width, cnvs.height];
    let Mid = [Math.floor(Dim[0]/2), Math.floor(Dim[1]/2)];
    
    var ctxt = cnvs.getContext("2d");
    ctxt.clearRect(0,0,Dim[0],Dim[1]);

    var cnvs_data = ctxt.getImageData(0, 0, Dim[0], Dim[1]);

    let C = [Number( document.getElementById("c_real").value ),
             Number( document.getElementById("c_img").value )];
    var nbr = Number( document.getElementById("julia_nbr").value );   
    if ( isNaN(nbr) || nbr < 1 )
	nbr = 50;
    var K = Math.max(Math.sqrt(C[0]**2+C[1]**2),2);
    var K2 = K**2;
    
    /* The real center of the canvs.  The default is the origin. */
    if ( Array.isArray(RM) ) {
	if ( isNaN(RM[0]) )
	    RM[0] = 0;
	if ( isNaN(RM[1]) )
	    RM[1] = 0;
    }
    else {
	RM = [0, 0];
    }

    if ( Array.isArray(R) ) {
	if ( isNaN(R[0]) || isNaN(R[1]) ) {
	    R[0] = K;
	    R[1] = K*Dim[1]/Dim[0];
	}
    }
    else {
	R = [K, K*Dim[1]/Dim[0]];
    }

    /* Remove the previous event listener if any */
    cnvs.removeEventListener('click', julia, false);

    draw_julia(cnvs, ctxt, Dim, Mid, RM, C, R, K, nbr);
      
    cnvs.onclick = function(event) {
	var cnvs = event.target;

	/* Pixel coordinates on the canvas */
	var rect = cnvs.getBoundingClientRect();
	var px = event.clientX - rect.left;
	var py = event.clientY - rect.top;

	/* Real coordinates */
    	let RMn = [R[0]*(px - Mid[0])/Mid[0] + RM[0],
		  R[1]*(Mid[1] - py)/Mid[1] + RM[1]];
	let Rn = [R[0]/2,R[1]/2];
	julia(RMn,Rn);
    }
}

function draw_julia(cnvs, ctxt, Dim, Mid, RM, C, R, K, nbr) {
    ctxt.clearRect(0,0,Dim[0],Dim[1]);

    var cnvs_data = ctxt.getImageData(0, 0, Dim[0], Dim[1]);
    var K2 = K**2;
    var flag = 0;
    for ( var i=1 ; i<Dim[0] ; ++i ) {
	for ( var j=1 ; j<Dim[1] ; ++j ) {
	    var x = R[0]*(i - Mid[0])/(Mid[0]) + RM[0];
	    var y = R[1]*(Mid[1] - j)/(Mid[1]) + RM[1];
	    var x1, y1;

	    for ( var k = 1 ; k < nbr ; ++k ) {
		x1 = x**2 - y**2 + C[0];
		y1 = 2*x*y + C[1];

		if ( x1**2 + y1**2 > K2 ) {
		    flag = 1;
		    break;
		}
		x = x1;
		y = y1;
	    }
	    if ( flag != 1 ) {
		drawPixel(i, j, 0, 0, 0, 255, Dim[0], cnvs_data);
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
