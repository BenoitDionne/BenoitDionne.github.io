% function ifs2(X, N, syst, M, colour)
%
% Compute the iterations of the function defined by an IFS starting
% with a given closed polygonal curve.
%
% X      : Initial set, a (2 x n) matrix storing the corners of the
%          polygonal curve.
% N      : The number of iterations.
% syst   : A cell array of function handles for the functions in the IFS.
% M      : The number of points per unit length.  The default value is
%          400 points.
% colour : One of the colours accepted in Matlab plot.
%          The default colour is blue.
%
function ifs2(X, N, syst, M, colour)
    if ( nargin < 5 )
        colour = 'blue';
        if ( nargin < 4 )
            M = 400;
            if ( nargin < 3 )
                disp("Not enough arguments.  Use the help command with ifs.")
                return;
            end
        end
    end

    % We rescale the initial polygonal curve to get the set T.
    ro = [];
    co = [];
    X1 = round(M*X(:,1));
    for i = 2:size(X,2)
        X2 = round(M*X(:,i));
        R = max(abs(X1(1,1)-X2(1,1)),abs(X1(2,1)-X2(2,1)))+1;
        ro = [ro,round(linspace(X1(1,1),X2(1,1),R))];
        co = [co,round(linspace(X1(2,1),X2(2,1),R))];
        X1 = X2;
    end
    rc = unique([ro;co]','rows')';

    % We compute the iterations of the IFS starting at T.
    for i = 1:N
        fprintf('%d ',i)
        RC = [];
        for j=1:length(syst)
            RC = [RC , syst{j}(rc,M)];
        end
        rc = round(RC);
        rc = unique(rc','rows')';
    end

    cla;
    hold on;
    axis off;
    axis equal;

    % We rescale the resulting set to the initial coordinate system.
    ro = rc(1,:)/M;
    co = rc(2,:)/M;

    % We draw the resulting set.
    p = plot(ro,co,'.','LineWidth',0.1);
    set(p,'Color',colour);

    fprintf('\nThe figure has been drawn.\n');
end
