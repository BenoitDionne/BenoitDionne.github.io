% function mandelbrot3(options)
%
% Let N_c(z) = z - Q_c(z)/Q_c'(z) where Q_c(z) = (z-1)(z-c+1/2)(z+c+1/2).
% Namely,  N_c(z) = (-8 z^3 + 4 c^2 -1)/(-12 z^2 + 4 c^2 + 3)
%
% To colour the points c such that { N_c^n(0) }_{n>0} converges
% toward one of the fixed points of N_c; namely,
% one of r_1 = 1, r_2 = -c-1/2 or r_3 = c-1/2.
%
% List of options:
% 'Region' is an array of the form [a b c d].  The Mandelbrot set
%          in the region [a,b] x [c,d] is displayed.  The default
%          region is [-2,2]x[-2,2].
% 'Density' is a positive integer.  This the number of points per unit.
%           The default value is 100.
% 'NbrItr' is a positive integer number.  This is the number of
%          iterations used to determine if the orbit
%          {N_c^n(0)}_{n>0} converges to one of the fixed points
%          of N_c.  The default value is 100.
% 'Tol" is a real number.  This is the accuracy used to determine 
%       if an orbit has converged to a fixed point of M_c.
%       The default value is 10^(-3).
% 'Colour' is the colour to draw the points c such that
%          the orbit { N_c^n(0)}_{n>0} does not converge to one of
%          the fixed points of N_c. The default colour is black.
% 'ColPts' is a cell array of the form  {'col1' ,'col2', ... } where
%          col1, col2, ... are colours allowed by Matlab.  These
%          colours are used to colour the points c such that
%          the orbit { N_c^n(0)}_{n>0} converges to one of
%          the fixed points of N_c.  If there are 2 colours,
%          the colours are reused.  If there are more than 3
%          colours, only the first three colours are used.
%          If there is only one colour, different intensities of this
%          colour are used.  The default is to use the colour
%          for the Mandelbrot set.
%
function mandelbrot3(varargin)
    % Default values:
    region = [-2 2 -2 2];
    density = 100;
    nbrItr = 100;
    tol = 10^(-3);
    colour = 'black';
    colPts = {};

    while ( ~isempty(varargin) )
        switch lower(varargin{1})
          case 'region'
             region = varargin{2};
          case 'density' 
            density = varargin{2};
          case 'nbritr'
             nbrItr = varargin{2};
          case 'tol'
            tol = varargin{2};
          case 'colour'
            colour = varargin{2};
          case 'colpts'
            colPts = varargin{2};
          otherwise
            disp("Unknown option: "+varargin{1});
        end
        varargin = varargin(3:length(varargin));
    end

    figure;

    % We assume that an orbit converges the fixed point r_i
    % when 2 consecutive values of {R_c^{n}(0)}_{n>=0} are equal 
    % to r_i up to the toleranece of tol.

    pColours = {};
    rgbColour = validatecolor(colour);
    nColPer = size(colPts,2);
    if ( nColPer > 1 )
        for j = 1:3
            pColours{j} = colPts{rem((j-1),nColPer)+1};
        end
    else
        if ( nColPer == 1 )
            rgbColour = str2num(colPts{1},Evaluation="restricted");
            if ( length(rgbColour) == 0 )
                rgbColour = validatecolor(colPts{1});
            end
        end
        if ( sum(rgbColour) == 0 )
            % The black color needs to be treated as the white color
            % in "reverse order".
            for j = 1:3
                pColours{j} = ['[',num2str((5-j)/6*[1 1 1]),']'];
            end
        else
            for j = 1:3
                pColours{j} = ['[',num2str((5-j)/6*rgbColour),']'];
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
            r = [1,-c-1/2,c-1/2];
            z1 = 0;
            flag = 0;
	    for k = 1:nbrItr
                z2 = (-8*z1^3 + 4*c^2 -1)/(-12*z1^2 + 4*c^2 + 3);
                for j=1:3
                    if ( abs(z1-r(j)) < tol && abs(z2-r(j)) < tol )
                        flag = j;
                        break;
                    end
                end
                if ( flag > 0 )
                    break
                end
                z1 = z2;
            end
            if ( flag > 0 )
                plot(x(n),y(m),'.','color',pColours{flag},'LineWidth',0.1);
                hold on;
            else
                plot(x(n),y(m),'.','color',colour,'LineWidth',0.1);
                hold on;
            end
        end
    end

    % The Legend.
    skip = 0;
    for j = 1:3
        txt = text(region(1),region(4)-(j-1)*skip, ...
                   ['fixed point r_',num2str(j)],'Color',pColours{j}, ...
                   'VerticalAlignment','top','BackgroundColor', 'white');
        if ( j == 1 )
            skip = min(txt.Extent(4),(region(4)-region(3))/3);
        end
    end

    axis(region);
    axis equal;
    %    grid on;
    hold off;
    display('The drawing is completed.');
end
