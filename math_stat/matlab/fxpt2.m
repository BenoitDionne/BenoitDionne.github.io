% x = fxpt2(funct,x0,n)
%
% This function returns the result of n iterations of the function
% funct starting with the value x = x0 .

function x = fxpt2(funct,x0,n)
   x = x0;
   for i=1:n
      x = feval(funct,x);
   end
end

