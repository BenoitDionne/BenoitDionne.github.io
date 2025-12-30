% function ifs(X, N, syst, colour)
%
% X      : Initial set, a (2 x n) matrix storing the corners of the
%          closed polygonal curve.
% N      : The number of iterations.
% syst   : It is one of Sierpinski (default), Fern or Leaf
% colour : One of the colours accepted in Matlab plot/fill.
%          The default colour is blue.
%
   
function ifs(X, N, syst, colour)
    if ( nargin < 3 )
        syst = "Sierpinski";
        colour = 'blue';
    elseif ( nargin < 4 )
        colour = 'blue';
    end

    if ( strcmpi(syst,"Sierpinski") )
        for i=1:N
            fprintf('%d ',i)
            X = sierpinski(X);
        end
    elseif ( strcmpi(syst,"Fern") )
        for i=1:N
            fprintf('%d ',i)
            X = fern(X);
        end
    elseif ( strcmpi(syst,"Leaf") )
        for i=1:N
            fprintf('%d ',i)
            X = leaf(X);
        end
    else
        disp('No knows IFS has been given. Use help IFS for the instructions.');
        return;
    end

    cla;
    hold on;
    axis off;

    %    If the function fill() was behaving like the function
    %    plot() when a point with coordinates NaN is inserted,
    %    then the following three lines could be used instead of all the
    %    lines of code below them.
    %
    %    p = fill(X(1,:), X(2,:),'b');
    %    p.FaceColor = colour;
    %    p.EdgeColor = colour;

    I = find(isnan(X(1,:)));
    if ( length(I) == 0 )
        p = fill(X(1,:), X(2,:),'b');
        set(p,'FaceColor',colour);
        set(p,'EdgeColor',colour);
    else
        i1 = 1;
        i2 = I(1)-1;
        p = fill(X(1,i1:i2), X(2,i1:i2),'b');
        set(p,'FaceColor',colour);
        set(p,'EdgeColor',colour);
        i1 = I(1)+1;
        for i = 2:length(I)
            i2 = I(i)-1;
            p = fill(X(1,i1:i2), X(2,i1:i2),'b');
            set(p,'FaceColor',colour);
            set(p,'EdgeColor',colour);
            i1 = I(i)+1;
        end
        p = fill(X(1,i1:size(X,2)), X(2,i1:size(X,2)),'b');
        set(p,'FaceColor',colour);
        set(p,'EdgeColor',colour);
    end

    fprintf('\nThe figure has been drawn\n');
end

% Sierpinski Triangle

function XX = sierpinski(X)
    XX = [0.5 * X + [0 ; 0.5], [NaN ; NaN]];
    XX = [XX, 0.5 * X + [0.5 ; 0 ], [NaN ; NaN]];
    XX = [XX, 0.5 * X];
end

% fern

function XX = fern(X)
    XX = [[0 , 0 ; 0, 0.16]*X, [NaN; NaN]];
    XX = [XX, [0.85 , 0.04 ; -0.04 , 0.85]*X + [0 ; 1.6], [NaN ; NaN]];
    XX = [XX, [0.20 ,-0.26 ; 0.23 , 0.22]*X + [0 ; 1.6],[NaN ; NaN]];
    XX = [XX, [-0.15 , 0.28 ; 0.26 , 0.24]*X + [0 ; 0.44]];
end

% leaf

function XX = leaf(X)
    XX = [ [0.6 , 0 ; 0 , 0.6]*X + [0.18; 0.36],[NaN;NaN]];
    XX = [XX, [0.6 , 0 ; 0 , 0.6]*X + [0.18; 0.12], [NaN;NaN]];
    XX = [XX, [0.4, 0.3 ; -0.3 , 0.4]*X + [0.27; 0.32], [NaN;NaN]];
    XX = [XX, [0.4, -0.3 ; 0.3 , 0.4]*X + [0.27; 0.09]];
end
