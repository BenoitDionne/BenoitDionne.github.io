%  Starting value of x for the iteration:
x = 0.5;

%  Number of iterations:
n = 20;

% loop:
for i = 1:n
  x = -(x.^2/8) - x/4 + 1/2;
end

% Return the final value of the iteration
x
