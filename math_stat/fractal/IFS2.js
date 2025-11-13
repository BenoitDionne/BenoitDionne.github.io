window.onload = apps_init;

function apps_init() {
    if ( document.getElementById("FERN") != null ) {
	var initFERN = document.getElementById("initFERN");
	var filledFERN = document.getElementById("filledFERN");
	var colourFERN = document.getElementById("colourFERN");
	var fillFern = false;
	var colFern = "black";
    
	if ( filledFERN != null )
	    fillFern = ( filledFERN.value === 'true' );

	if ( colourFERN != null )
	    colFern = colourFERN.value;

	if ( initFERN != null )
	    initFERN.onchange = function() {
		initObject("FERN", fillFern, colFern, initFERN.value);
	    }

	initObject("FERN", fillFern, colFern, 0);
	initFERN.value = 0;
    }

    if ( document.getElementById("LEAF") != null ) {
	var initLEAF = document.getElementById("initLEAF");
	var filledLEAF = document.getElementById("filledLEAF");
	var colourLEAF = document.getElementById("colourLEAF");
	var fillLeaf = false;
	var colLeaf = "black";
    
	if ( filledLEAF != null )
	    fillLeaf = ( filledLEAF.value === 'true' );

	if ( colourLEAF != null )
	    colLeaf = colourLEAF.value;

	if ( initLEAF != null )
	    initLEAF.onchange = function() {
		initObject("LEAF", fillLeaf, colLeaf, initLEAF.value);
	    }

	initObject("LEAF", fillLeaf, colLeaf, 0);
	initLEAF.value = 0;
    }
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
    constructor(X,Y,N) {
	this.curvesX = X;
	this.curvesY = Y;
	this.initNbrVtx = N;   /* The number of vertices of the */
	                       /* initial figure */ 
    }
}

function plotCurve(cntxt,curve,fillCurve) {
    var X = curve.curvesX;
    var Y = curve.curvesY;
    var J = curve.initNbrVtx;
 
    cntxt.beginPath();
    cntxt.moveTo(X[0],Y[0]);
    for ( var j = 1 ; j<J ; ++j ) {
	cntxt.lineTo(X[j],Y[j]);
    }
    cntxt.stroke();
    cntxt.closePath();
    if ( fillCurve ) {
    	cntxt.fill();
    }
    cntxt.save();
}

function initObject(cnvsName, fillCurve, colour, choice) {
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
    var initNbrVtx = 3;
    
    if ( choice == 1 ) {
	curvesX = [0, w2, w2, 0, 0];
	curvesY = [0, 0, h2, h2, 0];
	initNbrVtx = 4;
    } else if ( choice == 2 ) {
	var w3 = Math.floor(width/2);
	var h3 = Math.floor(height/2);
	curvesX = [w3, w2, w3, 0, w3];
	curvesY = [0, h3, h2, h3, 0];
	initNbrVtx = 4;
    }
    
    // The initial figure
    cntxt.strokeStyle = colour;
    if ( fillCurve ) {
	cntxt.fillStyle = colour;
    }
    
    var newcurve = new Curves(curvesX, curvesY, initNbrVtx);
    plotCurve(cntxt, newcurve, fillCurve);
    return newcurve;
}

/* *********************************************************************** */

/* These class contains the real coordinates, not the pixel coordinates,
   of the curves  */
class Curves2 {
    constructor(X,Y,N) {
	this.curvesX = X;
	this.curvesY = Y;
	this.initNbrVtx = N;
	this.mx = 0;
	this.Mx = 0;
	this.my = 0;
	this.My = 0;
    }
    minMAX() {
	var J = this.curvesX.length;
	this.mx = this.Mx = this.curvesX[0];
	this.my = this.My = this.curvesY[0];
	for (var j=1 ; j < J ; ++j ){
	    this.mx = Math.min(this.mx, this.curvesX[j]);
	    this.Mx = Math.max(this.Mx, this.curvesX[j]);
	    this.my = Math.min(this.my, this.curvesY[j]);
	    this.My = Math.max(this.My, this.curvesY[j]);
	}
    }	
}

function initObject4(cnvs, fillCurve, colour, choice) {
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");
    
    cntxt.clearRect(0, 0, width, height);

    /* The default curve is the triangle */
    var curvesX = [0, 1, 0, 0];
    var curvesY = [0, 0, 1, 0];
    var initNbrVtx = 3;
    
    if ( choice == 1 ) {
	curvesX = [0, 1, 1, 0, 0];
	curvesY = [0, 0, 1, 1, 0];
	initNbrVtx = 4;
    } else if ( choice == 2 ) {
	curvesX = [1/2, 1, 1/2, 0, 1/2];
	curvesY = [0, 1/2, 1, 1/2, 0];
	initNbrVtx = 4;
    }
    var newcurves = new Curves2(curvesX, curvesY, initNbrVtx);

    // The initial figure
    cntxt.strokeStyle = colour;
    if ( fillCurve ) {
	cntxt.fillStyle = colour;
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

    var J = curves.initNbrVtx;
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

    for ( var j = 0 ; j < N ; j=j+J ) {
	cntxt.beginPath();
	cntxt.moveTo(w0 + Math.floor((X[j+0]-mx)*delta),
		     h0 - Math.floor((Y[j+0]-my)*delta));
	for ( var i = 1 ; i<J ; ++i ) {
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

/* *********************************************************************** */

/* Iterations on the real coordinates */
function iterateFERN() {
    var cnvs = document.getElementById("FERN");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrFERN").value );
    var choice = Number( document.getElementById("initFERN").value );
    var fillFern = ( document.getElementById("filledFERN").value === 'true' );
    var colFern = document.getElementById("colourFERN").value;

    var curves = initObject4(cnvs, fillFern, colFern, choice);

    for ( var i = 0 ; i < nbr ; ++i )
	curves = nextStepFERN(curves);
    
    cntxt.clearRect(0,0, width, height);
    plotCurve2(cnvs, curves, fillFern);
}

function nextStepFERN(curves) {
    var curvesX = curves.curvesX;
    var curvesY = curves.curvesY;
    var initNbrVtx = curves.initNbrVtx;

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
    return new Curves2(newCurvesX, newCurvesY, initNbrVtx);
}

/* *********************************************************************** */

/* Iterations on the real coordinates */
function iterateLEAF() {
    var cnvs = document.getElementById("LEAF");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrLEAF").value );
    var choice = Number( document.getElementById("initLEAF").value );
    var fillLeaf = ( document.getElementById("filledLEAF").value === 'true' );
    var colLeaf = document.getElementById("colourLEAF").value;

    var curves = initObject4(cnvs, fillLeaf, colLeaf, choice);

    for ( var i = 0 ; i < nbr ; ++i )
	curves = nextStepLEAF(curves);

    cntxt.clearRect(0,0, width, height);
    plotCurve2(cnvs, curves, fillLeaf);
}

function nextStepLEAF(curves) {
    var curvesX = curves.curvesX;
    var curvesY = curves.curvesY;
    var initNbrVtx = curves.initNbrVtx;

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
    return new Curves2(newCurvesX, newCurvesY, initNbrVtx);
}
