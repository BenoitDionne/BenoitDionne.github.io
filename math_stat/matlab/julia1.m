% function julia1(c, N, colour)
%
% Draw the Julia set of p_c(z) = z^2 + c.
%
% c : Any complex number.  The default value is i.
% N : The number of backward iterations.  The default value is 17.
% colour : One of the colours accepted in Matlab plot/fill.
%          The default colour is blue.
%

function julia1(c, N, colour)
    if ( nargin < 3 )
        colour = 'blue';
        if ( nargin < 2 )
            N = 17;
            if ( nargin < 1 )
                c = i;
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
        hold on
    end
    axis equal;
    grid on
    title(['p(z) = z^2 + ',num2str(real(c)),' + ',num2str(imag(c)),'i']);
    hold off
    display('The drawing is completed.');
end
