% vctfld(funct,B,p,flag,density,init_conds,tf,options)
%
% Function to draw the vector field of a system of ODE of the form
%         dX/dt = f(X1,X2,p)
% with X = (X1,X2) in R^2.
%
% funct is the function that defines the right hand side of the system
%       of ODE.  This function must be in the format
%         f:(X1,X2,p) -> [ f1(X1,X2,p) ; f2(X1,X2,p) ]
%       where the functions f1 and f2 are array smart.
%       funct can be the name of a function (between apostrophes),
%       the handle of a function or an expression of the form
%       '[... ; ...]'.  In this last case, the variable names
%       X1, X2 and p must be used.
% B = [a b c d] are the limits of the region [a,b] x [c,d] of the plan
%     where the vector field is drawn.  We must have that a < b and c < b.
% p is a vector of parameters for the function f.  If f does
%   not depend on any parameter, then p must be defined as [].
% flag is 0 if the vector drawn from a point X is proportional to
%      f(X1,X2,p) and flag is 1 if the vector drawn from a point X is
%      proportional to the normalized version of the vector f(X1,X2,p).
% density is a number.  There are density x density equally spaced mesh
%         points per unit square.  If density is not given, then the
%         density is set to 3.
% init_conds is a matrix where each column of init_conds is an initial
%            condition for  dX/dt = f(X1, X2, p) at time t=0.  An orbit is
%            drawn for each initial condition.  If init_conds is
%            not given, then no orbit is drawn.
% tf is a number used to determine the length of the interval of
%    integration.  The interval of integration is ]-tf , tf[.
%    The value should be modify according to the velocity of the
%    vector field.  If tf is not given, then the default value is tf = 20.
% options is the list of options defined with odeset that will be used
%         with the Matlab solver.  If options is not given, then
%         options is defined as
%         options = odeset('RelTol',1e-6,'AbsTol',[1e-5 1e-5]) .
%         The Matlab solver used is ODE45 .
%

function vctfld(funct,B,p,flag,density,init_conds,tf,options)

ttlvar = 0;

if ( nargin < 3 )
  disp('Not enough arguments, use help vctfld to get the instructions.');
  return;
end

if ( nargin < 4 )
  flag = 0;
  density = 3;
elseif ( nargin < 5 )
  density = 3;
end

if ( nargin < 7 )
  tf = 20;
end

if ( isa(funct,'function_handle') )
  f = funct;
  if ( exist(func2str(funct), 'file') ~= 2 && ...
       exist(func2str(funct), 'builtin') ~= 5 )
    ttlvar = 1;
  end
else
  if ( exist(funct, 'file') == 2 || exist(funct, 'builtin') == 5 )
    f = str2func(funct);
  elseif ( ischar(funct) == 1 )
    f = str2func(['@(X1,X2,p)',funct]);
    ttlvar = 1;
  else
    disp('The vector field cannot be drawn. Either the argument is not ');
    disp('the name or handle of an existing function, or it is not the ');
    disp('description of a function.');
    return;
  end
end

% We select the mesh points.

spacing = 1/density;
X1min = B(1) + spacing;
X1max = B(2) - spacing;
if ( X1max < X1min )
  disp('The X1 interval is too small for the selected density.')
  return;
end
mesh_X1 = X1min:spacing:X1max;

X2min = B(3) + spacing;
X2max = B(4) - spacing;
if ( X2max < X2min )
  disp('The X2 interval is too small for the selected density.')
  return;
end
mesh_X2 = X2min:spacing:X2max;

size_X1 = length(mesh_X1);
size_X2 = length(mesh_X2);

% We create the figure.

cla;
hold on;
grid on;
if ( ttlvar == 1 )
  title(['X'' = ',func2str(f)]);
else
  title(['X'' = ',func2str(f),'(X1,X2,p)']);
end
xlabel('X1');
ylabel('X2');
axis([B(1) B(2) B(3), B(4)],'equal');

% We compute the vector f(X1,X2,p) at each mesh point.

[XX1,XX2] = meshgrid(mesh_X1,mesh_X2);
M = f(XX1,XX2,p);
M1 = M(1:size_X2,:);
M2 = M(size_X2+1:2*size_X2,:);

% We draw the vector field.

if ( flag == 1 )
  % The vector f(X1,X2,p) is normalized.  It is also scaled by
  % spacing  before being drawn at (X1,X2) to avoid overlapping
  % vectors.
  for (i=1:size_X1)
    for (j=1:size_X2)
      N = norm([M1(j,i),M2(j,i)]);
      if ( N > 0 )
        Dir = spacing*[M1(j,i),M2(j,i)]/N;
      else
        Dir = [0,0];
      end
      Xs = [XX1(j,i),XX2(j,i)];
      Xe = [XX1(j,i),XX2(j,i)] + Dir;
      plotArrow(Xs,Xe,'scale',1/2,'theta',20,'Color','blue');
    end
  end    
else
  % We compute the norm of the vector at all the mesh points.
  % The maximum of these norms is used to scale the vector
  % f(X1,X2,p).  The resulting vector is also scaled by
  % spacing  before being drawn at (X1,X2) to avoid overlapping
  % vectors.
  MaxN = max(max(sqrt(M1.^2 + M2.^2)));
  if ( MaxN == 0 )
    disp 'The vector field is null!';
    return
  end
  for (i=1:size_X1)
    for (j=1:size_X2)
      Dir = spacing*[M1(j,i),M2(j,i)]/MaxN;
      Xs = [XX1(j,i),XX2(j,i)];
      Xe = [XX1(j,i),XX2(j,i)] + Dir;
      plotArrow(Xs,Xe,'scale',1/2,'theta',20, 'Color','blue');
    end
  end
end

% We draw some orbits if requested.

F = @(t,X) f(X(1),X(2),p);

if ( exist('init_conds') == 1 && size(init_conds,1) == 2 )
  if ( exist('options') ~= 1 || size(options,1) == 0 )
    options = odeset('RelTol',1e-6,'AbsTol',[1e-6 1e-6]);
  end
  for i = 1:size(init_conds,2)
    X0 = [init_conds(1,i);init_conds(2,i)];
    t0 = 0;
    for n = 0:1
      [T,X] = ode45(F,[t0 tf], X0, options);
      plot(X(:,1),X(:,2),'k')
      tf = - tf;
    end
  end
end

end
