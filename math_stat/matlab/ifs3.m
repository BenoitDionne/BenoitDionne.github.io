% function ifs3(X, N, syst, systXY, M, colour)
%
% Compute the iterations of the function defined by a network
% of IFS starting with a given closed polygonal curves.  We
% assume that the mapping induced by the network of IFS
% is from E times E times ... times E (k times) to itself.
% We also assume that the coordinates are (x1,x2,x3,...,xk).
%
% X      : A cell array of k initial sets, (2 x n) matrices storing the
%          corners of the polygonal curves.  
% N      : The number of iterations.
% syst   : A cell array of k cell arrays of function handles for the
%          functions in the k IFS.
% SetXY  : A cell array of k cell arrays of k lists of indices for the
%          function handles of the functions in the k IFS.
%          1) The first cell array contains a number of lists of indices
%          where the first list of indices is the list of indices of
%          the function handles for the functions of the first IFS
%          that maps x1 to x1, the second list of indices is the list
%          of indices of the function handles for the functions of
%          the first IFS that maps x2 to x1, the third list of indices
%          is the list of indices of the function handles for the
%          functions of the first IFS that maps x3 to x1, and so on. 
%          2) The second cell array contains a number of lists of indices
%          where the first list of indices is the list of indices of
%          the function handles for the functions of the second IFS
%          that maps x1 to x2, the second list of indices is the list
%          of indices of the function handles for the functions of
%          the second IFS that maps x2 to x2, the third list of indices
%          is the list of indices of the function handles for the
%          functions of the second IFS that maps x3 to x2, and so on. 
%          3) And so on.
% M      : The number of points per unit length.  The default value is
%          400 points.
% colour : One of the colours accepted in Matlab plot.
%          The default colour is blue.
%
function ifs3(X, N, syst, systXY, M, colour)
    if ( nargin < 6 )
        colour = 'blue';
        if ( nargin < 5 )
            M = 400;
            if ( nargin < 4 )
                disp("Not enough arguments.  Use the help command with ifs.")
                return;
            end
        end
    end

    dim = length(X);
    if ( dim ~= length(syst) || dim~= length(systXY) )
        disp("The dimensions of the arguments X, syst and systXY do not match.")
        disp("Use the help command with ifs3.")
        return;
    end
    
    for i = 1:dim
        systxy = systXY{i};
        if ( dim ~= length(systxy) )
            disp("The number of lists in each cell arrays in systXY is not")
            disp("equal to the dimension of X, syst and sysXY.")
            disp("Use the help command with ifs3.")
            return;
        end
    end

    RC = {};
    % We rescale the initial polygonal curves.
    for k =1:dim
        ro = [];
        co = [];
        x = X{k};
        x1 = round(M*x(:,1));
        for i = 2:size(x,2)
            x2 = round(M*x(:,i));
            R = max(abs(x1(1,1)-x2(1,1)),abs(x1(2,1)-x2(2,1)))+1;
            ro = [ro,round(linspace(x1(1,1),x2(1,1),R))];
            co = [co,round(linspace(x1(2,1),x2(2,1),R))];
            x1 = x2;
        end
        RC{k} = unique([ro;co]','rows')';
    end

    % We compute the iterations of the IFS.
    for n = 1:N
        fprintf('%d ',n)
        for k = 1:dim
            systf = syst{k};
            systxy = systXY{k};
            rc = [];
            for j = 1:dim
                s1 = systxy{j};
                for i = 1:length(s1)
                    rc = [rc , systf{s1(i)}(RC{j},M)];
                end
            end
            rc = round(rc);
            RC{k} = unique(rc','rows')';
        end
    end

    for k = 1:dim
        figure
        cla;
        hold on;
        axis off;
        axis equal;
        rc = RC{k};
        
        % We rescale the resulting set to the initial coordinate system.
        ro = rc(1,:)/M;
        co = rc(2,:)/M;

        % We draw the resulting set.
        p = plot(ro,co,'.','LineWidth',0.1);
        set(p,'Color',colour);
    end

    fprintf('\nThe figures have been drawn.\n');
end
