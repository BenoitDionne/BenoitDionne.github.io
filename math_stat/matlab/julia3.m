% function julia3(R, FxPts, options)
%
% Draw the basin of attraction of the given attracting fixed points of
% the rational function R.  The boundary of these basins of attraction
% is the Julia set of the rational function R.
%
% R is the name of a function between apostrophes or the handle of
% a function.
% FxPts is an array of the form [p(1) p(2) ... p(n)] where the p(i)
% are fixed points.  One of the p(i) can be the infinity denoted Inf.
% If the only fixed point given is Inf, the program follows the
% tradition when drawing filled Julia sets.  It colours only the
% points associated to bounded orbits with the given colour or the
% default colour if no colour is given.
%
% List of options:
% 'Region' is an array of the form [a b c d].  The portion of the
%          Julia set inside the region [a,b] x [c,d] is displayed.
%          The default region is [-2,2]x[-2,2].
% 'NbrItr' is the number of iterations to determine if a point
%          belongs to the basin of attraction of a fixed point.
%          The default value is 50.
% 'Density' is a positive integer.  This the number of points per
%           unit used to plot the basins of attraction.  The default
%           value is 200.
% 'Tols' is an array that may have 1 element or the same number of
%        elements as FxPts.  A point z belongs to the basin of
%        attraction of the fixed point p(i) if
%        |R^n(z) - FxPts(i)| < Tols(i) for
%        two consecutive values of n <= NbrItr.  If there is only
%        one element in Tols, then this tolerance is used for all the
%        fixed points.   The default value is  10^(-5).
%        If FxPts(i) = Inf for some i, then Tols must be of the same
%        size as FxPts.  A point is declared to belong to the basin
%        of attraction of Inf if |R^n(z)| > Tols(i) for some n <= NbrItr.
% 'Colours' is a cell array of the form  {'col1' ,'col2', ... } where
%           col1, col2, ... are colours allowed by Matlab.  This cell
%           array may have 1 element or the same number of elements 
%           as FxPts.  If only one colour is given, then different
%           intensity of this colour are used to colour the
%           basins of attraction.  The default colour is black.
% 'BckCol' is the background colour of the figure.  Only colours allowed
%          by Matlab are accepted.  The default colour is white.
%
function julia3(R, FxPts, varargin)
    if ( ~isa(R, 'function_handle') && ~exist(R,'file') == 2 )
        disp('A function must be given.')
        disp('Use the help command for more information.');
        return;
    end
    if ( length(FxPts) == 0 )
        disp('At least one fixed point must be given.')
        disp('Use the help command for more information.');
        return;
    end

    % Default values:
    region = [-2 2 -2 2];
    nbrItr = 50;
    density = 200;
    tols = [10^(-5)];
    colours = {'black'};
    bckCol = 'white';

    while ( ~isempty(varargin) )
        switch lower(varargin{1})
          case 'region'
             region = varargin{2};
          case 'nbritr'
             nbrItr = varargin{2};
          case 'density' 
            density = varargin{2};
          case 'tols'
            tols = varargin{2};
          case 'colours'
            colours = varargin{2};
          case 'bckcol'
            bckCol = varargin{2};
          otherwise
            disp("Unknown option: "+varargin{1});
        end
        varargin = varargin(3:length(varargin));
    end

    nFxPts = length(FxPts);
    pTols = [];
    nTols = length(tols);
    % Reset tols to its default if necessary.
    if ( nTols == 0 )
        tols = [10^(-5)];
        nTols = 1;
        disp('The default tolerance is used.')
    end
    if ( nTols == nFxPts )
        pTols = tols;
    else
        if ( nTols > 1 && nTols < nFxPts )
            disp('Not enough tolerances have been given, we use')
            disp('only the first given tolerance.')
            disp('Use the help command for more information.');
        end
        pTols = ones(1,nFxPts)*tols(1);
    end

    pColours = {};
    nColours = size(colours,2);
    % Reset Colours to its default if necessary.
    if ( nColours == 0 )
        colours = { 'black' };
        nColours = 1;
        disp('The default colour is used.')
    end
    if ( nColours == nFxPts )
        pColours = colours;
    else
        if ( nColours > 1 && nColours < nFxPts )
            disp('Not enough colours have been given, we use')
            disp('only the first given colour.')
            disp('Use the help command for more information.');
        end
        rgbColor = validatecolor(colours{1});
        if ( sum(rgbColor) == 0 )
            % The black colour needs to be treated as the white colour
            % in "reverse order".
            for j = 1:nFxPts
                pColours{j} = ...
                    ['[',num2str((nFxPts-j+2)/(nFxPts+3)*ones(1,3)),']'];
            end
        else
            for j = 1:nFxPts
                pColours{j} = ...
                    ['[',num2str((nFxPts-j+2)/(nFxPts+3)*rgbColor),']'];
            end
        end
    end

    mx = round((region(2)-region(1))*density);
    my = round((region(4)-region(3))*density);
    x = linspace(region(1),region(2),mx);
    y = linspace(region(3),region(4),my);

    figure;
    for k1 = 1:length(x)
        for k2 = 1:length(y)
            flag = 0;
            w1 = x(k1) + i*y(k2);
            if ( nFxPts == 1 && FxPts(1) == Inf )
                for k = 1:nbrItr
                    w2 = feval(R,w1);
                    if ( abs(w2) > pTols(1) )
                        flag = 1;
                        break;
                    end
                    w1 = w2;
                end
                if ( flag == 0 )
                    plot(x(k1),y(k2),'.','color',pColours{1},'LineWidth',0.1);
                    hold on;
                end
            else
                for k3 = 1:nbrItr
                    w2 = feval(R,w1);
                    for k4 = 1:nFxPts
                        if ( FxPts(k4) == Inf )
                            if ( abs(w1) > pTols(k4) && abs(w2) > pTols(k4) )
                                plot(x(k1),y(k2),'.','LineWidth',0.1, ...
                                     'Color',pColours{k4});
                                hold on
                                flag = 1;
                                break;
                            end
                        else
                            if ( abs(w1-FxPts(k4)) < pTols(k4) && ...
                                 abs(w2-FxPts(k4)) < pTols(k4) )
                                plot(x(k1),y(k2),'.','LineWidth',0.1, ...
                                     'Color',pColours{k4});
                                hold on
                                flag = 1;
                                break;
                            end
                        end
                    end
                    if ( flag == 1 )
                        break;
                    end
                    w1 = w2;
                end
            end
        end
    end
    axis(region);
    axis equal;
    grid on
    set(gca,'Color',bckCol);

    if ( isa(R,'function_handle') )
        if ( exist(func2str(R), 'file') ~= 2 && ...
             exist(func2str(R), 'builtin') ~= 5 )
            title(['R(z) = ',func2str(R)]);
        else
            title(['R(z) = ',func2str(R),'(z)']);
        end
    else
        title(['R(z) = ',R,'(z)']);
    end

    hold off
    display('The drawing is completed.');
end
