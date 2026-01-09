window.onload = apps_init;

function apps_init() {
    if ( document.getElementById("SRPK") != null ) {
	var initSRPK = document.getElementById("initSRPK");
	var filledSRPK = document.getElementById("filledSRPK");
	var colourSRPK = document.getElementById("colourSRPK");
	var fillSrpk = false;
	var colSrpk = "black";
    
	if ( filledSRPK != null )
	    fillSrpk = ( filledSRPK.value === 'true' );

	if ( colourSRPK != null )
	    colSrpk = colourSRPK.value;

	if ( initSRPK != null )
	    initSRPK.onchange = function() {
		initObject("SRPK", fillSrpk, colSrpk, initSRPK.value);
	    }

	initObject("SRPK", fillSrpk, colSrpk, 0);
	initSRPK.value = 0;
    }

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
    constructor(X,Y) {
	this.X = X;
	this.Y = Y;
    }
}

function plotCurve(cntxt,curve,fillCurve) {
    var X = curve.X;
    var Y = curve.Y;
    var J = curve.X.length;
 
    cntxt.beginPath();
    cntxt.moveTo(X[0],Y[0]);
    for ( var j = 1 ; j < J ; ++j ) {
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
    } else if ( choice == 2 ) {
	var w3 = Math.floor(width/2);
	var h3 = Math.floor(height/2);
	curvesX = [w3, w2, w3, 0, w3];
	curvesY = [0, h3, h2, h3, 0];
    }
    
    // The initial figure
    cntxt.strokeStyle = colour;
    if ( fillCurve ) {
	cntxt.fillStyle = colour;
    }
    
    var newcurve = new Curves(curvesX, curvesY);
    plotCurve(cntxt, newcurve, fillCurve);

    return newcurve;
}

/* *********************************************************************** */

/* These class contains the equivalent of pixel coordinates.
   Namely, the discretized coordinates of the rescaled IFS.
   M is the rescaling factor of the IFS.  */
class Points {
    constructor(X,Y,M) {
	this.X = [];
	this.Y = [];
	var J = X.length;
 	for (var j=0 ; j < J ; ++j ){
	    this.X.push(Math.floor(M*X[j]));
	    this.Y.push(Math.floor(M*Y[j]));
	}
	this.M = M;
    }
    minMAX() {
	var J = this.X.length;
	this.mx = this.Mx = this.X[0];
	this.my = this.My = this.Y[0];
 	for (var j=1 ; j < J ; ++j ){
	    this.mx = Math.min(this.mx, this.X[j]);
	    this.Mx = Math.max(this.Mx, this.X[j]);
	    this.my = Math.min(this.my, this.Y[j]);
	    this.My = Math.max(this.My, this.Y[j]);
	}
    }
    create(fillFig) {
	/* The option fillFig has not been implemented and may not
	   be implemented in the future.  Using polygonal curves already
	   taxes the computation time and memory space allocated to
	   the browsers.  Adding all the points in the interior of a
	   closed polygonal curve will probably be too much. */
	var J = this.X.length;
	var X1 = this.X[0];
	var Y1 = this.Y[0];
	for (var j = 1 ; j < J ; ++j) {
	    var X2 = this.X[j];
	    var Y2 = this.Y[j];
	    var R = Math.max(Math.abs(X1-X2),Math.abs(Y1-Y2));
	    var lx = (X2-X1)/R;
	    var ly = (Y2-Y1)/R;
	    for ( var k = 1 ; k < R ; ++k) {
		this.X.push(Math.floor(X1 + k*lx));
		this.Y.push(Math.floor(Y1 + k*ly));
	    }
	    X1 = X2;
	    Y1 = Y2;
	}
    }
    push(X,Y) {
	/* Existing points are not included again. */
	var flag = 0;
	var idxX = this.X.indexOf(X);
	while ( idxX != -1 ) {
	    if ( this.Y[idxX] == Y ) {
		flag = 1;
		break;
	    }
	    idxX = this.X.indexOf(X, idxX + 1);
	}
	if ( flag == 0 ) {
	    this.X.push(X);
	    this.Y.push(Y);
	}
    }
}

function initPoints(cnvs, M, fillFig, colour, choice) {
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    cntxt.clearRect(0, 0, width, height);

    /* The default curve is the triangle */
    var X = [0, 1, 0, 0];
    var Y = [0, 0, 1, 0];
    
    if ( choice == 1 ) {
	X = [0, 1, 1, 0, 0];
	Y = [0, 0, 1, 1, 0];
    } else if ( choice == 2 ) {
	X = [1/2, 1, 1/2, 0, 1/2];
	Y = [0, 1/2, 1, 1/2, 0];
    }

    var points = new Points(X, Y, M);
    points.create(fillFig);
    
    /* Both strokeStyle and fillStyle are set to the chosen colour.
       This does not mean that the interior of closed polygonal curve
       is coloured.  Only in the interior of each point is coloured. */  
    cntxt.strokeStyle = colour;
    cntxt.fillStyle = colour;
    plotPoints(cnvs, points);

    return points;
}

/* This function plots the discretized coordinates of the rescaled IFS
   into the original canvas. */
function plotPoints(cnvs, points) {
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");
    
    var X = points.X;
    var Y = points.Y;
    var J = X.length;

    points.minMAX();
    var mx = points.mx;
    var Mx = points.Mx;
    var my = points.my;
    var My = points.My;

    var deltax, deltay;
    if ( My - my != 0 )
	deltay = height/(My-my);
    else
	deltay = 1;

    if ( Mx - mx != 0 )
	deltax = height/(Mx-mx);
    else
	deltax = 1;

    for ( var j = 0 ; j < J ; ++j ) {
	cntxt.fillRect(Math.floor((points.X[j]-mx)*deltax),height - Math.floor((points.Y[j]-my)*deltay),1,1);
    }
}

/* *********************************************************************** */

/* Iterations on the discretized coordinates of the rescaled IFS */
function iterateSRPK() {
    var cnvs = document.getElementById("SRPK");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrSRPK").value );
    var choice = Number( document.getElementById("initSRPK").value );
    var fillSrpk = ( document.getElementById("filledSRPK").value === 'true' );
    var colSrpk = document.getElementById("colourSRPK").value;
    var M = Number( document.getElementById("scaleSRPK").value );
    
    var points = initPoints(cnvs, M, fillSrpk, colSrpk, choice);

    for ( var i = 0 ; i < nbr ; ++i )
	points = nextStepSRPK(points);

    cntxt.clearRect(0,0, width, height);
    plotPoints(cnvs, points);
}

function nextStepSRPK(points) {
    var X = points.X;
    var Y = points.Y;
    var M = points.M;
    var J = X.length;

    var newPoints = new Points([],[],M);

    for (var j=0 ; j < J ; ++j ) {
	var X1 = 0.5*X[j];
	var Y1 = 0.5*Y[j] + M*0.5;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.5*X[j] + M*0.5;
	Y1 = 0.5*Y[j];
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.5*X[j];
	Y1 = 0.5*Y[j];
	newPoints.push(Math.floor(X1),Math.floor(Y1));
    }
    return newPoints;
}

/* *********************************************************************** */

/* Iterations on the discretized coordinates of the rescaled IFS */
function iterateFERN() {
    var cnvs = document.getElementById("FERN");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrFERN").value );
    var choice = Number( document.getElementById("initFERN").value );
    var fillFern = ( document.getElementById("filledFERN").value === 'true' );
    var colFern = document.getElementById("colourFERN").value;
    var M = Number( document.getElementById("scaleFERN").value );

    var points = initPoints(cnvs, M, fillFern, colFern, choice);

    for ( var i = 0 ; i < nbr ; ++i )
	points = nextStepFERN(points);
    
    cntxt.clearRect(0,0, width, height);
    plotPoints(cnvs, points);
}

function nextStepFERN(points) {
    var X = points.X;
    var Y = points.Y;
    var M = points.M;
    var J = X.length;

    var newPoints = new Points([],[],M);

    for (var j=0 ; j < J ; ++j ) {
        var X1 = 0*X[j];
	var Y1 = 0.16*Y[j];
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.85*X[j] + 0.04*Y[j];
	Y1 = -0.04*X[j] + 0.85*Y[j] + M*1.6;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.20*X[j] - 0.26*Y[j];
	Y1 = 0.23*X[j] + 0.22*Y[j] + M*1.6;
    	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = -0.15*X[j] + 0.28*Y[j];
	Y1 = 0.26*X[j] + 0.24*Y[j] + M*0.44;
    	newPoints.push(Math.floor(X1),Math.floor(Y1));
    }
    return newPoints;
}

/* *********************************************************************** */

/* Iterations on the discretized coordinates of the rescaled IFS */
function iterateLEAF() {
    var cnvs = document.getElementById("LEAF");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrLEAF").value );
    var choice = Number( document.getElementById("initLEAF").value );
    var fillLeaf = ( document.getElementById("filledLEAF").value === 'true' );
    var colLeaf = document.getElementById("colourLEAF").value;
    var M = Number( document.getElementById("scaleLEAF").value );

    var points = initPoints(cnvs, M, fillLeaf, colLeaf, choice);

    for ( var i = 0 ; i < nbr ; ++i )
	points = nextStepLEAF(points);

    cntxt.clearRect(0,0, width, height);
    plotPoints(cnvs, points);
}

function nextStepLEAF(points) {
    var X = points.X;
    var Y = points.Y;
    var M = points.M;
    var J = X.length;

    var newPoints = new Points([],[],M);

    for (var j=0 ; j < J ; ++j ) {
	var X1 = 0.6*X[j] + M*0.18;
	var Y1 = 0.6*Y[j] + M*0.36;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.6*X[j] + M*0.18;
	Y1 = 0.6*Y[j] + M*0.12;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.4*X[j] + 0.3*Y[j] + M*0.27;
	Y1 = -0.3*X[j] + 0.4*Y[j] + M*0.32;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.4*X[j] - 0.3*Y[j] + M*0.27;
	Y1 = 0.3*X[j] + 0.4*Y[j] + M*0.09;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
    }
    return newPoints;
}
