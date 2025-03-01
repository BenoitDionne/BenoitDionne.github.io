function linearDDS() {
    var cnvs = document.getElementById("linearDDS");
    var width = cnvs.width;
    var height = cnvs.height;

    /* We draw in a square inside the canvas */
    var dim = Math.min(height,width);
    
    var ctx = cnvs.getContext("2d");

    var m = Number( document.getElementById("linear_m").value );
    var b = Number( document.getElementById("linear_b").value );
    var x = Number( document.getElementById("linear_x").value );
    var nbr = Number( document.getElementById("linear_nbr").value );
    var X = [x];
    var max = x;
    var min = x;
    var p;
    if ( m != 1 ) {
	p = b/(1-m);
    }
    else {
	p = x;
    }

    /* We compute the iterations */
    for ( var i = 0 ; i < nbr ; i++ ) {
	X.push(m*X[i] + b);
	max = Math.max(max,X[i+1]);
	min = Math.min(min,X[i+1]);
    }
    max = Math.max(max,1.05*p,b,1.05*x);
    min = Math.min(0.1*(min-max),min,1.05*p,b,1.05*x);
    var delta = dim/(max-min);
    var t;

    ctx.clearRect(0,0, cnvs.width, cnvs.height);

    /* We draw the grid */
    var grids = (max-min)/10;
    ctx.beginPath();
    /* To the left of the y axis and below de x axis. */
    var j = 1;
    while ( 1 == 1 ) {
	var step = -j*grids;
	if ( step > min ) {
	    t = Math.floor( (step-min)*delta);
	    ctx.moveTo(t, 0);
	    ctx.lineTo(t, dim);
	    ctx.moveTo(0, dim - t);
	    ctx.lineTo(dim, dim - t);
	    j++;
	}
	else {
	    break;
	}
    }
    /* The grid in the first quadrant */
    j = 1;
    while ( 1 == 1 ) {
	var step = j*grids;
	if ( step < max ) {
	    t = Math.floor( (step-min)*delta);
	    ctx.moveTo(t, 0);
	    ctx.lineTo(t, dim);
	    ctx.moveTo(0, dim - t);
	    ctx.lineTo(dim, dim - t);
	    j++;
	}
	else {
	    break;
	}
    }
    ctx.strokeStyle = 'grey';
    ctx.setLineDash([1,4]);
    ctx.stroke();
    ctx.closePath();

    /* We draw and label the axis */
    t = Math.floor((0-min)*delta);
    ctx.beginPath();
    ctx.moveTo(t, 0);
    ctx.lineTo(t, dim);
    ctx.fillText("x", t+5, Math.floor(dim/4));
    ctx.fillText("n+1", t+11, Math.floor(dim/4)+5);
    ctx.moveTo(0, dim - t);
    ctx.lineTo(dim, dim - t);
    ctx.fillText("x", Math.floor(3*dim/4), dim-t-10);
    ctx.fillText("n", Math.floor(3*dim/4)+6, dim-t-5);
    ctx.strokeStyle = 'black';
    ctx.setLineDash([0]);
    ctx.stroke();
    ctx.closePath();

    /* We draw the line  y = x */
    ctx.beginPath();
    ctx.moveTo(dim, 0);
    ctx.lineTo(0, dim);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();

    /* We draw the line  y = m x + b */
    ctx.beginPath();
    ctx.moveTo(0, dim - Math.floor(((m-1)*min+b)*delta));
    ctx.lineTo(dim, dim - Math.floor(((m*max+b)-min)*delta));
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();

    /* We identify the equilibrium */
    var s;
    if ( m != 1 ) {
	ctx.beginPath();
	s = Math.floor((p-min)*delta); 
	ctx.moveTo(t, dim - s);
	ctx.lineTo(s, dim - s);
	ctx.moveTo(s, dim - t);
	ctx.lineTo(s, dim - s);
	var u1 = ctx.measureText("p=").width;
	var u2 = ctx.measureText(p.toString()).width;
	s = Math.min(dim - u1 - u2, s-5);
	ctx.fillText("p=", s, dim-t+10);
	ctx.fillText(p, s+u1, dim-t+10);
	ctx.strokeStyle = 'green';
	ctx.setLineDash([5,5]);
	ctx.stroke();
	ctx.closePath();
    }

    /* We draw the cobweb */
    ctx.beginPath();
    s = Math.floor((X[0]-min)*delta); 
    ctx.moveTo(s, dim - t);
    var r = Math.min(dim-ctx.measureText(X[0].toString()).width, s-5);
    ctx.fillText(X[0], r, dim-t+10);

    for ( var i = 0 ; i < nbr ; i++ ) {
	t = Math.floor((X[i+1]-min)*delta);
	ctx.lineTo(s, dim - t);
	ctx.lineTo(t, dim - t);
	s = t;
    }
    ctx.strokeStyle = 'black';
    ctx.setLineDash([0]);
    ctx.stroke();
    ctx.closePath();
}        

function clearDDS(name) {
    var cnvs = document.getElementById(name);
    if ( cnvs != null ) {
	var ctx = cnvs.getContext("2d");
	ctx.clearRect(0,0, cnvs.width, cnvs.height);
    }
}

/* The logistic mapping */
function logisticDDS(lang) {
    var cnvs = document.getElementById("DDS");
    var width = cnvs.width;
    var height = cnvs.height;

    /* We draw in a square inside the canvas */
    var dim = Math.min(height,width);
    
    var ctx = cnvs.getContext("2d");

    var mu = Number( document.getElementById("logistic_mu").value );
    var x = Number( document.getElementById("logistic_x").value );
    var nbr = Number( document.getElementById("logistic_nbr").value );

    ctx.clearRect(0,0, cnvs.width, cnvs.height);
	
    if ( (mu <= 1) || (4 <= mu) ) {
	ctx.beginPath();
	var u = "You must have 1 < mu < 4.";
	if ( lang == "French" ) {
	    u = "Vous devez avoir 1 < mu < 4.";
	}
	ctx.fillText(u, Math.floor(4*width/10), Math.floor(4*height/10));
	ctx.stroke();
	ctx.closePath();
	exit;
    }
    if ( (x <= 0) || (1 <= x) ) {
	ctx.beginPath();
	var u = "You must have 0 < x < 1";
	if ( lang == "French" ) {
	    u = "Vous devez avoir 0 < x < 1";
	}
	ctx.fillText(u, Math.floor(4*width/10), Math.floor(4*height/10));
	ctx.stroke();
	ctx.closePath();
	exit;
    }

    var X = [x];
    var max = x;
    var min = x;

    var p = (mu-1)/mu;

    for ( var i = 0 ; i < nbr ; i++ ) {
	X.push(mu*X[i]*(1-X[i]));
	max = Math.max(max,X[i+1]);
	min = Math.min(min,X[i+1]);
    }

    max = Math.max(max, 1.05*p, 1.1);   /* Always 1.1 because of the
					   constrains on the parameters. */
    min = Math.min(-0.1,min,p);         /* Always -0.1 because of the
					   constrains on the parameters. */
    var delta = dim/(max-min);
    var t;

    /* We draw the grid */
    var grids = (max-min)/10;
    ctx.beginPath();
    /* To the left of the y axis and below de x axis. */
    var j = 1;
    while ( 1 == 1 ) {
	var step = -j*grids;
	if ( step > min ) {
	    t = Math.floor( (step-min)*delta);
	    ctx.moveTo(t, 0);
	    ctx.lineTo(t, dim);
	    ctx.moveTo(0, dim - t);
	    ctx.lineTo(dim, dim - t);
	    j++;
	}
	else {
	    break;
	}
    }
    /* The grid in the first quadrant. */
    j = 1;
    while ( 1 == 1 ) {
	var step = j*grids;
	if ( step < max ) {
	    t = Math.floor( (step-min)*delta);
	    ctx.moveTo(t, 0);
	    ctx.lineTo(t, dim);
	    ctx.moveTo(0, dim - t);
	    ctx.lineTo(dim, dim - t);
	    j++;
	}
	else {
	    break;
	}
    }
    ctx.strokeStyle = 'grey';
    ctx.setLineDash([1,4]);
    ctx.stroke();
    ctx.closePath();

    /* We draw and label the axes */
    t = Math.floor((0-min)*delta);
    ctx.beginPath();
    ctx.moveTo(t, 0);
    ctx.lineTo(t, dim);
    ctx.fillText("x", t+5, Math.floor(dim/4));
    ctx.fillText("n+1", t+11, Math.floor(dim/4)+5);
    ctx.moveTo(0, dim - t);
    ctx.lineTo(dim, dim - t);
    ctx.fillText("x", Math.floor(3*dim/4), dim-t-10);
    ctx.fillText("n", Math.floor(3*dim/4)+6, dim-t-5);
    ctx.strokeStyle = 'black';
    ctx.setLineDash([0]);
    ctx.stroke();
    ctx.closePath();

    /* We write the value of the last iteration */
    ctx.beginPath();
    var u = "value of x_"+nbr+" = ";
    if ( lang == "French" ) {
	u = "valeur de x_"+nbr+" = ";
    }
    var u1 = ctx.measureText(X[nbr].toString()).width;
    var u2 = ctx.measureText(u).width;
    ctx.fillText(u, dim-u1-u2-50, Math.floor(dim/20));
    ctx.fillText(X[nbr], dim-u2-50, Math.floor(dim/20));
    ctx.stroke();
    ctx.closePath();

    /* We draw the line y = x */
    ctx.beginPath();
    ctx.moveTo(dim, 0);
    ctx.lineTo(0, dim);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();

    /* We draw the portion of the generating function  mu*x*(1-x) that
       is include between min and max. */
    var M = Math.floor(dim/2);
    var Mmd = 2*(max-min)/dim;
    var c;
    ctx.beginPath();
    var i = 0;
    for ( ; i < M ; i++ ) {
	c = min + i*Mmd;
	var y = dim - Math.floor((mu*c*(1-c)-min)*delta);
	if ( y > dim || y < 0 ) {;}
	else {
	    ctx.moveTo(2*i,y);
	    break;
	}
    }
    for ( ; i <= M ; i++ ) {
	c = min + i*Mmd;
	var y = dim - Math.floor((mu*c*(1-c)-min)*delta);
	if ( y > dim || y < 0 ) {;}
	else {
	    ctx.lineTo(2*i,y);
	}
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();

    /* We identify the non-zero equilibrium */
    var s;
    ctx.beginPath();
    s = Math.floor((p-min)*delta);
    ctx.moveTo(t, dim - s);
    ctx.lineTo(s, dim - s);
    ctx.moveTo(s, dim - t);
    ctx.lineTo(s, dim - s);
    u1 = ctx.measureText("p=").width;
    u2 = ctx.measureText(p.toString()).width;
    s = Math.min(dim - u1 - u2, s-5);
    ctx.fillText("p=", s, dim-t+10);
    ctx.fillText(p, s+u1, dim-t+10);
    ctx.strokeStyle = 'green';
    ctx.setLineDash([5,5]);
    ctx.stroke();
    ctx.closePath();

    /* We draw the cobweb */
    ctx.beginPath();
    s = Math.floor((X[0]-min)*delta); 
    ctx.moveTo(s, dim - t);
    var r = Math.min(dim-ctx.measureText(X[0].toString()).width, s-5);
    ctx.fillText(X[0], r, dim-t+10);

    for ( var i = 0 ; i < nbr ; i++ ) {
	t = Math.floor((X[i+1]-min)*delta);
	ctx.lineTo(s, dim - t);
	ctx.lineTo(t, dim - t);
	s = t;
    }
    ctx.strokeStyle = 'black';
    ctx.setLineDash([0]);
    ctx.stroke();
    ctx.closePath();
}
