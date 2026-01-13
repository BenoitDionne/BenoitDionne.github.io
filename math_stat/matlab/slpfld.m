% slpfld(funct,B,p,options)
%
% Function to draw the slope field of an ODE of the form
%         dx/dt = f(t,x,p)
% with x in R.
%
% funct is the function that defines the right hand side of the ODE.
%       This function must be an array smart function.
%       funct can be the name of a function (between apostrophes),
%       the handle of a function or an expression of the form
%       '...'.  In this last case, the variable names t, x and p must
%       be used.
% B = [a b c d] provides limits of the region [a,b] x [c,d] of the
%     t,x plan where the slope field is drawn.  We must have that
%     a < b and c < b.
% p is a vector of parameters for the function f.  If f does
%   not depend on any parameter, then p must be defined as [].
%
% List of options:
% 'density' is a number.  There are density x density equally spaced mesh
%           points per unit square.  If density is not given, then the
%           density is set to 3.
% 'init_conds' is a vector where each component of init_conds is an initial
%              condition for  dx/dt = f(t,x,p) at time t=0.  The graph
%              of the solution with this initial condition is drawn.
%              If init_conds is not given, then no graph is drawn.
% The list of options accepted by odeset can also be used.
%     odeset('RelTol',1e-6,'AbsTol',1e-5) is used by default.
%
% The Matlab solver used is ODE45 .
%
function slpfld(funct,B,p,varargin)
    if ( nargin < 3 )
        disp('Not enough arguments, use help slpfld to get the instructions.');
        return;
    end

    % Default values
    ttlvar = 0;
    density = 3;
    options = struct();
    init_conds = [];

    while ( ~isempty(varargin) )
        switch lower(varargin{1})
          case 'density' 
            density = varargin{2};
          case 'init_conds'
            init_conds = varargin{2};
          otherwise
            disp("Assuming that "+varargin{1}+" is an option for odeset.");
            options = odeset(options,varargin{1},varargin{2});
        end
        varargin = varargin(3:length(varargin));
    end

    
    if ( isa(funct,'function_handle') )
        f = funct;
        if ( exist(func2str(funct), 'file') ~= 2 && ...
             exist(func2str(funct), 'builtin') ~= 5 )
            ttlvar = 1;
        end
    elseif ( exist(funct, 'file') == 2 || exist(funct, 'builtin') == 5 )
        f = str2func(funct);
    elseif ( ischar(funct) == 1 )
        f = str2func(['@(t,x,p)',funct]);
        ttlvar = 1;
    else
        disp('The slope field cannot be drawn. Either the argument is not ');
        disp('the name or handle of an existing function, or it is not the ');
        disp('description of a function.');
        return;
    end

    % We select the mesh points.

    spacing = 1/density;
    Tmin = B(1) + spacing;
    Tmax = B(2) - spacing;
    if ( Tmax < Tmin )
        disp('The t interval is too small for the selected density.')
        return;
    end
    mesh_T = Tmin:spacing:Tmax;

    Xmin = B(3) + spacing;
    Xmax = B(4) - spacing;
    if ( Xmax < Xmin )
        disp('The x interval is too small for the selected density.')
        return;
    end
    mesh_X = Xmin:spacing:Xmax;

    size_T = length(mesh_T);
    size_X = length(mesh_X);

    % We create the figure.

    cla;
    hold on;
    grid on;
    if ( ttlvar == 1 )
        title(['x'' = ',func2str(f)]);
    else
        title(['x'' = ',func2str(f),'(t,x,p)']);
    end
    xlabel('t');
    ylabel('x');
    axis([B(1) B(2) B(3), B(4)],'equal');

    % We compute f(t,x,p) at each mesh point.

    [TT,XX] = meshgrid(mesh_T,mesh_X);
    M = f(TT,XX,p);

    % We draw the slope field.
    % The vector (1,f(t,x,p)) is normalized.  It is also scaled by
    % spacing  before being drawn at (t,x) to avoid overlapping
    % vectors.
    for (i=1:size_T)
        for (j=1:size_X)
            N = norm([1,M(j,i)]);
            Dir = spacing*[1,M(j,i)]/N;
            Xs = [TT(j,i),XX(j,i)];
            Xe = [TT(j,i),XX(j,i)] + Dir;
            plotArrow(Xs,Xe,'scale',1/2,'theta',20,'Color','blue');
        end
    end

    % We draw the graph of some solutions if requested.

    F = @(t,x) f(t,x,p);

    if ( length(init_conds) > 0 )
        if ( length(fieldnames(options)) == 0 )
            options = odeset('RelTol',1e-6,'AbsTol',1e-6);
        end
        for i = 1:length(init_conds)
            x0 = init_conds(i);
            if ( B(1) > 0 )
                [T,X] = ode45(F,[0 B(2)], x0, options);
                plot(T,X,'k')
            elseif ( B(2) < 0 )
                [T,X] = ode45(F,[0 B(1)], x0, options);
                plot(T,X,'k')
            else
                [T,X] = ode45(F,[0 B(1)], x0, options);
                plot(T,X,'k')
                [T,X] = ode45(F,[0 B(2)], x0, options);
                plot(T,X,'k')
            end
        end
    end
end
