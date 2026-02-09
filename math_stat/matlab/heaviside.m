% Y = heaviside(X)
%
% This function accept a matrix X as argument and evaluate the
% Heaviside function at each of the components of X.
% The Heaviside function is defined as 1 if the argument is a positive
% number, 0 if the argument is a negative number, and NaN if the
% argument is 0.
function Y = heaviside(X)
  Y = (sign(X)+1)/2;
  Y(Y == 1/2) = NaN;
end
