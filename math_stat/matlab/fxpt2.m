% y = fxpt2(funct,x0,n)
%
% This function returns the result of n iterations of the function
% y = funct(x) starting with the value x = x0 .

function y = fxpt2(funct,x0,n)
   y = x0;
     for i=1:n
       y = feval(funct,y);
     end
end

