% plotArrow(Xs,Xe,varargin)
%
% Draw a poor person arrow
%
% Xs contains the coordinates of the base of the arrow.
% Xe contains the coordinates of the tip of the arrow.
% varargin is a list of arguments of the form
%  'option_name', value
% where all the possible options of the function plot can be used.
% There are two additional arguments:
%   'theta' is half the opening angle of the arrow head.
%   'scale' is the size of the arrow head relative to the length
%   of the arrow.
%

function plotArrow(Xs,Xe,varargin)
  if ( size(Xs,2) == 2 )
    Xs = Xs';
  end
  
  if ( size(Xe,2) == 2 )
    Xe = Xe';
  end

  theta = 15;
  scale = 1/10;

  options = {};
  j = 1;
  for i = 1:2:nargin-2
    if ( strcmpi(varargin{i},'theta') )
      theta = varargin{i+1};
    elseif ( strcmpi(varargin{i},'scale') )
      scale = varargin{i+1};
    else
      options(1,j) = varargin(i);
      options(1,j+1) = varargin(i+1);
      j = j+2;
    end
  end

  % Direction of the arrow
  Dir = Xe-Xs;
  
  % Rotation by 180 - theta
  a1 = pi - theta*pi/180;
  Rl = [cos(a1) sin(a1) ; -sin(a1) cos(a1)];
  Xl = scale*Rl*Dir;

  % Rotation by theta - 180
  Rr = [cos(a1) -sin(a1) ; sin(a1) cos(a1)];
  Xr = scale*Rr*Dir;

  % We draw the arrow
  Arr1 = [Xs(1,1), Xe(1,1), NaN, Xe(1,1), Xe(1,1)+Xl(1,1), NaN, ...
          Xe(1,1), Xe(1,1)+Xr(1,1)];
  Arr2 = [Xs(2,1), Xe(2,1), NaN, Xe(2,1), Xe(2,1)+Xl(2,1), NaN, ...
          Xe(2,1), Xe(2,1)+Xr(2,1)];
  plot(Arr1,Arr2,options{:});
end
