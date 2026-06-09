f = @(x,m) m.*x.*(1-x);

% To produce the image logistic4.png
bifurc(f,[2.5,3.99,0,1],0.5,0.001,[400,200])

% To produce the image logistic5.png
bifurc(f,[3.5 3.7 0.7 0.95],0.5,0.0001,[500 250])

% To produce the image logistic6.png
bifurc(f,[3.633 3.635 0.825 0.843],0.5,0.0000002,[700 300])

% To produce the image logistic7.png
bifurc(f,[3.6339 3.6341 0.825 0.843],0.5,0.00000005,[700 350])
