% function mandelbrot1(options)
%
% List of options:
% 'Region' is an array of the form [a b c d].  The Mandelbrot set
%          in the region [a,b] x [c,d] is displayed.  The default
%          region is [-2,2]x[-2,2].
% 'Density' is a positive integer.  This is the number of points per unit.
%           The default value is 100.
% 'NbrItr' is a positive integer number.  This is the number of
%          iterations used to determine if the orbit
%          { P_c^n(0)}_{n>0} is unbounded.  Namely, it is unbounded
%          if |P_c^n(0)| > 2 for some n < NbrItr + 1.  The default value
%          is 200.  This is also the number of iterations used to
%          determine if the orbit converges to a period orbit.
% 'Periods' is a array of periods.  The hyperbolic sets associated to
%           attractive periodic orbits with these periods are highlighted.
%           WARNING: The method used to identify the periodic orbits may
%           produce wrong results.  Use at your own risk.  By default, no
%           period is given.  Moreover, if you ask for hyperbolic
%           sets associated to periodic orbits of period p without
%           asking for hyperbolic sets associated to periodic orbits
%           of period q where q is a divisor of p, then the hyperbolic
%           sets associated to periodic orbits of period q will be
%           highlighted as hyperbolic sets associated to periodic
%           orbits of period p as it may be expected.
% 'Tol" is a real number.  This is the accuracy used to determine 
%       if an orbit has converged to an attracting periodic orbit.
%       The default value is 10^(-7).   
% 'Colour' is the colour to draw the Mandelbrot set.  Only colours
%          allowed by Matlab can be used. The default colour is black.
% 'ColPer' is a cell array of the form  {'col1' ,'col2', ... } where
%          col1, col2, ... are colours allowed by Matlab.  These
%          colours are used to draw the hyperbolic sets.  If there
%          are more periods than colours, the colours are reused.
%          The default is to use different intensities of the colour
%          for the Mandelbrot set.
%
function mandelbrot1(varargin)
    % Default values:
    region = [-2 2 -2 2];
    density = 100;
    nbrItr = 200;
    periods = [];
    tol = 10^(-7);
    colour = 'black';
    colPer = {};

    while ( ~isempty(varargin) )
        switch lower(varargin{1})
          case 'region'
             region = varargin{2};
          case 'density' 
            density = varargin{2};
          case 'nbritr'
             nbrItr = varargin{2};
          case 'periods'
            periods = varargin{2};
          case 'tol'
            tol = varargin{2};
          case 'colour'
            colour = varargin{2};
          case 'colper'
            colPer = varargin{2};
          otherwise
            disp("Unknown option: "+varargin{1});
        end
        varargin = varargin(3:length(varargin));
    end

    figure;

    % We assume that an orbit converges to a periodic orbit of
    % period  p  when 3 consecutive values of
    % {P_c^{pn}(0)}_{n>=0} are equal up to the toleranece given by tol.
    lAB = 0;
    if ( length(periods) > 0 )
        AB = sort(periods);
        lAB = length(AB);
        nAB = 2*AB(lAB)+1;

        pColours = {};
        rgbColour = validatecolor(colour);
        nColPer = size(colPer,2);
        if ( nColPer > 0 )
            for j = 1:lAB
                pColours{j} = colPer{rem((j-1),nColPer)+1};
            end
        else
            if ( sum(rgbColour) == 0 )
                % The black color needs to be treated as the white color
                % in "reverse order".
                for j = 1:lAB
                    pColours{j} = ['[',num2str((lAB-j+2)/(lAB+3)*[1 1 1]),']'];
                end
            else
                for j = 1:lAB
                    pColours{j} = ['[',num2str((lAB-j+2)/(lAB+3)*rgbColour),']'];
                end
            end
        end
    end
    
    Dx = floor((region(2)-region(1))*density);
    Dy = floor((region(4)-region(3))*density);
    x = linspace(region(1),region(2),Dx);
    y = linspace(region(3),region(4),Dy);

    for n = 1:length(x)
        for m = 1:length(y)
            c = x(n) + i*y(m);
            z1 = 0;
            flag = 0;
            if ( lAB > 0 )
                Pz = [z1];
            end
	    for k = 1:nbrItr
                z2 = z1^2 + c;
		if ( abs(z2) > 2 )
                    flag = -1;
		    break;
                end
                if ( lAB > 0 )
                    if ( length(Pz) < nAB )
                        Pz = [Pz z2];
                    else
                        for j=1:lAB
                            for s=1:3;
                                vPz(s) = Pz(nAB - (s-1)*AB(j));
                            end
                            if ( abs(vPz(1)-vPz(2)) < tol && ...
                                 abs(vPz(2)-vPz(3)) < tol && ...
                                 abs(vPz(1)-vPz(3)) < tol )
                                flag = AB(j);
                                break;
                            end
                        end
                        Pz = [Pz(2:nAB) z2];
                    end
                end
                z1 = z2;
            end
            if ( flag == 0 )
                plot(x(n),y(m),'.','color',colour,'LineWidth',0.1);
                hold on;
            end
            for j = 1:lAB
                if ( flag == AB(j) )
                    plot(x(n),y(m),'.','Color',pColours{j},'LineWidth',0.1);
                    hold on;
                end
            end
        end
    end

    % The Legend.
    skip = 0;
    for j = 1:lAB
        txt = text(region(1),region(4)-(j-1)*skip, ...
                   ['Period ',num2str(AB(j))],'Color',pColours{j}, ...
                   'VerticalAlignment','top','BackgroundColor','white');
        if ( j == 1 )
            skip = min(txt.Extent(4),(region(4)-region(3))/lAB);
        end
    end

    axis(region);
    axis equal;
    grid on;
    hold off;
    display('The drawing is completed.');
end
