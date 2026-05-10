window.onload = apps_init;

function apps_init() {
    if ( document.getElementById("FractalCanvas") != null ) {
	var initSet = document.getElementById("initSet");
	var filledSet = document.getElementById("filledSet");
	var initS = 0;
	var filled = false;
	var colour = "black";
	var colourE = null;
	var choice = "SRPK";

	if ( filledSet != null )
	    filled = ( filledSet.value === 'true' );
	if ( initSet != null ) {
	    initS = initSet.value;
	    initSet.onchange = function() { apps_init(); }
	}
	
	var IFSchoice = document.getElementById("IFSchoice");
	if ( IFSchoice != null ) {
	    IFSchoice.onchange = function() { apps_init(); }
	    choice = IFSchoice.value;
	    if ( choice == "SRPK" ) {
		colourE = document.getElementById("colourSRPK");
	    }
	    else if ( choice == "SRPKVAR" ) {
		colourE = document.getElementById("colourSRPKVAR");
	    }
	    else if ( choice == "FERN" ) {
		colourE = document.getElementById("colourFERN");
	    }
	    else if ( choice == "LEAF" ) {
		colourE = document.getElementById("colourLEAF");
	    }
	    else if ( choice == "TREE" ) {
		colourE = document.getElementById("colourTREE");
	    }
	    else if ( choice == "CRYSTAL" ) {
		colourE = document.getElementById("colourCRYSTAL");
	    }
	    else if ( choice == "TREEcond" ) {
		colourE = document.getElementById("colourTREEcond");
	    }
	}
	if ( colourE != null )
	    colour = colourE.value;
	
	initObject("FractalCanvas", filled, colour, initS);
    }
}

class Curves {
    constructor(X,Y) {
	this.X = X;
	this.Y = Y;
    }
}

function plotCurve(cntxt,curve,filled) {
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
    if ( filled ) {
    	cntxt.fill();
    }
    cntxt.save();
}

function initObject(cnvsName, filled, colour, initS) {
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
    
    if ( initS == 1 ) {
	curvesX = [0, w2, w2, 0, 0];
	curvesY = [0, 0, h2, h2, 0];
    } else if ( initS == 2 ) {
	var w3 = Math.floor(width/2);
	var h3 = Math.floor(height/2);
	curvesX = [w3, w2, w3, 0, w3];
	curvesY = [0, h3, h2, h3, 0];
    }
    
    // The initial figure
    cntxt.strokeStyle = colour;
    if ( filled ) {
	cntxt.fillStyle = colour;
    }
    
    var newcurve = new Curves(curvesX, curvesY);
    plotCurve(cntxt, newcurve, filled);
}

/* *********************************************************************** */

function clearIFS(CnvsName) {
    var cnvs = document.getElementById(CnvsName);
    if ( cnvs != null ) {
	var cntxt = cnvs.getContext("2d");
	cntxt.clearRect(0,0, cnvs.width, cnvs.height);
    }
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

function initPoints(cnvs, M, filled, colour, initS) {
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    cntxt.clearRect(0, 0, width, height);

    /* The default curve is the triangle */
    var X = [0, 1, 0, 0];
    var Y = [0, 0, 1, 0];
    
    if ( initS == 1 ) {
	X = [0, 1, 1, 0, 0];
	Y = [0, 0, 1, 1, 0];
    } else if ( initS == 2 ) {
	X = [1/2, 1, 1/2, 0, 1/2];
	Y = [0, 1/2, 1, 1/2, 0];
    }

    var points = new Points(X, Y, M);
    points.create(filled);
    
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
function iterateIFS() {
    var cnvs = document.getElementById("FractalCanvas");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbrItr = document.getElementById("nbrItr");
    var scaleP = document.getElementById("scalePlot");
    var initSet = document.getElementById("initSet");
    var filledSet = document.getElementById("filledSet");
    var initS = 0;
    var filled = false;
    var colour = "black";
    var colourE = null;
    var choice = "SRPK";
    var nbr = 7;
    var M = 400;

    if ( nbrItr != null )
	nbr = nbrItr.value;

    if ( scaleP != null )
	M = scaleP.value;

    if ( filledSet != null )
	filled = ( filledSet.value === 'true' );

    if ( initSet != null )
	initS = initSet.value;

    var IFSchoice = document.getElementById("IFSchoice");
    if ( IFSchoice != null ) {
	choice = IFSchoice.value;
	if ( choice == "SRPK" ) {
	    colourE = document.getElementById("colourSRPK");
	    if ( colourE != null )
		colour = colourE.value;
	    var points = initPoints(cnvs, M, filled, colour, initS);
	    for ( var i = 0 ; i < nbr ; ++i )
		points = nextStepSRPK(points);
	}
	else if ( choice == "SRPKVAR" ) {
	    colourE = document.getElementById("colourSRPKVAR");
	    if ( colourE != null )
		colour = colourE.value;
	    var points = initPoints(cnvs, M, filled, colour, initS);
	    for ( var i = 0 ; i < nbr ; ++i )
		points = nextStepSRPKVAR(points);
	}
	else if ( choice == "FERN" ) {
	    colourE = document.getElementById("colourFERN");
	    if ( colourE != null )
		colour = colourE.value;
	    var points = initPoints(cnvs, M, filled, colour, initS);
	    for ( var i = 0 ; i < nbr ; ++i )
		points = nextStepFERN(points);
	}
	else if ( choice == "LEAF" ) {
	    colourE = document.getElementById("colourLEAF");
	    if ( colourE != null )
		colour = colourE.value;
	    var points = initPoints(cnvs, M, filled, colour, initS);
	    for ( var i = 0 ; i < nbr ; ++i )
		points = nextStepLEAF(points);
	}
	else if ( choice == "TREE" ) {
	    colourE = document.getElementById("colourTREE");
	    if ( colourE != null )
		colour = colourE.value;
	    var points = initPoints(cnvs, M, filled, colour, initS);
	    for ( var i = 0 ; i < nbr ; ++i )
		points = nextStepTREE(points);
	}
	else if ( choice == "CRYSTAL" ) {
	    colourE = document.getElementById("colourCRYSTAL");
	    if ( colourE != null )
		colour = colourE.value;
	    var points = initPoints(cnvs, M, filled, colour, initS);
	    for ( var i = 0 ; i < nbr ; ++i )
		points = nextStepCRYSTAL(points);
	}
	else if ( choice == "TREEcond" ) {
	    colourE = document.getElementById("colourTREEcond");
	    if ( colourE != null )
		colour = colourE.value;
	    var points = initPoints(cnvs, M, filled, colour, initS);
	    for ( var i = 0 ; i < nbr ; ++i )
		points = nextStepTREEcond(points);
	}
    }

    cntxt.clearRect(0,0, width, height);
    plotPoints(cnvs, points);
}

/* Iterations on the discretized coordinates of the rescaled IFS */
function nextStepSRPK(points) {
    var X = points.X;
    var Y = points.Y;
    var M = points.M;
    var J = X.length;

    var newPoints = new Points([],[],M);

    for (var j=0 ; j < J ; ++j) {
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

function nextStepSRPKVAR(points) {
    var X = points.X;
    var Y = points.Y;
    var M = points.M;
    var J = X.length;

    var newPoints = new Points([],[],M);

    for (var j=0 ; j < J ; ++j) {
	var X1 = 0.5*X[j];
	var Y1 = 0.5*Y[j] + M*0.5;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = -0.5*X[j] + M*0.5;
	Y1 = 0.5*Y[j];
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = -0.5*Y[j] + M;
	Y1 = -0.5*X[j] + M*0.5;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
    }
    return newPoints;
}

function nextStepFERN(points) {
    var X = points.X;
    var Y = points.Y;
    var M = points.M;
    var J = X.length;

    var newPoints = new Points([],[],M);

    for (var j=0 ; j < J ; ++j) {
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

function nextStepLEAF(points) {
    var X = points.X;
    var Y = points.Y;
    var M = points.M;
    var J = X.length;

    var newPoints = new Points([],[],M);

    for (var j=0 ; j < J ; ++j) {
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

function nextStepTREE(points) {
    var X = points.X;
    var Y = points.Y;
    var M = points.M;
    var J = X.length;

    var newPoints = new Points([],[],M);

    for (var j=0 ; j < J ; ++j) {
	var X1 = 0.195*X[j] - 0.488*Y[j] + M*0.4431;
	var Y1 = 0.344*X[j] + 0.443*Y[j] + M*0.2452;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.462*X[j] + 0.414*Y[j] + M*0.2511;
	Y1 = -0.252*Y[j] + 0.361*Y[j] + M*0.5692;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = -0.058*X[j] - 0.070*Y[j] + M*0.5976;
	Y1 = 0.453*X[j] - 0.111*Y[j] + M*0.0969;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = -0.035*X[j] + 0.070*Y[j] + M*0.4884;
	Y1 = -0.469*X[j] - 0.022*Y[j] + M*0.5069;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = -0.637*X[j] + M*0.8562;
	Y1 = 0.501*Y[j] + M*0.2513;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
    }
    return newPoints;
}

function nextStepCRYSTAL(points) {
    var X = points.X;
    var Y = points.Y;
    var M = points.M;
    var J = X.length;

    var newPoints = new Points([],[],M);

    for (var j=0 ; j < J ; ++j) {
	var X1 = 0.255*X[j] + M*0.3726;
	var Y1 = 0.255*Y[j] + M*0.6714;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.255*X[j] + M*0.1146;
	Y1 = 0.255*Y[j] + M*0.2232;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.255*X[j] + M*0.6306;
	Y1 = 0.255*Y[j] + M*0.2232;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.370*X[j] - 0.642*Y[j] + M*0.6356;
	Y1 = 0.642*X[j] + 0.370*Y[j] - M*0.0061;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
    }
    return newPoints;
}

function nextStepTREEcond(points) {
    var X = points.X;
    var Y = points.Y;
    var M = points.M;
    var J = X.length;

    var newPoints = new Points([],[],M);
    var SQRT2 = Math.sqrt(2);
    var SQRT3 = Math.sqrt(3);
    var COSpi10 = Math.cos(Math.PI/10); 
    var SINpi10 = Math.sin(Math.PI/10);
    Transl11 = 0.5-0.15*SQRT2;
    Transl12 = 0.5-0.15*SQRT2;
    Transl21 = 0.5-0.15;
    Transl22 = 0.5+0.15*SQRT3;
    Transl31 = 0.5-0.2*COSpi10;
    Transl32 = 0.5-0.2*SINpi10;

    var R = Math.round(M/2);
    var S = 0;
    for (var j=0 ; j <= R ; ++j) {
	newPoints.push(R,S);
	S = S + 1;
    }
    for (var j=0 ; j < J ; ++j ) {
	var X1 = 0.3*SQRT2*(X[j]-Y[j]) + M*Transl11;
	var Y1 = 0.3*SQRT2*(X[j]+Y[j]) + M*Transl12;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.3*(X[j]+SQRT3*Y[j]) + M*Transl21;
	Y1 = 0.3*(-SQRT3*X[j]+Y[j]) + M*Transl22;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
	X1 = 0.4*(COSpi10*X[j]-SINpi10*Y[j]) + M*Transl31;
	Y1 = 0.4*(SINpi10*X[j]+COSpi10*Y[j]) + M*Transl32;
	newPoints.push(Math.floor(X1),Math.floor(Y1));
    }
    return newPoints;
}
