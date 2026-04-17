% function julia4(c,options)
%
% This function draw the (filled) Julia set of P_c(z) = z^2 + c with some
% level curves Gamma_c(exp(2^(3-j))) if requested.  The value of c
% must be a value such that P_c has a connected Julia set.
%
% c is a complex number.
%
% List of options:
% 'Region' is an array of the form [a b c d].  The portion of the
%          Julia set in the region [a,b] x [c,d] is displayed.
%          The default region is [-2,2]x[-2,2].
% 'Density' is a positive integer.  This is the number of points per
%           unit used to plot the filled Julia set.  Double this
%           value is used to draw the level curves.  The default
%           value is 200.
% 'NbrItr' is a positive integer number.  When plotting the filled Julia
%          set, this is the number of iterations used to determine
%          if the orbit { P_c^n(z)}_{n>0} is unbounded.
%          Namely, it is unbounded if |P_c^n(z)| > max{2,|c|} for some
%          n < NbrItr + 1.  The default value is 100.
% 'Levels' is a array of integer numbers (preferably greater than 3).
%          The level curves Gamma_c(exp(2^(3-levels(j)))) for
%          j=1,2,...,length(levels) are drawn in addition of the
%          Julia set.  The function looks for level curves
%          that go through the segment [0, max{2,abs(c),region(2)}].
%          The default is Levels = [4].
% 'Colour' is the colour to draw the Julia set.  Only colours
%          allowed by Matlab can be used. The default colour is black.
% 'ColLev' is a cell array of the form  {'col1' ,'col2', ... } where
%          col1, col2, ... are colours allowed by Matlab.  These
%          colours are used to draw the level curves
%          Gamma_c(exp(2^(3-levels(j)))).  If there are more level
%          curves than colours, the colours are reused.  If only one
%          colour is given, then all the level curves are coloured
%          using this colour.  The default is to use different
%          intensities of the colour for the Julia set.
% 'MaxPts' is the maximum number of points that a level curve may
%          have.  The default value is 40,000.  It should be
%          more than sufficient for all reasonable choices of
%          Density.
% 'Filled' is true or false.  If set to true, the filled julia set
%          drawn.  If set to false, only the julia set is drawn.
%          The default value is true.
% 'BackItr' is the number of backward iterations used to draw the Julia
%           set if it is required.  The default value is 17.
%
function julia4(c,varargin)
    if ( ~isnumeric(c) )
        disp('The value of c must be given.')
        disp('Use the help command for more information.');
        return;
    end

    % Default values:
    region = [-2 2 -2 2];
    density = 200;
    nbrItr = 100;
    levels = [4];
    colour = 'black';
    colLev = {};
    maxPts = 40000;
    filled = true;
    backItr = 17;
    
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
          case 'filled'
            filled = varargin{2};
          case 'backitr'
            backItr = varargin{2};
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
    
    % This is the escape condition for the Julia set.
    Mjulia = max(2,abs(c));

    % The step size for the real coordinates.
    step = 1/density;
    
    % We use a grid of integer coordinates to keep track of
    % the points on a level curve.  Since the grid use integer
    % coordinates, the tests for equality are also possible.
    xmax = floor(max(Mjulia,region(2))*density);

    figure;
    for k1 = 1:lLevels
        % We search the intersection of the level curve with the
        % positive section of the x axis.
        xz = 0;
        for k2 = 1:xmax
            z = k2*step;
            if ( outside(c,z,levels(k1),M) )
                xz = k2;
                break
            end
        end

        % If the level curve does not intersect the interval
        % [0,region(2)] on the x-axis, we ignore this level curve.
        if ( xz == 0 )
            disp(['The level curve with j = ',num2str(levels(k1)),...
                  ' cannot be drawn because it does not go through the',
                  ' segment [0,',num2str(xmax),'].']);
            disp('Please, choose larger values of j.');
            continue;
        end

        cin = 1;
        cout = 2;
        cnew = 3;
        x(cin) = xz-1;
        y(cin) = 0;
        x(cout) = xz;
        y(cout) = 0;
        x(cnew) = xz;
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
            if ( outside(c,step*x(cnew)+i*step*y(cnew),levels(k1),M) )
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

        % Only draw the segments of the level curve inside the given region.
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

    % We now plot the filled Julia set.
    if ( filled )
        juliaF(c,region,density,nbrItr,colour,Mjulia);
    else
        juliaJ(c,backItr,colour);
    end

    % The Legend.
    if ( nColLev ~= 1 )
        skip = 0;
        for j = 1:lLevels
            txt = text(region(1),region(4)-(j-1)*skip, ...
                       ['k = ',num2str(levels(j))],'Color',pColours{j}, ...
                       'VerticalAlignment','top','BackgroundColor', 'white');
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

% To determine if there exits 1 <= n <= N such that |P_c^n(z)| >= M .
function v = outside(c,z,N,M)
    v = false;
    z1 = z;
    for n = 1:N
        z2 = z1^2 + c;
        if ( abs(z2) > M )
            v = true;
            break;
        end
        z1 = z2;
    end
end

% To draw the filled Julia set.
function juliaF(c,region,density,nbrItr,colour,Mjulia)
    Dx = floor((region(2)-region(1))*density);
    Dy = floor((region(4)-region(3))*density);
    x = linspace(region(1),region(2),Dx);
    y = linspace(region(3),region(4),Dy);

    for n = 1:length(x)
        for m = 1:length(y)
            z1 = x(n) + i*y(m);
            flag = 0;
	    for k = 1:nbrItr
                z2 = z1^2 + c;
		if ( abs(z2) > Mjulia )
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

function juliaJ(c, N, colour)
    % Compute the repelling fixed point  (1 + sqrt(1 - 4c))/2 , where
    % sqrt(1 - 4c) is the square root of 1 - 4c with a non negative
    % real part.
    x = real(1-4*c);
    y = imag(1-4*c);
    q = sqrt(x^2+y^2);
    if ( x == 0 && y == 0 )
        u = 0;
        v = 0;
    elseif ( x > 0 )
        u = sqrt(2*(x+q))/2;
        v = y/(2*u);
    else
        v = sqrt(2*(-x+q))/2;
        u = y/(2*v);
    end;
    w = (1 + (u+i*v))/2;
    fprintf('%f + %f i is a repelling fixed point if c~= 1/4.\n',real(w),imag(w));
    fprintf('We use %f + %f i as starting point.\n',real(w),imag(w));

    % Compute the bachward iterations and draw the Julia set.
    x = real(w-c);
    y = imag(w-c);

    for n = 1:N
        q = sqrt(x.^2+y.^2);
        for j = 1:length(x)
            if ( x(j) == 0 && y(j) == 0 )
                u(j) = 0;
                v(j) = 0;
            elseif ( x(j) > 0 )
                u(j) = sqrt(2*(x(j)+q(j)))/2;
                v(j) = y(j)/(2*u(j));
            else
                v(j) = sqrt(2*(-x(j)+q(j)))/2;
                u(j) = y(j)/(2*v(j));
            end;
        end
        x = [ u , -u ];
        y = [ v , -v ];

        % We draw the points.
        plot(x,y,'.','LineWidth',0.1,'Color',colour);

        % Go on with the next iteration (if there is one).
        x = [ u , -u ] - real(c);
        y = [ v , -v ] - imag(c);        
        hold on
    end
end
