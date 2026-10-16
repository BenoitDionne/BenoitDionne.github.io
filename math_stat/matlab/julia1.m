% function julia5(c, N, colour, tol)
%
% Draw the Julia set of p_c(z) = z^2 + c.
%
% c : Any complex number.  The default value is i.
% N : The number of backward iterations.  The default value is 40.
% colour : One of the colours accepted by Matlab.
%          The default colour is blue.
% tol : If two points are at a distance less than tol from each other,
%       then only one of them is kept.  The default value is 0.01.
%       Often too small to get a good representation of the Julia set.

function julia1(c, N, colour, tol)
    if ( nargin < 4 ) 
        tol = 0.01;
        if ( nargin < 3 )
            colour = 'blue';
            if ( nargin < 2 )
                N = 40;
                if ( nargin < 1 )
                    c = i;
                end
            end
        end
    end

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

    figure;
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

        % Ignore points that are too closed to each other.
        indices = [];
        for j = 1:length(x)-1
            if ( sum(find(indices == j)) == 0 )
                for k = j+1:length(x)
                    if ( (x(j) - x(k))^2 + (y(j) - y(k))^2 < tol^2 )
                        indices = [indices,k];
                    end
                end
            end
        end
        x(indices) = [];
        y(indices) = [];
        hold on
    end
    axis equal;
    grid on
    title(['p(z) = z^2 + (',num2str(real(c)),' + ',num2str(imag(c)),'i)']);
    hold off
    display('The drawing is completed.');
    fprintf('%d points have been plotted.\n',length(x));
end
