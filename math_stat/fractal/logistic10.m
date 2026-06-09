figure
x = 0:0.001:1;
f = @(x) 4.3*x.*(1-x);
plot(x,f(x),'b','LineWidth',0.1)
grid on
hold on
title('y = f_{4.3}(x)')
xlabel('x')
ylabel('y')
plot([0,1],[1,1],'--r')
plot([1,1],[0,1],'--r')
plot([0,1],[0,0],'k')
plot([0,0],[0,1],'k')
plot([0,1],[0,1],'r')

figure
plot(x,f(f(x)),'b','LineWidth',0.1)
grid on
hold on
title('y = f_{4.3}^2(x)')
xlabel('x')
ylabel('y')
plot([0,1],[1,1],'--r')
plot([1,1],[0,1],'--r')
plot([0,1],[0,0],'k')
plot([0,0],[0,1],'k')
plot([0,1],[0,1],'r')

figure
plot(x,f(f(f(x))),'b','LineWidth',0.1)
grid on
hold on
title('y = f_{4.3}^3(x)')
xlabel('x')
ylabel('y')
plot([0,1],[1,1],'--r')
plot([1,1],[0,1],'--r')
plot([0,1],[0,0],'k')
plot([0,0],[0,1],'k')
plot([0,1],[0,1],'r')

figure
plot(x,f(f(f(f(x)))),'b','LineWidth',0.1)
grid on
hold on
title('y = f_{4.3}^4(x)')
xlabel('x')
ylabel('y')
plot([0,1],[1,1],'--r')
plot([1,1],[0,1],'--r')
plot([0,1],[0,0],'k')
plot([0,0],[0,1],'k')
plot([0,1],[0,1],'r')


