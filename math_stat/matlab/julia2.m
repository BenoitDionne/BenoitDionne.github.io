% function julia2(c, N, colour)
%
% Draw the Julia set of p_c(z) = z^2 + c.
%
% c : Any complex number.  The default value is 0.3.
% N : The number of iterations.  The default value is 4000.
% colour : One of the colours accepted in Matlab plot/fill.
%          The default colour is blue.
%

function julia2(c, N, colour)
    if ( nargin < 3 )
        colour = 'blue';
        if ( nargin < 2 )
            N = 4000;
            if ( nargin < 1 )
                c = 0.3;
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
    fprintf('%f + %f i is a repelling fixed point if c ~= 1/4.\n',real(w),imag(w));
    fprintf('We use %f + %f i as starting point.\n',real(w),imag(w));

    % Compute the bachward iterations and draw the Julia set.
    x = real(w-c);
    y = imag(w-c);
    f = figure;
    for n = 1:N
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
        % We randomly select one of the two preimages.
        if ( rand(1) < 0.5 )
            x = u;
            y = v;
        else
            x = -u;
            y = -v;
        end

        % We draw the point.
        plot(x,y,'.','LineWidth',0.1,'Color',colour);
        
        % Go on with the next iteration (if there is one).
        x = x - real(c);
        y = y - imag(c);        
        hold on
    end
    axis equal;
    grid on
    title(['p(z) = z^2 + ',num2str(real(c)),' + ',num2str(imag(c)),'i']);
    hold off
    display('The drawing is completed.');
end
