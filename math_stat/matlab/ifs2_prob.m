% function ifs_prob(X, N, syst, P, M, colour)
%
% Use the chaos game to compute the iterations of the function
% defined by an IFS starting with a given point.
%
% X      : The initial point
% N      : The number of iterations.
% syst   : A cell array of function handles for the functions in the IFS.
% P      : The probablities to define the IFS with probabilities.
%          P(j) (in [0,1]) is the probability of selecting the function
%          syst{j} of the IFS.  syst and P must be of the same length.
% M      : The number of points per unit length.  The default value is
%          600 points.
% colour : One of the colours accepted in Matlab plot/fill.
%          The default colour is blue.
function ifs2_prob(X, N, syst, P, M, colour)
    if ( nargin < 6 )
        colour = 'blue';
        if ( nargin < 5 )
            M = 600;
            if ( nargin < 4 )
                disp("Not enough arguments.  Use the help command with ifs_prob.")
                return;
            end
        end
    end

    if ( length(syst) ~= length(P) )
        disp("Length of P must equal length of syst,  Use the help command with ifs_prob.")
        return;
    end

    cla;
    hold on;
    axis off;
    axis equal;

    Q = [0];
    for j=1:length(P);
        Q = [Q,P(j)+Q(j)];
    end

    X = round(M*X);
    for i=0:N
        p = rand(1);
        for j=1:length(syst)
            if ( Q(j) <= p && p <= Q(j+1) )
                X = syst{j}(X,M);
                plot(X(1)/M,X(2)/M,'.','LineWidth',0.1,'Color',colour);
            end
        end
    end

    fprintf('\nThe figure has been drawn.\n');
end
