window.onload = apps_init;

function apps_init() {
    var initSRPK = document.getElementById("initSRPK");

    if ( initSRPK != null )
	initSRPK.onchange = function() {
	    var n = initSRPK.value;
	    initObject("SRPK", true, n);
	}

    initObject("SRPK", true, 0);
    initSRPK.value = 0;
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

function clearIFS(CnvsName) {
    var cnvs = document.getElementById(CnvsName);
    if ( cnvs != null ) {
	var cntxt = cnvs.getContext("2d");
	cntxt.clearRect(0,0, cnvs.width, cnvs.height);
    }
}

function initObject(cnvsName, fillCurve, choice) {
    var cnvs = document.getElementById(cnvsName);
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    return initObject2(cntxt, width, height, choice, fillCurve);
}

function initObject2(cntxt, width, height, choice, fillCurve) {
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

/* Iteration on the image */
function iterateSRPK2() {
    var cnvs = document.getElementById("SRPK");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrSRPK").value );
    var choice = Number( document.getElementById("initSRPK").value );

    cntxt.clearRect(0, 0, width, height);

    var curve = initObject2(cntxt, width, height, choice, true);

    var nw = Math.floor(width/2);
    var nh = Math.floor(height/2);
    for ( var i = 0 ; i < nbr ; i++ ) {
	var cnvs2 = document.createElement("canvas");
	cnvs2.width = width;
	cnvs2.height = height;
	var cntxt2 = cnvs2.getContext("2d");
	/* option 1 , both work fine
	cntxt2.scale(0.5,0.5);
	*/
	cntxt2.drawImage(cnvs, 0, 0, width, height);
	cntxt.clearRect(0, 0, cnvs.width, cnvs.height);
	/* option 1
	cntxt.drawImage(cnvs2, 0, 0);
	cntxt.drawImage(cnvs2, 0, nh);
	cntxt.drawImage(cnvs2, nw, nh);
	*/
	cntxt.drawImage(cnvs2, 0, 0, width, height, 0, 0, nw, nh);
	cntxt.drawImage(cnvs2, 0, 0, width, height, 0, nh, nw, nh);
	cntxt.drawImage(cnvs2, 0, 0, width, height, nw, nh, nw, nh);
    }
}

/* Iteration on the pixel coordinates */
function iterateSRPK() {
    var cnvs = document.getElementById("SRPK");
    var width = cnvs.width;
    var height = cnvs.height;
    var cntxt = cnvs.getContext("2d");

    var nbr = Number( document.getElementById("nbrSRPK").value );
    var choice = Number( document.getElementById("initSRPK").value );

    cntxt.clearRect(0, 0, width, height);

    var curves = initObject2(cntxt, width, height, choice, false);

    for ( var i = 0 ; i < nbr ; ++i ) {
	cntxt.clearRect(0,0, width, height);
	curves = nextStepSRPK(curves, width, height);
	var curvesX = curves.curvesX;
	var curvesY = curves.curvesY;
	var step = curves.step;

	var nb = curvesX.length;
	for ( var j = 0 ; j < nb ; j=j+step ) {
	    plotCurve(cntxt, curvesX.slice(j,j+step),
		      curvesY.slice(j,j+step), step, false);
	}
    }
}

function nextStepSRPK(curves, w, h) {
    var curvesX = curves.curvesX;
    var curvesY = curves.curvesY;
    var step = curves.step;

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
    return new Curves(newCurvesX, newCurvesY, step);
}

