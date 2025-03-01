window.onload = apps_init;

function apps_init() {
    var initFERN = document.getElementById("initFERN");

    if ( initFERN != null )
	initFERN.onchange = function() {
	    var n = initFERN.value;
	    initObject("FERN", false, n);
	}

    initObject("FERN", false, 0);
    initFERN.value = 0;

    var initLEAF = document.getElementById("initLEAF");

    if ( initLEAF != null )
	initLEAF.onchange = function() {
	    var n = initLEAF.value;
	    initObject("LEAF", false, n);
	}

    initObject("LEAF", false, 0);
    initLEAF.value = 0;
}

/* *********************************************************************** */

function clearIFS(CnvsName) {
    var cnvs = document.getElementById(CnvsName);
    if ( cnvs != null ) {
	var cntxt = cnvs.getContext("2d");
	cntxt.clearRect(0,0, cnvs.width, cnvs.height);
    }
}

class Curves {
    constructor(X,Y,S) {
	this.curvesX = X;
	this.curvesY = Y;
	this.step = S;
    }
}

function plotCurve(cntxt,X,Y,step,fillCurve) {
    cntxt.beginPath();
    cntxt.moveTo(X[0],Y[0]);
    for ( var j = 1 ; j<step ; ++j ) {
	cntxt.lineTo(X[j],Y[j]);
    }
    cntxt.stroke();
    cntxt.closePath();
    if ( fillCurve ) {
    	cntxt.fill();
    }
    cntxt.save();
}

function initObject(cnvsName, fillCurve, choice) {
    var cnvs = document.getElementById(cnvsName);
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");
    
    cntxt.clearRect(0, 0, width, height);

    var w2 = Math.floor(width);
    var h2 = Math.floor(height);

    /* The default curve is the triangle */
    var curvesX = [0, w2, 0, 0];
    var curvesY = [0, h2, h2, 0];
    var step = 4;

    if ( choice == 1 ) {
	curvesX = [0, w2, w2, 0, 0];
	curvesY = [0, 0, h2, h2, 0];
	step = 5;
    } else if ( choice == 2 ) {
	var w3 = Math.floor(width/2);
	var h3 = Math.floor(height/2);
	curvesX = [w3, w2, w3, 0, w3];
	curvesY = [0, h3, h2, h3, 0];
	step = 5;
    }

    // The initial figure
    cntxt.strokeStyle = 'blue';
    if ( fillCurve ) {
	cntxt.fillStyle = "blue";
    }
    plotCurve(cntxt, curvesX, curvesY, step, fillCurve);
    
    return new Curves(curvesX, curvesY, step);
}

/* *********************************************************************** */

/* These class contains the real coordinates, not the pixel coordinates,
   of the curves  */
class Curves2 {
    constructor(X,Y,S) {
	this.curvesX = X;
	this.curvesY = Y;
	this.step = S;
	this.mx = 0;
	this.Mx = 0;
	this.my = 0;
	this.My = 0;
    }
    minMAX() {
	var N = this.curvesX.length;
	this.mx = this.Mx = this.curvesX[0];
	this.my = this.My = this.curvesY[0];
	for (var i=1 ; i < N ; ++i ){
	    this.mx = Math.min(this.mx, this.curvesX[i]);
	    this.Mx = Math.max(this.Mx, this.curvesX[i]);
	    this.my = Math.min(this.my, this.curvesY[i]);
	    this.My = Math.max(this.My, this.curvesY[i]);
	}
    }	
}

/* Not used */
function initObject3(cnvsName, fillCurve, choice) {
    var cnvs = document.getElementById(cnvsName);

    return initObject4(cnvs, fillCurve, choice);
}

function initObject4(cnvs, fillCurve, choice) {
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");
    
    cntxt.clearRect(0, 0, width, height);

    /* The default curve is the triangle */
    var curvesX = [0, 1, 0, 0];
    var curvesY = [0, 0, 1, 0];
    var step = 4;

    if ( choice == 1 ) {
	curvesX = [0, 1, 1, 0, 0];
	curvesY = [0, 0, 1, 1, 0];
	step = 5;
    } else if ( choice == 2 ) {
	curvesX = [1/2, 1, 1/2, 0, 1/2];
	curvesY = [0, 1/2, 1, 1/2, 0];
	step = 5;
    }
    var newcurves = new Curves2(curvesX, curvesY, step);

    // The initial figure
    cntxt.strokeStyle = 'blue';
    if ( fillCurve ) {
	cntxt.fillStyle = "blue";
    }
    plotCurve2(cnvs, newcurves, fillCurve);
    
    return newcurves;
}

/* This function plots the curves from the real coordinates, not the
   pixel coordinates. */
function plotCurve2(cnvs, curves, fillCurve) {
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var step = curves.step;
    var N = curves.curvesX.length;
    var X = curves.curvesX;
    var Y = curves.curvesY;
    curves.minMAX();
    var mx = curves.mx;
    var Mx = curves.Mx;
    var my = curves.my;
    var My = curves.My;

    var delta;
    if ( (My-my)*(Mx-mx) != 0 )
	delta = Math.min(width/(Mx-mx),height/(My-my));
    else if ( My - my != 0 )
	delta = height/(My-my);
    else if ( Mx - mx != 0 )
	delta = height/(Mx-mx);
    else
	delta = 1;

    /* to center horizontally the figure */
    var w0 = Math.max(0, Math.floor((width - (Mx - mx)*delta)/2));

    /* to center vertically the figure */
    var h0 = height - Math.max(0, Math.floor((height - (My - my)*delta)/2));

    for ( var j = 0 ; j < N ; j=j+step ) {
	cntxt.beginPath();
	cntxt.moveTo(w0 + Math.floor((X[j+0]-mx)*delta),
		     h0 - Math.floor((Y[j+0]-my)*delta));
	for ( var i = 1 ; i<step ; ++i ) {
	    cntxt.lineTo(w0 + Math.floor((X[j+i]-mx)*delta),
			 h0 - Math.floor((Y[j+i]-my)*delta));
	}
	cntxt.stroke();
	cntxt.closePath();
	if ( fillCurve ) {
	    cntxt.fill();
	}
	cntxt.save();
    }
}

/* Iterations on the real coordinates */
function iterateFERN() {
    var cnvs = document.getElementById("FERN");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrFERN").value );
    var choice = Number( document.getElementById("initFERN").value );

    cntxt.clearRect(0, 0, width, height);

    var curves = initObject4(cnvs, false, choice);

    for ( var i = 0 ; i < nbr ; ++i ) {
	cntxt.clearRect(0,0, width, height);
	curves = nextStepFERN(curves);
	plotCurve2(cnvs, curves, false);
    }
}

function nextStepFERN(curves) {
    var curvesX = curves.curvesX;
    var curvesY = curves.curvesY;
    var step = curves.step;

    var lh = curvesX.length;
    var lh2 = 2*lh;
    var lh3 = 3*lh;
    var newCurvesX = new Array(4*lh);
    var newCurvesY = new Array(4*lh);

    var Fa = 0.84925440558500;
    var Fb = 0.03559430566200;
    var Fc = 0.19681770870000;
    var Fd = 0.25660125726800;
    var Fe = 0.22641287406000;
    var Ff = 0.22306006986000;
    var Fg = 0.15000000015000;
    var Fh = 0.22981333296000;
    var Fi = 0.32042939929500;
    var Fj = 0.23783141551500;    

    for (var i=0 ; i < lh ; ++i ){
	newCurvesX[i] = 0;
	newCurvesY[i] = 0.16*curvesY[i];
	newCurvesX[i+lh] = Fa*curvesX[i] + Fb*curvesY[i];
	newCurvesY[i+lh] = -Fb*curvesX[i] + Fa*curvesY[i] + 1.6;
	newCurvesX[i+lh2] = Fc*curvesX[i] - Fd*curvesY[i];
	newCurvesY[i+lh2] = Fe*curvesX[i] + Ff*curvesY[i] + 1.6;
	newCurvesX[i+lh3] = -Fg*curvesX[i] + Fh*curvesY[i];
	newCurvesY[i+lh3] = Fi*curvesX[i] + Fj*curvesY[i] + 0.44;
    }
    return new Curves2(newCurvesX, newCurvesY, step);
}

/* Iterations on the real coordinates */
function iterateLEAF() {
    var cnvs = document.getElementById("LEAF");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrLEAF").value );
    var choice = Number( document.getElementById("initLEAF").value );

    cntxt.clearRect(0, 0, width, height);

    var curves = initObject4(cnvs, false, choice);

    for ( var i = 0 ; i < nbr ; ++i ) {
	cntxt.clearRect(0,0, width, height);
	curves = nextStepLEAF(curves);
	plotCurve2(cnvs, curves, false);
    }
}

function nextStepLEAF(curves) {
    var curvesX = curves.curvesX;
    var curvesY = curves.curvesY;
    var step = curves.step;

    var lh = curvesX.length;
    var lh2 = 2*lh;
    var lh3 = 3*lh;
    var newCurvesX = new Array(4*lh);
    var newCurvesY = new Array(4*lh);

    for (var i=0 ; i < lh ; ++i ){
	newCurvesX[i] = 0.6*curvesX[i] + 0.18;
	newCurvesY[i] = 0.6*curvesY[i] + 0.36;
	newCurvesX[i+lh] = 0.6*curvesX[i] + 0.18;
	newCurvesY[i+lh] = 0.6*curvesY[i] + 0.12;
	newCurvesX[i+lh2] = 0.4*curvesX[i] + 0.3*curvesY[i] + 0.27;
	newCurvesY[i+lh2] = -0.3*curvesX[i] + 0.4*curvesY[i] + 0.32;
	newCurvesX[i+lh3] = 0.4*curvesX[i] - 0.3*curvesY[i] + 0.27;
	newCurvesY[i+lh3] = 0.3*curvesX[i] + 0.4*curvesY[i] + 0.09;
    }
    return new Curves2(newCurvesX, newCurvesY, step);
}

/* *********************************************************************** */

/* Work in progress */
function initObject5(cnvs, fillCurve, choice) {
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var dim = Math.min(height,width);
    var mid = Math.floor(width/2);
    var a = Math.floor(mid/2);
    var b = Math.floor(mid/4);

    cntxt.clearRect(0, 0, width, height);

    /* The default curve is the triangle */
    var X = [mid, mid + a, mid, mid];
    var Y = [dim, dim, dim - a, dim];
    var step = 4;

    if ( choice == 1 ) {
	X = [mid, mid+a, mid+a, mid, mid];
	Y = [dim, dim, dim-a, dim-a, dim];
	step = 5;
    } else if ( choice == 2 ) {
	X = [mid, mid+b, mid+a, mid+b, mid];
	Y = [dim-b, dim, dim-b, dim-a, dim-b];
	step = 5;
    }

    cntxt.beginPath();
    cntxt.moveTo(X[0],Y[0]);
    for ( var j = 1 ; j<step ; ++j ) {
	cntxt.lineTo(X[j],Y[j]);
    }
    cntxt.stroke();
    cntxt.closePath();
    if ( fillCurve ) {
    	cntxt.fill();
    }
    cntxt.save();
}

/* Iterate on the real coordinates but store the information in pixels. */
function iterateFERN2() {
    var cnvs = document.getElementById("FERN");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrFERN").value );
    var choice = Number( document.getElementById("initFERN").value );

    cntxt.clearRect(0, 0, width, height);

    var curves = initObject5(cnvs, false, choice);

    var dim = Math.min(height,width);
    var mid = Math.floor(width/2);
    var cx = 0;
    var cy = 0;
    var R = 9;
    for ( var i = 0 ; i < nbr ; ++i ) {
	nextStepFERN2(cnvs, cntxt, dim, mid, cx, cy, R);
    }
}

function nextStepFERN2(cnvs, cntxt, dim, mid, cx, cy, R) {
    var cnvs_data_init = cntxt.getImageData(0, 0, dim, dim);

    cntxt.clearRect(0,0, cnvs.width, cnvs.height);
    var cnvs_data = cntxt.getImageData(0, 0, dim, dim);
    var coeff = new Array(16);
    var transl = new Array(8);
    coeff[0] = 0;
    coeff[1] = 0;
    coeff[2] = 0;
    coeff[3] = 0.16;
    transl[0] = 0;
    transl[1] = 0;
    
    coeff[4] = 0.84925440558500;
    coeff[5] = 0.03559430566200;
    coeff[6] = -0.03559430566200;
    coeff[7] = 0.84925440558500;
    transl[2] = 0;
    transl[3] = 1.6;

    coeff[8] = 0.19681770870000;
    coeff[9] = -0.25660125726800;
    coeff[10] = 0.22641287406000;
    coeff[11] = 0.22306006986000;
    transl[4] = 0;
    transl[5] = 1.6;

    coeff[12] = -0.15000000015000;
    coeff[13] = 0.22981333296000;
    coeff[14] = 0.32042939929500;
    coeff[15] = 0.23783141551500;    
    transl[6] = 0;
    transl[7] = 0.44;
    
    for ( var i=1 ; i<dim ; ++i ) {
	for ( var j=1 ; j<dim ; ++ j ) {
	    if ( isPixelSet(i, j, dim, cnvs_data_init) ) {
		var x = R*(i - mid)/mid + cx;
		var y = R*(mid - j)/mid + cy;
		for ( var k = 0 ; k < 13 ; k = k+4 ) {
		    var xr = coeff[0+k]*x + coeff[1+k]*y + transl[0+k/2];
		    var yr = coeff[2+k]*x + coeff[3+k]*y + transl[1+k/2];
		    drawPixel(xr, yr, cx, cy, R, 0, 0, 0, 255, mid, dim, cnvs_data);
		}
	    }
	}
    }
    cntxt.putImageData(cnvs_data, 0, 0);
}

function drawPixel(x, y, cx, cy, R, r, g, b, a, mid, dim, cnvs_data) {
    var i = Math.floor(mid*(R + x - cx)/R);
    var j = Math.floor(mid*(R - y + cx)/R);
    var index = (i + j*dim)*4;

    if ( index < dim*dim*4 && index >= 0 ) {
	cnvs_data.data[index + 0] = r;
	cnvs_data.data[index + 1] = g;
	cnvs_data.data[index + 2] = b;
	cnvs_data.data[index + 3] = a;
    }
}

function isPixelSet(i, j, dim, cnvs_data) {
    var index = (i + j*dim)*4;
    return cnvs_data.data[index] == 0;
}

/* ****************************************************************** */
/*
function initObject2(cntxt,width,height,choice,fillCurve) {
    cntxt.clearRect(0, 0, width, height);

    var w2 = Math.floor(width);
    var h2 = Math.floor(height);

    /* The default curve is the triangle */
/*
    var curvesX = [0, w2, 0, 0];
    var curvesY = [0, h2, h2, 0];
    var step = 4;

    if ( choice == 1 ) {
	curvesX = [0, w2, w2, 0, 0];
	curvesY = [0, 0, h2, h2, 0];
	step = 5;
    } else if ( choice == 2 ) {
	var w3 = Math.floor(width/2);
	var h3 = Math.floor(height/2);
	curvesX = [w3, w2, w3, 0, w3];
	curvesY = [0, h3, h2, h3, 0];
	step = 5;
    }

    // The initial figure
    cntxt.strokeStyle = 'blue';
    if ( fillCurve ) {
	cntxt.fillStyle = "blue";
    }
    plotCurve(cntxt, curvesX, curvesY, step, fillCurve);
    
    return new Curves(curvesX, curvesY, step);
}

/* Work in progress / doesn't work
   Without the existence of negative pixel coordinates, I don't see how
   we can obtain a method significantly more efficient than the method
   used above. */
/*
function iterateFERN2(fill) {
    var cnvs = document.getElementById("FERN");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.FERN_data.nbr.value );
    var choice = Number( document.FERN_data.choice.value );

    cntxt.clearRect(0, 0, width, height);

    var curve = initObject2(cntxt,Math.floor(width/3),Math.floor(height/3),
			    choice,fill);

    var Fa = 0.84925440558500;
    var Fb = 0.03559430566200;
    var Fc = 0.19681770870000;
    var Fd = 0.25660125726800;
    var Fe = 0.22641287406000;
    var Ff = 0.22306006986000;
    var Fg = 0.15000000015000;
    var Fh = 0.22981333296000;
    var Fi = 0.32042939929500;
    var Fj = 0.23783141551500;    

    for ( var i = 0 ; i < nbr ; i++ ) {
	var cnvs2 = document.createElement("canvas");
	cnvs2.width = width;
	cnvs2.height = height;
	var cntxt2 = cnvs2.getContext("2d");
	cntxt2.drawImage(cnvs, 0, 0, width, height);
	cntxt.clearRect(0, 0, cnvs.width, cnvs.height);

	var drift = Math.floor(width/3);
	
	cntxt.setTransform(0.005,0,0,0.16,drift,Math.floor(0.84*height));
	cntxt.drawImage(cnvs2, 0, 0);

	cntxt.setTransform(Fa,Fb,-Fb,Fa,drift,Math.floor(0.2*height));
	cntxt.drawImage(cnvs2, 0, 0);
	
	cntxt.setTransform(Fc,-Fd,Fe,Ff,0,drift,Math.floor(0.2*height));
	cntxt.drawImage(cnvs2, 0, 0);

	cntxt.setTransform(-Fg,Fh,Fi,Fj,drift,Math.floor(0.78*height));
	cntxt.drawImage(cnvs2, 0, 0);
	
	cntxt.setTransform(1,0,0,1,0,0);	
    }
}
*/



