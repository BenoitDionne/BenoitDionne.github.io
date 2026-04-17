% function mandelbrot2(options)
%
% List of options:
% 'Region' is an array of the form [a b c d].  The Mandelbrot set
%          in the region [a,b] x [c,d] is displayed.  The default
%          region is [-3,3]x[-2,2].
% 'Density' is a positive integer.   This the number of points per
%           unit used to plot the Mandelbrot set.  Double this
%           value is used to draw the level curves.  The default
%           value is 200.
% 'NbrItr' is a positive integer number.  When plotting the
%          Mandelbrot set, this is the number of iterations used
%          to determine if the orbit { P_c^n(0)}_{n>0} is
%          unbounded.  Namely, it is unbounded if |P_c^n(0)| > 2
%          for some n < NbrItr + 1.  The default value is 100.
% 'Levels' is an array of integer numbers (preferably greater than 3).
%          The level curves Gamma_c(exp(2^(3-levels(j)))) for
%          j=1,2,...,length(levels) are drawn in addition of the
%          Mandelbrot set.  The function looks for level curves
%          that go through the segment [0, max(2,region(2))].
%          The default is Levels = [4].
% 'Colour' is the colour to draw the Mandelbrot set.  Only colours
%          allowed by Matlab can be used. The default colour is black.
% 'ColLev' is a cell array of the form  {'col1' ,'col2', ... } where
%          col1, col2, ... are colours allowed by Matlab.  These
%          colours are used to draw the level curves
%          Gamma_c(exp(2^(3-levels(j)))).  If there are more level
%          curves than colours, the colours are reused.  If only one
%          colour is given, then all the level curves are drawn using this
%          colour.  The default is to use different intensities of the
%          colour for the Julia set.
% 'MaxPts' is the maximum number of points that a level curve may
%          have.  The default value is 40,000.  It should be
%          more than sufficient for all reasonable choices of
%          Density.
%
function mandelbrot2(varargin)
    % Default values:
    region = [-3 3 -2 2];
    density = 200;
    nbrItr = 100;
    levels = [4];
    colour = 'black';
    colLev = {};
    maxPts = 40000;

    while ( ~isempty(varargin) )
        switch lower(varargin{1})
          case 'region'
             region = varargin{2};
          case 'density' 
            density = varargin{2};
          case 'nbritr'
             nbrItr = varargin{2};
          case 'levels'
            levels = varargin{2};
          case 'colour'
            colour = varargin{2};
          case 'collev'
            colLev = varargin{2};
          case 'maxpts'
            maxPts = varargin{2};
          otherwise
            disp("Unknown option: "+varargin{1});
        end
        varargin = varargin(3:length(varargin));
    end

    lLevels = length(levels);
    pColours = {};
    rgbColour = validatecolor(colour);
    nColLev = size(colLev,2);
    if ( nColLev > 0 )
        for j = 1:lLevels;
            pColours{j} = colLev{rem((j-1),nColLev)+1};
        end
    else
        if ( sum(rgbColour) == 0 )
            % The black colour needs to be treated as the white colour
            % in "reverse order".
            for j = 1:lLevels
                pColours{j} = ...
                    ['[',num2str((lLevels-j+2)/(lLevels+3)*[1 1 1]),']'];
            end
        else
            for j = 1:lLevels
                pColours{j} = ...
                    ['[',num2str((lLevels-j+2)/(lLevels+3)*rgbColour),']'];
            end
        end
    end

    % We use the set B_{exp(8)}(0) suggested in the document
    % about the Mandelbrot set.
    M = exp(8);

    % The step size for the real coordinates.
    step = 1/density;

    % We use a grid of integer coordinates to keep track of
    % the points on a level curve.  Since the grid use integer
    % coordinates, the tests for equality are also possible.
    xmax = floor(max(2,region(2))*density);

    figure;
    for k1 = 1:lLevels
        % We search the intersection of the h'th level curve with the
        % positive section of the x axis.
        xc = 0;
        for k2 = 1:xmax
            c = k2*step;
            if ( outside(c,levels(k1),M) )
                xc = k2;
                break
            end
        end

        % If the level curve does not intersect the interval
        % [0,xmax] on the x-axis, we ignore this level curve.
        if ( xc == 0 )
            disp(['The level curve with j = ',num2str(levels(k1)),...
                  ' cannot be drawn because it does not go through the',
                  ' segment [0,',num2str(xmax),'].']);
            disp('Please, choose larger values of j.');
            continue;
        end

        cin = 1;
        cout = 2;
        cnew = 3;
        x(cin) = xc-1;
        y(cin) = 0;
        x(cout) = xc;
        y(cout) = 0;
        x(cnew) = xc;
        y(cnew) = -1;

        % Save these information to determine when the
        % level curve is closed.  Namely, when it reaches
        % again the positive section of the x-axis.
        xin = x(cin);
        yin = y(cin);
        xout = x(cout);
        yout = y(cout);

        % This is the first point on the curve 
        % Gamma_c(exp(2^(3-levels(k))))
        xpts = [xin];
        ypts = [yin];

        % We set a limit of 10,000 points per level curve.
        % A while ( 1 == 1 ) loop should also work but to avoid
        % any risk of infinite loop, we have set a upper bound.
        n = 0;
        for n = 1:maxPts
            % Look for the next point on the level curve.
            if ( outside(step*x(cnew)+i*step*y(cnew),levels(k1),M) )
                % We do not interchange the values put the indices.
                % This is more economic in terms of computer time.
                tmp = cout;
                cout = cnew;
            else
                % This is another point on the curve 
                % Gamma_c(exp(2^(3-levels(k))))
                xpts = [xpts x(cnew)];
                ypts = [ypts y(cnew)];

                % We do not interchange the values put the indices.
                % This is more economic in terms of computer time.
                tmp = cin;
                cin = cnew;
            end
            % test if we are back to the positive section of the
            % x-axis.
            if ( (x(cin) == xin && y(cin) == yin) && ...
                 (x(cout) == xout && y(cout) == yout) )
                break;
            end
            cnew = tmp;
            x(cnew) = x(cout) + x(cin) - x(tmp);
            y(cnew) = y(cout) + y(cin) - y(tmp);
        end
        if ( n == maxPts )
            disp('Cannot draw the entire level curve because of the limit');
            disp('on the number of admissible points per level curve.');
        end
        
        % Only draw the segments of the level curve inside given region.
        Rxpts = step*xpts;
        Rypts = step*ypts;
        G = real( (Rxpts >= region(1)) & (Rxpts <= region(2)) & ...
                  (Rypts >= region(3)) & (Rypts <= region(4)) );
        G(G==0) = NaN;
        Rxpts = G.*Rxpts;
        Rypts = G.*Rypts;
        disp(['Level curve with j = ',num2str(levels(k1)),' (',num2str(n),...
              ' points)']);
        plot(Rxpts,Rypts,'.','color',pColours{k1},'LineWidth',0.1);
        hold on;
    end

    % We now plot the Mandelbrot set.
    mandelbrotL(region,density,nbrItr,colour);

    % The Legend.
    if ( nColLev ~= 1 )
        skip = 0;
        for j = 1:lLevels
            txt = text(region(1),region(4)-(j-1)*skip, ...
                       ['j = ',num2str(levels(j))],'Color',pColours{j}, ...
                       'VerticalAlignment','top','BackgroundColor','white');
            if ( j == 1 )
                skip = min(txt.Extent(4),(region(4)-region(3))/lLevels);
            end
        end
    end

    axis equal;
    grid on;
    hold off;
    display('The drawing is completed.');
end

% To determine if there exits 1 <= n <= N such that |P_c^n(c)| >= M .
function v = outside(c,N,M)
    v = false;
    z1 = 0;
    for n = 1:N
        z2 = z1^2 + c;
        if ( abs(z2) > M )
            v = true;
            break;
        end
        z1 = z2;
    end
end

% To draw the Mandebrot set.
function mandelbrotL(region,density,nbrItr,colour)
    Dx = floor((region(2)-region(1))*density);
    Dy = floor((region(4)-region(3))*density);
    x = linspace(region(1),region(2),Dx);
    y = linspace(region(3),region(4),Dy);

    for n = 1:length(x)
        for m = 1:length(y)
            c = x(n) + i*y(m);
            z1 = 0;
            flag = 0;
	    for k = 1:nbrItr
                z2 = z1^2 + c;
		if ( abs(z2) > 2 )
                    flag = 1;
		    break;
                end
                z1 = z2;
            end
            if ( flag == 0 )
                plot(x(n),y(m),'.','color',colour,'LineWidth',0.1);
                hold on;
            end
        end
    end
end
