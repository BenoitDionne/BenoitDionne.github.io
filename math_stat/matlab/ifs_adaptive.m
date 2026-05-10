% function ifs_adaptive(X, delta, syst, matr, diam, colour)
%
% Draw the fixed point K of the function defined by an IFS using the
% adaptive cut method.
%
% X      : A point on K, a (2 x 1) matrix in Matlab.
% delta  : The Hausdorff distance between the set A drawn and the set K.
% syst   : A cell array of function handles for the functions in the IFS.
% matr   : A cell array of (2 x 2) matrices where matr{j} is the matrix
%          in the definition of syst{j}.  We assume that the functions
%          in the IFS are of the form f(x) = Mx + b.
% diam   : The estimated diameter of the fixed point K.  The default value
%          is 1.
% colour : One of the colours accepted in Matlab plot.
%          The default colour is blue.
%
function ifs_adaptive(X, delta, syst, matr, diam, colour)
    if ( nargin < 6 )
        colour = 'blue';
        if ( nargin < 5 )
            diam = 1;
            if ( nargin < 4 )
                disp("Not enough arguments.")
                disp("Use the help command with ifs_adaptive.")
                return;
            end
        end
    end

    J = length(syst);
    if ( J ~= length(matr) )
        disp("syst and matr do not have the same dimension.")
        disp("Use the help command with ifs.")
        return;
    end

    cla;
    hold on;
    axis off;
    axis equal;

    A = [1 0 ; 0 1];
    V = [];
    nested(syst,matr,A,V,J,delta,X,gca,diam,colour);

    fprintf('\nThe figure has been drawn.\n');
end

function nested(syst,matr,A,V,J,delta,X,axe,diam,colour)
    for j=1:J
        AA = A*matr{j};
        VV = [V,j];
        C = 2*max(max(abs(AA)))*diam;
        if ( C < delta )
            Y = X;
            for k = length(VV):-1:1
                Y = syst{VV(k)}(Y);
            end
            plot(axe,Y(1),Y(2),'.','LineWidth',0.1,'Color',colour);
        else
            nested(syst,matr,AA,VV,J,delta,X,axe,diam,colour);
        end
    end
end
