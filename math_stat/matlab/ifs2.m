% function ifs2(X, N, syst, colour)
%
% X      : Initial set, a (2 x n) matrix storing the corners of the
%          polygonal curve.
% N      : The number of iterations.
% syst   : It is one of Sierpinski (default), Fern or Leaf
% colour : One of the colours accepted in Matlab plot/fill.
%          The default colour is blue.
%
   
function ifs2(X, N, syst, colour)
    if ( nargin < 3 )
        syst = "Sierpinski";
        colour = 'blue';
    elseif ( nargin < 4 )
        colour = 'blue';
    end

    M = 400;

    % We rescale the initial polygonal curve to get the set T.
    ro = [];
    co = [];
    X1 = floor(M*X(:,1));
    for i = 2:size(X,2)
        X2 = floor(M*X(:,i));
        R = max(abs(X1(1,1)-X2(1,1)),abs(X1(2,1)-X2(2,1)))+1;
        ro = [ro,floor(linspace(X1(1,1),X2(1,1),R))];
        co = [co,floor(linspace(X1(2,1),X2(2,1),R))];
        X1 = X2;
    end
    rc = unique([ro;co]','rows');

    % We compute the iterations of the selected IFS starting with T.
    if ( strcmpi(syst,"Sierpinski") )
        for i = 1:N
            fprintf('%d ',i)
            rc = sierpinski(rc,M);
        end
    elseif ( strcmpi(syst,"Fern") )
        for i=1:N
            fprintf('%d ',i)
            rc = fern(rc,M);
        end
    elseif ( strcmpi(syst,"Leaf") )
        for i=1:N
            fprintf('%d ',i)
            rc = leaf(rc,M);
        end
    else
        disp('No knows IFS has been given. Use help IFS for the instructions.');
        return;
    end

    cla;
    hold on;
    axis off;
    
    % We rescale the resulting set to the initial coordinate system.
    ro = rc(:,1)/M;
    co = rc(:,2)/M;
    
    % We draw the resulting set.
    p = plot(ro,co,'.');
    set(p,'Color',colour);

    fprintf('\nThe figure has been drawn\n');
end

% Sierpinski Triangle

function RC = sierpinski(rc,M)
    ro = rc(:,1);
    co = rc(:,2);
    r1 = 0.5*ro;
    c1 = 0.5*co + M*0.5;
    r2 = 0.5*ro + M*0.5;
    c2 = 0.5*co;
    r3 = 0.5*ro;
    c3 = 0.5*co;
    r = floor([r1;r2;r3]);
    c = floor([c1;c2;c3]);
    RC = unique([r,c],'rows');
end

% fern

function RC = fern(rc,M)
    ro = rc(:,1);
    co = rc(:,2);
    r1 = 0*ro;
    c1 = 0.16*co;
    r2 = 0.85*ro + 0.04*co;
    c2 = -0.04*ro + 0.85*co + M*1.6;
    r3 = 0.20*ro - 0.26*co;
    c3 = 0.23*ro + 0.22*co + M*1.6;
    r4 = -0.15*ro + 0.28*co;
    c4 = 0.26*ro + 0.24*co + M*0.44;
    r = floor([r1;r2;r3;r4]);
    c = floor([c1;c2;c3;c4]);
    RC = unique([r,c],'rows');
end

% leaf

function RC = leaf(rc,M)
    ro = rc(:,1);
    co = rc(:,2);
    r1 = 0.6*ro + M*0.18;
    c1 = 0.6*co + M*0.36;
    r2 = 0.6*ro + M*0.18;
    c2 = 0.6*co + M*0.12;
    r3 = 0.4*ro + 0.3*co + M*0.27;
    c3 = -0.3*ro + 0.4*co + M*0.32;
    r4 = 0.4*ro - 0.3*co + M*0.27;
    c4 = 0.3*ro + 0.4*co + M*0.09;
    r = floor([r1;r2;r3;r4]);
    c = floor([c1;c2;c3;c4]);
    RC = unique([r,c],'rows');
end
