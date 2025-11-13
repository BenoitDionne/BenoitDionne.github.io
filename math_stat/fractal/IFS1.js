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
}

class Curves {
    constructor(X,Y,N) {
	this.curvesX = X;
	this.curvesY = Y;
	this.initNbrVtx = N;
    }
}

function plotCurve(cntxt,X,Y,J,fillCurve) {
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

function clearIFS(CnvsName) {
    var cnvs = document.getElementById(CnvsName);
    if ( cnvs != null ) {
	var cntxt = cnvs.getContext("2d");
	cntxt.clearRect(0,0, cnvs.width, cnvs.height);
    }
}

function initObject(cnvsName, fillCurve, colour, choice) {
    var cnvs = document.getElementById(cnvsName);
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    return initObject2(cntxt, width, height, choice, fillCurve, colour);
}

function initObject2(cntxt, width, height, choice, fillCurve, colour) {
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
    plotCurve(cntxt, curvesX, curvesY, initNbrVtx+1, fillCurve);

    return new Curves(curvesX, curvesY, initNbrVtx);
}

/* Iteration on the pixel coordinates.  This function uses more computer
   memory than the function iterateSRPK2() below and so the number of
   iterations is limited. */ 
function iterateSRPK() {
    var cnvs = document.getElementById("SRPK");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrSRPK").value );
    var choice = Number( document.getElementById("initSRPK").value );
    var fillSrpk = ( document.getElementById("filledSRPK").value === 'true' );
    var colSrpk = document.getElementById("colourSRPK").value;

    var curves = initObject2(cntxt, width, height, choice, fillSrpk, colSrpk);

    for ( var i = 0 ; i < nbr ; ++i )
	curves = nextStepSRPK(curves, width, height);

    cntxt.clearRect(0, 0, cnvs.width, cnvs.height);
    var curvesX = curves.curvesX;
    var curvesY = curves.curvesY;
    var initNbrVtx = curves.initNbrVtx;

    var nb = curvesX.length;

    for ( var j = 0 ; j < nb ; j= (j+initNbrVtx+1) ) {
	plotCurve(cntxt, curvesX.slice(j,j+initNbrVtx+1), curvesY.slice(j,j+initNbrVtx+1), initNbrVtx+1, fillSrpk);
	}
}

function nextStepSRPK(curves, w, h) {
    var curvesX = curves.curvesX;
    var curvesY = curves.curvesY;
    var initNbrVtx = curves.initNbrVtx;

    var lh = curvesX.length;
    var lh2 = 2*lh;
    var newCurvesX = new Array(3*lh);
    var newCurvesY = new Array(3*lh);

    for (var i=0 ; i < lh ; ++i ){
	newCurvesX[i] = Math.floor(curvesX[i]/2);
	newCurvesY[i] = Math.floor(curvesY[i]/2);
	newCurvesX[i+lh] = Math.floor(curvesX[i]/2);
	newCurvesY[i+lh] = Math.floor((h+curvesY[i])/2);
	newCurvesX[i+lh2] = Math.floor((w+curvesX[i])/2);
	newCurvesY[i+lh2] = Math.floor((h+curvesY[i])/2);
    }
    return new Curves(newCurvesX, newCurvesY, initNbrVtx);
}

/* Iteration of the image.  This function can be used instead of
   iterateSRPK().  However, if the number of iteration is large, then
   the individual blocks of the Sierpinski become so small that they
   are basically represented by one pixel.  So, the drawing becomes
   basically invisible. */
function iterateSRPK2() {
    var cnvs = document.getElementById("SRPK");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrSRPK").value );
    var choice = Number( document.getElementById("initSRPK").value );
    var fillSrpk = ( document.getElementById("filledSRPK").value === 'true' );
    var colSrpk = document.getElementById("colourSRPK").value;
    
    initObject2(cntxt, width, height, choice, fillSrpk, colSrpk);

    var nw = Math.floor(width/2);
    var nh = Math.floor(height/2);
    for ( var i = 0 ; i < nbr ; i++ ) {
	var cnvs2 = document.createElement("canvas");
	cnvs2.width = width;
	cnvs2.height = height;
	var cntxt2 = cnvs2.getContext("2d");

	cntxt2.drawImage(cnvs, 0, 0, width, height);
	cntxt.clearRect(0, 0, cnvs.width, cnvs.height);
	cntxt.drawImage(cnvs2, 0, 0, width, height, 0, 0, nw, nh);
	cntxt.drawImage(cnvs2, 0, 0, width, height, 0, nh, nw, nh);
	cntxt.drawImage(cnvs2, 0, 0, width, height, nw, nh, nw, nh);
	/* Second option, both work fine
	   cntxt2.drawImage(cnvs, 0, 0, width, height);
	   cntxt2.scale(0.5,0.5);
	   cntxt.clearRect(0, 0, cnvs.width, cnvs.height);
	   cntxt.drawImage(cnvs2, 0, 0);
	   cntxt.drawImage(cnvs2, 0, nh);
	   cntxt.drawImage(cnvs2, nw, nh);
	*/
    }
}

