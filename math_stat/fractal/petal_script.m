% Figure: petal2a.png used to produce petal2.png
julia1(-3/4, 80,'b',0.001); ...
print('petal2a.png', '-dpng', '-r0');

% To explore the Julia set near a neutral fixed point with a root
% of unity as multiplier. 
R = @(z) z + z.^3; ...
julia3(R,[Inf],'Tols',[2],'colours',{'white'},'Density',100,...
       'Region',[-1 1 -1.5 1.5],'NbrItr',20,'BckCol','#E3E6FC');

% Figure: petal3a.png used to produce petal3.png
julia1((-1+3*sqrt(3)*i)/8, 70,'b',0.001); ...
print('petal2a.png', '-dpng', '-r0');

% To explore the Julia set near a neutral fixed point with a root
% of unity as multiplier. 
R = @(z) z^2 -1/8 + 3*sqrt(3)*i/8; ...
julia3(R,[Inf],'Tols',[2],'colours',{'white'},'Density',150,...
       'Region',[-1.3 1.3 -1.2 1.2],'NbrItr',60,'BckCol','#E3E6FC');

