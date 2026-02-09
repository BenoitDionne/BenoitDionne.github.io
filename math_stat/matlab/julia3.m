% function julia3(R, D, Q, N, M, rev, colour)
%
% Draw the Julia set of the rational function R.
%
% R : The name of a function between apostrophes or the handle of
%     a function.
% D = [a b c d] : Only the portion of the Julia set inside the 
%                 region [a,b] x [c,d] is displayed.
% Q : The name of a function between apostrophes or the handle of
%     a function.  This function is the condition to determine if a
%     point belongs to the basin of attraction of a fixed point.
%     Let z_0 = z and z_{n+1} = r(z_n).  If  Q(z_n) > 0 for some n < N,
%     we assume that z is in the basin of attraction.  Otherwise, we
%     assume that z is not in the basin of attraction.
% N : The number of iterations to determine if a point belongs to the
%     basin of attraction of a fixed point.  The default value is 50.
% M : The number of points per unit length.  The default value is 50.
% rev : If set to a negative value, the complement of the basin of
%       attraction is drawn to get the filled Julia set.  The default value
%       is 1.
% colour : One of the colours accepted in Matlab plot/fill.
%          It is used for the points that are parts of bounded orbits.
%          The default colour is blue.
%
%     Example: To produce the fille Julia sets for P_c defined by
%     P_c(z) = z^2 + c.
%     >> c = -0.12256 + 0.74486i.
%     >> P = @(z) z.^2 + c;
%     >> K = max(abs(c),2);
%     >> Q = @(z) abs(z) - K;
%     >> julia3(P,[-K K -K K],Q,50,100,-1,'k');
%

function julia3(R, D, Q, N, M, rev, colour)
    if ( nargin < 7 )
        colour = 'blue';
        if ( nargin < 6 )
            rev = 1;
            if ( nargin < 5 )
                M = 50;
                if ( nargin < 4 )
                    N = 50;
                    if ( nargin < 3 )
                        disp('Not enough arguments.');
                        disp('Use the help command for more information.');
                        return
                    end
                end
            end
        end
    end
    
    if ( rev < 0 )
        rev = -1;
    end
    
    M1 = round((D(2)-D(1))*M);
    M2 = round((D(4)-D(3))*M);
    x = linspace(D(1),D(2),M1);
    y = linspace(D(3),D(4),M2);

    figure;
    for k1 = 1:length(x)
        for k2 = 1:length(y)
            flag = -1;
            w = x(k1) + i*y(k2);
            for k3 = 1:N
                w = feval(R,w);
                if ( feval(Q,w) > 0 )
                    flag = 1;
                    break;
                end
            end
            if ( flag == rev )
                plot(x(k1),y(k2),'.','LineWidth',0.1);
                hold on
            end
        end
    end
    h = gca;
    set(h.Children,'Color',colour);
    axis(D);
    axis equal;
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
    grid on
    hold off
    display('The drawing is completed.');
end
