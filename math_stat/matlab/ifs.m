% function ifs(X, N, syst, colour)
%
% Compute the iterations of the function defined by an IFS starting
% with a given closed polygonal curve.
%
% X      : Initial polygonal curve, a (2 x n) matrix storing the corners
%          of the closed polygonal curve.
% N      : The number of iterations.
% syst   : A cell array of function handles for the functions in the IFS.
% colour : One of the colours accepted in Matlab plot/fill.
%          The default colour is blue.
%
function ifs(X, N, syst, colour)
    if ( nargin < 4 )
        colour = 'blue';
        if ( nargin < 3 )
            disp("Not enough arguments.  Use the help command with ifs.")
            return;
        end
    end

    for i=1:N
        fprintf('%d ',i)
        XX = [];
        for j=1:length(syst)
            XX = [XX , syst{j}(X), [NaN;NaN]];
        end
        X = XX;
    end

    cla;
    hold on;
    axis off;
    axis equal;

    %    If the function fill() was behaving like the function
    %    plot() when a point with coordinates NaN is inserted,
    %    then the following three lines could be used instead of all the
    %    lines of code below them.
    %
    %    p = fill(X(1,:), X(2,:),'b');
    %    p.FaceColor = colour;
    %    p.EdgeColor = colour;

    I = find(isnan(X(1,:)));
    i1 = 1;
    for i = 1:length(I)
        i2 = I(i)-1;
        p = fill(X(1,i1:i2), X(2,i1:i2),'b');
        set(p,'FaceColor',colour);
        set(p,'EdgeColor',colour);
        if (i < length(I) )
            i1 = I(i)+1;
        end
    end

    fprintf('\nThe figure has been drawn.\n');
end
