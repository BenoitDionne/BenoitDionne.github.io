function PcDDS() {
    var cnvs = document.getElementById("PcDDScanvas");
    var width = cnvs.width;
    var height = cnvs.height;

    /* We draw in a square inside the canvas. */
    var dim = Math.min(height,width);
    
    var ctx = cnvs.getContext("2d");

    var c = Number( document.getElementById("PcValue").value );
    var nbr = Number( document.getElementById("PcNbr").value );
    var Z = [ Number( document.getElementById("PcZ0").value ) ];
    //    var Z = [0];
    var max = 0;
    var min = 0;
    var d = 1 - 4*c;
    var p1 = NaN;
    var p2 = NaN;
    if ( d > 0 ) {
	p1 = (1 + Math.sqrt(d))/2;
	p2 = (1 - Math.sqrt(d))/2;
    }
	    
    /* We compute the iterations. */
    for ( var i = 0 ; i < nbr ; i++ ) {
	Z.push(Z[i]**2 + c);
	max = Math.max(max,Z[i+1]);
	min = Math.min(min,Z[i+1]);
    }
    if ( !isNaN(p1) ) {
	max = Math.max(max,1.05*p1);
	min = Math.min(min,-1.05*p1);
    }
    var delta = dim/(max-min);

    ctx.clearRect(0,0, cnvs.width, cnvs.height);

    /* We draw the grid. */
    var grid = (max-min)/10;
    var j1 = Math.floor(max/grid);
    var j2 = Math.floor(min/grid);
    ctx.beginPath();
    for ( var j = j2 ; j <= j1 ; j++ ) {
	if ( j != 0 ) {
	    var t = Math.floor((j*grid-min)*delta);
	    ctx.moveTo(t, 0);
	    ctx.lineTo(t, dim);
	    ctx.moveTo(0, dim - t);
	    ctx.lineTo(dim, dim - t);
	}
    }
    ctx.strokeStyle = 'grey';
    ctx.setLineDash([1,4]);
    ctx.stroke();
    ctx.closePath();

    /* We draw the labels and the axes. */
    var t = Math.floor((0-min)*delta);
    ctx.beginPath();
    ctx.moveTo(t, 0);
    ctx.lineTo(t, dim);
    ctx.fillText("z", t+5, Math.floor(dim/4));
    ctx.fillText("n+1", t+11, Math.floor(dim/4)+5);
    ctx.moveTo(0, dim - t);
    ctx.lineTo(dim, dim - t);
    ctx.fillText("z", Math.floor(3*dim/4), dim-t-10);
    ctx.fillText("n", Math.floor(3*dim/4)+6, dim-t-5);
    ctx.strokeStyle = 'black';
    ctx.setLineDash([0]);
    ctx.stroke();
    ctx.closePath();

    /* We draw the line  y = x. */
    ctx.beginPath();
    ctx.moveTo(dim, 0);
    ctx.lineTo(0, dim);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();

    /* We draw the line  w = z^2 + c for min <= z <= max and
       min <= w <= max. */
    ctx.beginPath();
    var M = Math.floor(dim/2);
    var Mmd = 2*(max-min)/dim;
    var z;
    ctx.beginPath();
    for ( var j = 0 ; j <= M ; j++ ) {
	z = min + j*Mmd;
	var w = dim - Math.floor((z**2 + c - min)*delta);
	if ( j == 0 ) {
	    ctx.moveTo(2*j,w);
	}
	else {
	    ctx.lineTo(2*j,w);
	}
    }
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    /* We write the value of the last iteration. */
    ctx.beginPath();
    var u = "z_"+nbr+" = ";
    var u1 = ctx.measureText(Z[nbr].toPrecision(7).toString()).width;
    var u2 = ctx.measureText(u).width;
    ctx.fillText(u, dim-u1-u2-50, Math.floor(dim/20));
    ctx.fillText(Z[nbr].toPrecision(7), dim-u2-50, Math.floor(dim/20));
    ctx.stroke();
    ctx.closePath();

    /* We draw the cobweb. */
    ctx.beginPath();
    s = Math.floor((Z[0]-min)*delta);
    ctx.moveTo(s, dim - t);
    for ( var j = 0 ; j < nbr ; j++ ) {
	t = Math.floor((Z[j+1]-min)*delta);
	ctx.lineTo(s, dim - t);
	ctx.lineTo(t, dim - t);
	s = t;
    }
    ctx.strokeStyle = 'blue';
    ctx.setLineDash([0]);
    ctx.stroke();
    ctx.closePath();
}

function clearPc(name) {
    var cnvs = document.getElementById(name);
    if ( cnvs != null ) {
	var ctx = cnvs.getContext("2d");
	ctx.clearRect(0,0, cnvs.width, cnvs.height);
    }
}
